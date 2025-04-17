const changesService = require('./changes-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getRecentChanges(request, response, next) {
  try {
    const { limit, bot } = request.query;
    const includeBot = bot !== 'false';

    const changes = await changesService.getRecentChanges(limit, includeBot);

    return response.status(200).json(changes);
  } catch (error) {
    return next(error);
  }
}

async function addChange(request, response, next) {
  try {
    const changeData = request.body;

    if (!changeData.kind || !changeData.author) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Change kind and author are required'
      );
    }

    const change = await changesService.addChange(changeData);

    return response.status(201).json(change);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getRecentChanges,
  addChange,
};