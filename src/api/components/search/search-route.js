const express = require('express');
const searchController = require('./search-controller');

const route = express.Router();

module.exports = (app) => {
  // Book search routes
  app.use('/search', route);

  // Search books by any query
  route.get('.json', searchController.searchBooks);

  // Search authors
  app.use('/search/authors', route);
  route.get('.json', searchController.searchAuthors);
};