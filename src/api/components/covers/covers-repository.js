const { Covers } = require('../../../models');

async function getCover(coverType, idType, idValue, size) {
  return Covers.findOne({
    coverType,
    idType,
    idValue,
    [`sizes.${size}`]: { $ne: '' }
  }).lean();
}

async function addCover(coverData) {
  return Covers.create(coverData);
}

async function updateCover(id, coverData) {
  return Covers.updateOne({ _id: id }, { $set: coverData });
}

async function deleteCover(id) {
  return Covers.deleteOne({ _id: id });
}

module.exports = {
  getCover,
  addCover,
  updateCover,
  deleteCover,
};