const subjectsService = require('./subjects-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getSubject(request, response, next) {
  try {
    const { subject } = request.params;
    const { limit, offset } = request.query;

    const subjectData = await subjectsService.getWorksBySubject(
      subject,
      parseInt(limit) || 50,
      parseInt(offset) || 0
    );

    return response.status(200).json(subjectData);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getSubject,
};
