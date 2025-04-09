const searchService = require('./search-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function searchBooks(request, response, next) {
  try {
    const results = await searchService.searchBooks(request.query);
    return response.status(200).json(results);
  } catch (error) {
    return next(error);
  }
}

async function searchAuthors(request, response, next) {
  try {
    const results = await searchService.searchAuthors(request.query);
    return response.status(200).json(results);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  searchBooks,
  searchAuthors,
};