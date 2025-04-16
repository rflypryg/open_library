const coversService = require('./covers-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getCover(request, response, next) {
  try {
    const { coverType, idType, id, size } = request.params;

    const cover = await coversService.getCover(coverType, idType, id, size);

    if (!cover) {
      // Return a placeholder image if the cover is not found
      return response.status(404).json({ message: 'Cover not found' });
    }

    // Set the content type for the image response
    response.set('Content-Type', cover.contentType);
    return response.send(cover.imageData);
  } catch (error) {
    return next(error);
  }
}

async function addCover(request, response, next) {
  try {
    // This would need a file upload middleware like multer
    if (!request.file) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Image file is required');
    }

    const { coverType, idType, idValue, size } = request.body;

    if (!coverType || !idType || !idValue || !size) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Cover type, ID type, ID value, and size are required'
      );
    }

    const coverData = {
      coverType,
      idType,
      idValue,
      sizes: {
        [size]: 'url-to-stored-image', // This would need to be adjusted based on your storage method
      },
      imageData: request.file.buffer,
      contentType: request.file.mimetype,
    };

    const cover = await coversService.addCover(coverData);

    return response.status(201).json(cover);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getCover,
  addCover,
};