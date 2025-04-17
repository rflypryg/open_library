const { Editions } = require('../../../models');

async function getEditionById(id) {
  return Editions.findOne({ key: `/books/${id}` }).lean();
}

async function getEditionByIsbn(isbn) {
  const query = {
    $or: [{ 'identifiers.isbn_10': isbn }, { 'identifiers.isbn_13': isbn }],
  };
  return Editions.findOne(query).lean();
}

async function getEditionsByWork(workId) {
  return Editions.find({ 'works.key': `/works/${workId}` }).lean();
}

async function createEdition(editionData) {
  return Editions.create(editionData);
}

async function updateEdition(id, editionData) {
  return Editions.updateOne({ key: `/books/${id}` }, { $set: editionData });
}

async function deleteEdition(id) {
  return Editions.deleteOne({ key: `/books/${id}` });
}

module.exports = {
  getEditionById,
  getEditionByIsbn,
  getEditionsByWork,
  createEdition,
  updateEdition,
  deleteEdition,
};
