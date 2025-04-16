const express = require('express');
const worksController = require('./works-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/works', route);

  // Get a work by ID
  route.get('/:id', worksController.getWork);

  // Get a work by ID in JSON format
  route.get('/:id.json', worksController.getWork);

  // Create a new work
  route.post('/', worksController.createWork);

  // Update a work
  route.put('/:id', worksController.updateWork);

  // Delete a work
  route.delete('/:id', worksController.deleteWork);
};