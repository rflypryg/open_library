#const express = require('express');
const changesController = require('./changes-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/recentchanges', route);

  // Get recent changes
  route.get('.json', changesController.getRecentChanges);

  // Add a change (for internal use)
  route.post('/', changesController.addChange);
};
