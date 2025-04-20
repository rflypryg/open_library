const searchInsideService = require('./search-inside-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function searchInside(request, response, next) {
  try {
    const { q, page = 1, limit = 20 } = request.query;

    if (!q) {
      throw errorResponder(
        errorTypes.VALIDATION,
        'Search query parameter "q" is required'
      );
    }

    const result = await searchInsideService.searchInside(
      q,
      parseInt(page),
      parseInt(limit)
    );

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  searchInside,
};