const { Books } = require('../../../models');

async function getReadableBook(id) {
  return Books.findOne({
    $or: [
      { key: `/books/${id}` },
      { olid: id }
    ],
    has_fulltext: true
  }).lean();
}

module.exports = {
  getReadableBook,
};