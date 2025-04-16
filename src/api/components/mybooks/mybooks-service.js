const mybooksRepository = require('./mybooks-repository');

// Map the URL list parameter to the actual field in the Users model
const listMapping = {
  'want-to-read': 'wantToRead',
  'currently-reading': 'currentlyReading',
  'already-read': 'alreadyRead',
};

async function getBooksByList(username, listUrl) {
  const list = listMapping[listUrl];

  if (!list) {
    throw new Error('Invalid reading list');
  }

  return mybooksRepository.getBooksByList(username, list);
}

async function addBookToList(username, bookId, listUrl) {
  const list = listMapping[listUrl];

  if (!list) {
    throw new Error('Invalid reading list');
  }

  return mybooksRepository.addBookToList(username, bookId, list);
}

async function removeBookFromList(username, bookId, listUrl) {
  const list = listMapping[listUrl];

  if (!list) {
    throw new Error('Invalid reading list');
  }

  return mybooksRepository.removeBookFromList(username, bookId, list);
}

module.exports = {
  getBooksByList,
  addBookToList,
  removeBookFromList,
};