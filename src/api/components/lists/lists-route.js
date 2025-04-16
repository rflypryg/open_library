const express = require('express');
const listsController = require('./lists-controller');

const route = express.Router();

module.exports = (app) => {
  // Base route for user lists
  app.use('/people/:username/lists', route);

  // Get all lists for a user
  route.get('/', listsController.getLists);
  route.get('.json', listsController.getLists);

  // Create a new list
  route.post('/', listsController.createList);

  // Get a specific list
  route.get('/:listName', listsController.getList);
  route.get('/:listName.json', listsController.getList);

  // Update a list
  route.put('/:listName', listsController.updateList);

  // Delete a list
  route.delete('/:listName', listsController.deleteList);

  // Add a seed to a list
  route.post('/:listName/seeds', listsController.addSeedToList);

  // Remove a seed from a list
  route.delete('/:listName/seeds', listsController.removeSeedFromList);
};
