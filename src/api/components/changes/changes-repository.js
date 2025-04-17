const { Changes } = require('../../../models');

async function getRecentChanges(limit = 10, includeBot = true) {
  const query = {};

  if (!includeBot) {
    query.bot = false;
  }

  return Changes.find(query)
    .sort({ timestamp: -1 })
    .limit(parseInt(limit, 10))
    .lean();
}

async function addChange(changeData) {
  return Changes.create(changeData);
}

module.exports = {
  getRecentChanges,
  addChange,
};