const express = require('express');
const authorsWorksController = require('./authors-works-controller');

module.exports = (app) => {
  // Get works by author
  app.get('/authors/:id/works', authorsWorksController.getAuthorWorks);
  app.get('/authors/:id/works.json', authorsWorksController.getAuthorWorks);
};
