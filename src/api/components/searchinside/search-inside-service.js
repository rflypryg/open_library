const searchInsideRepository = require('./search-inside-repository');

async function searchInside(query, page, limit) {
  const { books, count } = await searchInsideRepository.searchInsideBooks(
    query,
    page,
    limit
  );

  return {
    q: query,
    start: (page - 1) * limit,
    num_found: count,
    docs: books.map(book => ({
      key: book.key,
      title: book.title,
      first_publish_year: book.first_publish_year,
      author_name: book.authors?.map(a => a.name) || [],
      edition_key: book.edition_key,
      cover_i: book.cover_i,
      has_fulltext: book.has_fulltext,
      ia: book.ia || []
    }))
  };
}

module.exports = {
  searchInside,
};