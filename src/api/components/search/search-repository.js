const { Books, Authors } = require('../../../models');

async function searchBooks(query) {
  // Search by any criteria
  const searchQuery = {};

  if (query.q) {
    searchQuery.$or = [
      { title: { $regex: query.q, $options: 'i' } },
      { author_name: { $regex: query.q, $options: 'i' } },
      { subject: { $regex: query.q, $options: 'i' } },
    ];
  }

  if (query.title) {
    searchQuery.title = { $regex: query.title, $options: 'i' };
  }

  if (query.author) {
    searchQuery.author_name = { $regex: query.author, $options: 'i' };
  }

  if (query.subject) {
    searchQuery.subject = { $regex: query.subject, $options: 'i' };
  }

  if (query.publisher) {
    searchQuery.publisher = { $regex: query.publisher, $options: 'i' };
  }

  const limit = parseInt(query.limit, 10) || 10;
  const page = parseInt(query.page, 10) || 1;
  const skip = (page - 1) * limit;

  const books = await Books.find(searchQuery)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await Books.countDocuments(searchQuery);

  return {
    numFound: total,
    start: skip,
    numFoundExact: true,
    docs: books,
  };
}

async function searchAuthors(query) {
  const searchQuery = {};

  if (query.q) {
    searchQuery.$or = [
      { name: { $regex: query.q, $options: 'i' } },
      { alternate_names: { $regex: query.q, $options: 'i' } },
    ];
  }

  const limit = parseInt(query.limit, 10) || 10;
  const page = parseInt(query.page, 10) || 1;
  const skip = (page - 1) * limit;

  const authors = await Authors.find(searchQuery)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await Authors.countDocuments(searchQuery);

  return {
    numFound: total,
    start: skip,
    numFoundExact: true,
    docs: authors,
  };
}

module.exports = {
  searchBooks,
  searchAuthors,
};