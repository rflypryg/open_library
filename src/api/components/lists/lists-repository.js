const { Lists, Users } = require('../../../models');

async function getListsByUsername(username) {
  return Lists.find({ 'owner.username': username }).lean();
}

async function getListById(listId) {
  return Lists.findOne({ key: `/people/${listId}` }).lean();
}

async function createList(listData) {
  return Lists.create(listData);
}

async function updateList(listId, listData) {
  return Lists.updateOne(
    { key: `/people/${listId}` },
    { $set: { ...listData, last_modified: new Date() } }
  );
}

async function deleteList(listId) {
  return Lists.deleteOne({ key: `/people/${listId}` });
}

async function addSeedToList(listId, seed) {
  return Lists.updateOne(
    { key: `/people/${listId}` },
    {
      $push: { seeds: seed },
      $set: { last_modified: new Date() },
    }
  );
}

async function removeSeedFromList(listId, seedKey) {
  return Lists.updateOne(
    { key: `/people/${listId}` },
    {
      $pull: { seeds: { key: seedKey } },
      $set: { last_modified: new Date() },
    }
  );
}

module.exports = {
  getListsByUsername,
  getListById,
  createList,
  updateList,
  deleteList,
  addSeedToList,
  removeSeedFromList,
};
