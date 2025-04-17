const { Works } = require('../../../models');

async function getWorksBySubject(subject, limit = 50, offset = 0) {
  const works = await Works.find({ subjects: subject })
    .skip(offset)
    .limit(limit)
    .lean();

  const count = await Works.countDocuments({ subjects: subject });

  return { works, count };
}

module.exports = {
  getWorksBySubject,
};
