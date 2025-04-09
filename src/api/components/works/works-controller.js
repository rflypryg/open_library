const worksService = require('./works-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getWork(request, response, next) {
  try {
    const { id } = request.params;

    const work = await worksService.getWorkById(id);

    if (!work) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Work not found');
    }

    return response.status(200).json(work);
  } catch (error) {
    return next(error);
  }
}

async function createWork(request, response, next) {
  try {
    const workData = request.body;

    if (!workData.title) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Title is required');
    }

    const work = await worksService.createWork(workData);

    return response.status(201).json(work);
  } catch (error) {
    return next(error);
  }
}

async function updateWork(request, response, next) {
  try {
    const { id } = request.params;
    const workData = request.body;

    const result = await worksService.updateWork(id, workData);

    if (result.nModified === 0) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Work not found or no changes made');
    }

    return response.status(200).json({ message: 'Work updated successfully' });
  } catch (error) {
    return next(error);
  }
}

async function deleteWork(request, response, next) {
  try {
    const { id } = request.params;

    const result = await worksService.deleteWork(id);

    if (result.deletedCount === 0) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Work not found');
    }

    return response.status(200).json({ message: 'Work deleted successfully' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getWork,
  createWork,
  updateWork,
  deleteWork,
};