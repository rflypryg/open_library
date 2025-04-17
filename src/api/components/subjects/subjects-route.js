const express = require('express');
const subjectsController = require('./subjects-controller');

module.exports = (app) => {
  // Get works by subject
  app.get('/subjects/:subject', subjectsController.getSubject);
  app.get('/subjects/:subject.json', subjectsController.getSubject);
};
