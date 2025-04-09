const worksRepository = require('./works-repository');

async function getWorkById(id) {
  return worksRepository.getWorkById(id);
}

async function createWork(workData) {
  const formattedData = {
    ...workData,
    key: `/works/${workData.id || Math.random().toString(36).substring(2, 15)}`,
  };

  return worksRepository.createWork(formattedData);
}

async function updateWork(id, workData) {
  return worksRepository.updateWork(id, workData);
}

async function deleteWork(id) {
  return worksRepository.deleteWork(id);
}

module.exports = {
  getWorkById,
  createWork,
  updateWork,
  deleteWork,
};