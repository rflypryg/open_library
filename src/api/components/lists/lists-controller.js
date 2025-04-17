#const listsService = require('./lists-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getLists(request, response, next) {
  try {
    const { username } = request.params;
    
    const lists = await listsService.getListsByUsername(username);
    
    return response.status(200).json(lists);
  } catch (error) {
    return next(error);
  }
}

async function getList(request, response, next) {
  try {
    const { username, listName } = request.params;
    
    const list = await listsService.getListById(username, listName);
    
    if (!list) {
      throw errorResponder(errorTypes.NOT_FOUND, 'List not found');
    }
    
    return response.status(200).json(list);
  } catch (error) {
    return next(error);
  }
}

async function createList(request, response, next) {
  try {
    const { username } = request.params;
    const listData = request.body;
    
    if (!listData.name) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'List name is required');
    }
    
    const list = await listsService.createList(username, listData);
    
    return response.status(201).json(list);
  } catch (error) {
    return next(error);
  }
}

async function updateList(request, response, next) {
  try {
    const { username, listName } = request.params;
    const listData = request.body;
    
    const result = await listsService.updateList(username, listName, listData);
    
    if (result.nModified === 0) {
      throw errorResponder(errorTypes.NOT_FOUND, 'List not found or no changes made');
    }
    
    return response.status(200).json({ message: 'List updated successfully' });
  } catch (error) {
    return next(error);
  }
}

async function deleteList(request, response, next) {
  try {
    const { username, listName } = request.params;
    
    const result = await listsService.deleteList(username, listName);
    
    if (result.deletedCount === 0) {
      throw errorResponder(errorTypes.NOT_FOUND, 'List not found');
    }
    
    return response.status(200).json({ message: 'List deleted successfully' });
  } catch (error) {
    return next(error);
  }
}

async function addSeedToList(request, response, next) {
  try {
    const { username, listName } = request.params;
    const seedData = request.body;
    
    if (!seedData.key) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Seed key is required');
    }
    
    await listsService.addSeedToList(username, listName, seedData);
    
    return response.status(200).json({ message: 'Seed added to list successfully' });
  } catch (error) {
    return next(error);
  }
}

async function removeSeedFromList(request, response, next) {
  try {
    const { username, listName } = request.params;
    const { seedKey } = request.body;
    
    if (!seedKey) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Seed key is required');
    }
    
    await listsService.removeSeedFromList(username, listName, seedKey);
    
    return response.status(200).json({ message: 'Seed removed from list successfully' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getLists,
  getList,
  createList,
  updateList,
  deleteList,
  addSeedToList,
  removeSeedFromList
};
