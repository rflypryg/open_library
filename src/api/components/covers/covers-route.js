const express = require('express');
const coversController = require('./covers-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/covers', route);

  // Get a book cover
  route.get('/b/:idType/:id-:size.jpg', (req, res, next) => {
    req.params.coverType = 'b'; // Book cover
    return coversController.getCover(req, res, next);
  });

  // Get an author cover
  route.get('/a/:idType/:id-:size.jpg', (req, res, next) => {
    req.params.coverType = 'a'; // Author cover
    return coversController.getCover(req, res, next);
  });

  // Add a cover (would need a file upload middleware like multer)
  route.post('/', coversController.addCover);
};
