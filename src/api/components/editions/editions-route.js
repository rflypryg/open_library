const express = require('express');
const editionsController = require('./editions-controller');

const route = express.Router();

module.exports = (app) => {
  // Get edition by OLID
  app.get('/books/:id', editionsController.getEdition);
  app.get('/books/:id.json', editionsController.getEdition);

  // ISBN redirect API
  app.get('/isbn/:isbn', editionsController.getEditionByIsbn);

  // Get editions by work
  app.get('/works/:workId/editions', editionsController.getEditionsByWork);
  app.get('/works/:workId/editions.json', editionsController.getEditionsByWork);

  // Edition management routes (for internal use)
  app.use('/api/editions', route);

  // Create a new edition
  route.post('/', editionsController.createEdition);

  // Update an edition
  route.put('/:id', editionsController.updateEdition);

  // Delete an edition
  route.delete('/:id', editionsController.deleteEdition);
};
