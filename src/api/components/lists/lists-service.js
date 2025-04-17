const listsRepository = require('./lists-repository');

async function getListsByUsername(username) {
  const lists = await listsRepository.getListsByUsername(username);

  return {
    links: {
      self: `/people/${username}/lists`,
    },
    size: lists.length,
    entries: lists.map((list) => ({
      type: 'list',
      key: list.key,
      name: list.name,
      description: list.description,
      created: list.created,
      last_modified: list.last_modified,
      seed_count: list.seeds.length,
    })),
  };
}

async function getListById(username, listName) {
  const listId = `${username}/${listName}`;
  const list = await listsRepository.getListById(listId);

  if (!list) {
    return null;
  }

  return {
    links: {
      self: `/people/${listId}`,
    },
    type: 'list',
    key: list.key,
    name: list.name,
    description: list.description,
    created: list.created,
    last_modified: list.last_modified,
    owner: list.owner,
    seeds: list.seeds,
    seed_count: list.seeds.length,
    tags: list.tags,
    is_public: list.is_public,
  };
}

async function createList(username, listData) {
  const formattedData = {
    ...listData,
    key: `/people/${username}/${listData.name.replace(/\s+/g, '-').toLowerCase()}`,
    owner: {
      key: `/people/${username}`,
      username,
    },
    created: new Date(),
    last_modified: new Date(),
  };

  return listsRepository.createList(formattedData);
}

async function updateList(username, listName, listData) {
  const listId = `${username}/${listName}`;
  return listsRepository.updateList(listId, listData);
}

async function deleteList(username, listName) {
  const listId = `${username}/${listName}`;
  return listsRepository.deleteList(listId);
}

async function addSeedToList(username, listName, seedData) {
  const listId = `${username}/${listName}`;
  return listsRepository.addSeedToList(listId, seedData);
}

async function removeSeedFromList(username, listName, seedKey) {
  const listId = `${username}/${listName}`;
  return listsRepository.removeSeedFromList(listId, seedKey);
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
