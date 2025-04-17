const express = require('express');
const mybooksController = require('./mybooks-controller');

const route = express.Router();

module.exports = (app) => {
  // Get books from a user's reading list
  app.use('/people/:username/books', route);

  // Get books from a specific list (want-to-read, currently-reading, already-read)
  route.get('/:list.json', mybooksController.getBooksByList);

  // Add a book to a reading list
  route.post('/:list', mybooksController.addBookToList);

  // Remove a book from a reading list
  route.delete('/:list', mybooksController.removeBookFromList);
};