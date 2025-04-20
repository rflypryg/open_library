const express = require('express');
const searchInsideController = require('./search-inside-controller');

module.exports = (app) => {
  // Search inside books
  app.get('/search/inside', searchInsideController.searchInside);
  app.get('/search/inside.json', searchInsideController.searchInside);
};