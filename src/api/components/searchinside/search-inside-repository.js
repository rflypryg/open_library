const { Books } = require('../../../models');

async function searchInsideBooks(query, page = 1, limit = 20) {
  const offset = (page - 1) * limit;
  
  const books = await Books.find({
    $text: { $search: query },
    has_fulltext: true
  })
  .skip(offset)
  .limit(limit)
  .lean();

  const count = await Books.countDocuments({
    $text: { $search: query },
    has_fulltext: true
  });

  return { books, count };
}

module.exports = {
  searchInsideBooks,
};