const { Works } = require('../../../models');

async function getWorkById(id) {
  return Works.findOne({ key: `/works/${id}` }).lean();
}

async function createWork(workData) {
  return Works.create(workData);
}

async function updateWork(id, workData) {
  return Works.updateOne({ key: `/works/${id}` }, { $set: workData });
}

async function deleteWork(id) {
  return Works.deleteOne({ key: `/works/${id}` });
}

module.exports = {
  getWorkById,
  createWork,
  updateWork,
  deleteWork,
};