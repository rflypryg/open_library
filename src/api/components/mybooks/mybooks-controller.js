const mybooksService = require('./mybooks-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getBooksByList(request, response, next) {
  try {
    const { username, list } = request.params;

    const books = await mybooksService.getBooksByList(username, list);

    if (!books) {
      throw errorResponder(errorTypes.NOT_FOUND, 'User not found');
    }

    return response.status(200).json(books);
  } catch (error) {
    return next(error);
  }
}

async function addBookToList(request, response, next) {
  try {
    const { username, list } = request.params;
    const { bookId } = request.body;

    if (!bookId) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Book ID is required');
    }

    await mybooksService.addBookToList(username, bookId, list);

    return response.status(200).json({ message: 'Book added to list successfully' });
  } catch (error) {
    return next(error);
  }
}

async function removeBookFromList(request, response, next) {
  try {
    const { username, list } = request.params;
    const { bookId } = request.body;

    if (!bookId) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Book ID is required');
    }

    await mybooksService.removeBookFromList(username, bookId, list);

    return response.status(200).json({ message: 'Book removed from list successfully' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getBooksByList,
  addBookToList,
  removeBookFromList,
};