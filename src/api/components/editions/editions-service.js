const editionsRepository = require('./editions-repository');

async function getEditionById(id) {
  return editionsRepository.getEditionById(id);
}

async function getEditionByIsbn(isbn) {
  return editionsRepository.getEditionByIsbn(isbn);
}

async function getEditionsByWork(workId) {
  return editionsRepository.getEditionsByWork(workId);
}

async function createEdition(editionData) {
  const formattedData = {
    ...editionData,
    key: `/books/${editionData.id || Math.random().toString(36).substring(2, 15)}`,
    last_modified: new Date(),
  };

  return editionsRepository.createEdition(formattedData);
}

async function updateEdition(id, editionData) {
  const updatedData = {
    ...editionData,
    last_modified: new Date(),
  };

  return editionsRepository.updateEdition(id, updatedData);
}

async function deleteEdition(id) {
  return editionsRepository.deleteEdition(id);
}

module.exports = {
  getEditionById,
  getEditionByIsbn,
  getEditionsByWork,
  createEdition,
  updateEdition,
  deleteEdition,
};
