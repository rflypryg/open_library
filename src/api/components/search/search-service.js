const searchRepository = require('./search-repository');

async function searchBooks(query) {
  return searchRepository.searchBooks(query);
}

async function searchAuthors(query) {
  return searchRepository.searchAuthors(query);
}

module.exports = {
  searchBooks,
  searchAuthors,
  searchLists,
};
