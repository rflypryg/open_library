const authorsWorksService = require('./authors-works-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getAuthorWorks(request, response, next) {
  try {
    const { id } = request.params;
    const { limit = 50, offset = 0 } = request.query;

    const result = await authorsWorksService.getAuthorWorks(
      id,
      parseInt(limit),
      parseInt(offset)
    );

    if (!result) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Author not found');
    }

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getAuthorWorks,
};
