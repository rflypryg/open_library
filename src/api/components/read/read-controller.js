const readService = require('./read-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getBookReadData(request, response, next) {
  try {
    const { id } = request.params;
    const { format = 'json' } = request.query;

    const result = await readService.getBookReadData(id);

    if (!result) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Book not found or not readable');
    }

    if (format === 'html') {
      return response.status(200).send(result.html);
    }

    return response.status(200).json(result.data);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getBookReadData,
};