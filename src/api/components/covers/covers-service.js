const coversRepository = require('./covers-repository');

async function getCover(coverType, idType, idValue, size) {
  return coversRepository.getCover(coverType, idType, idValue, size);
}

async function addCover(coverData) {
  return coversRepository.addCover(coverData);
}

async function updateCover(id, coverData) {
  return coversRepository.updateCover(id, coverData);
}

async function deleteCover(id) {
  return coversRepository.deleteCover(id);
}

module.exports = {
  getCover,
  addCover,
  updateCover,
  deleteCover,
};