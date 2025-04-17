const subjectsRepository = require('./subjects-repository');

async function getWorksBySubject(subject, limit, offset) {
  const { works, count } = await subjectsRepository.getWorksBySubject(
    subject,
    limit,
    offset
  );

  return {
    key: `/subjects/${encodeURIComponent(subject)}`,
    name: subject,
    subject_type: 'subject',
    work_count: count,
    works: works.map((work) => ({
      key: work.key,
      title: work.title,
      edition_count: 1, // This would ideally be actual count from Editions collection
      cover_i: work.covers ? work.covers[0] : null,
      subject: work.subjects,
    })),
  };
}

module.exports = {
  getWorksBySubject,
};
