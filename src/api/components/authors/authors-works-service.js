const authorsWorksRepository = require('./authors-works-repository');

async function getAuthorWorks(authorId, limit, offset) {
  const author = await authorsWorksRepository.getAuthorById(authorId);
  if (!author) {
    return null;
  }

  const { works, count } = await authorsWorksRepository.getWorksByAuthor(
    authorId,
    limit,
    offset
  );

  return {
    links: {
      self: `/authors/${authorId}/works`,
      author: `/authors/${authorId}`,
    },
    size: count,
    entries: works.map((work) => ({
      type: 'work',
      title: work.title,
      key: work.key,
      covers: work.covers || [],
      subjects: work.subjects || [],
      subject_places: work.subject_places || [],
      subject_times: work.subject_times || [],
      latest_revision: work.latest_revision || 1,
      revision: work.revision || 1,
      created: work.created,
      last_modified: work.last_modified,
    })),
  };
}

module.exports = {
  getAuthorWorks,
};
