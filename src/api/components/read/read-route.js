const express = require('express');
const readController = require('./read-controller');

module.exports = (app) => {
  // Get book read data
  app.get('/books/:id/read', readController.getBookReadData);
  app.get('/books/:id/read.json', readController.getBookReadData);
};