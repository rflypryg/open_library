const editionsService = require('./editions-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getEdition(request, response, next) {
  try {
    const { id } = request.params;

    const edition = await editionsService.getEditionById(id);

    if (!edition) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Edition not found');
    }

    return response.status(200).json(edition);
  } catch (error) {
    return next(error);
  }
}

async function getEditionByIsbn(request, response, next) {
  try {
    const { isbn } = request.params;

    const edition = await editionsService.getEditionByIsbn(isbn);

    if (!edition) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Edition not found');
    }

    // For redirect APIs, you could either redirect or return the data
    // Redirecting example: return response.redirect(`/books/${edition.key.split('/').pop()}`);
    // Or return the data:
    return response.status(200).json(edition);
  } catch (error) {
    return next(error);
  }
}

async function getEditionsByWork(request, response, next) {
  try {
    const { workId } = request.params;

    const editions = await editionsService.getEditionsByWork(workId);

    return response.status(200).json({
      count: editions.length,
      works: editions,
    });
  } catch (error) {
    return next(error);
  }
}

async function createEdition(request, response, next) {
  try {
    const editionData = request.body;

    if (!editionData.title) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Title is required');
    }

    const edition = await editionsService.createEdition(editionData);

    return response.status(201).json(edition);
  } catch (error) {
    return next(error);
  }
}

async function updateEdition(request, response, next) {
  try {
    const { id } = request.params;
    const editionData = request.body;

    const result = await editionsService.updateEdition(id, editionData);

    if (result.nModified === 0) {
      throw errorResponder(
        errorTypes.NOT_FOUND,
        'Edition not found or no changes made'
      );
    }

    return response
      .status(200)
      .json({ message: 'Edition updated successfully' });
  } catch (error) {
    return next(error);
  }
}

async function deleteEdition(request, response, next) {
  try {
    const { id } = request.params;

    const result = await editionsService.deleteEdition(id);

    if (result.deletedCount === 0) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Edition not found');
    }

    return response
      .status(200)
      .json({ message: 'Edition deleted successfully' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getEdition,
  getEditionByIsbn,
  getEditionsByWork,
  createEdition,
  updateEdition,
  deleteEdition,
};
