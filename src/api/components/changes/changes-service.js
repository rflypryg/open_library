const changesRepository = require('./changes-repository');

async function getRecentChanges(limit, includeBot) {
  return changesRepository.getRecentChanges(limit, includeBot);
}

async function addChange(changeData) {
  return changesRepository.addChange(changeData);
}

module.exports = {
  getRecentChanges,
  addChange,
};