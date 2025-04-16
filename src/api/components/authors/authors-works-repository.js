const { Works, Authors } = require('../../../models');

async function getAuthorById(id) {
  return Authors.findOne({ key: `/authors/${id}` }).lean();
}

async function getWorksByAuthor(authorId, limit = 50, offset = 0) {
  const works = await Works.find({ 'authors.key': `/authors/${authorId}` })
    .skip(offset)
    .limit(limit)
    .lean();

  const count = await Works.countDocuments({
    'authors.key': `/authors/${authorId}`,
  });

  return { works, count };
}

module.exports = {
  getAuthorById,
  getWorksByAuthor,
};
