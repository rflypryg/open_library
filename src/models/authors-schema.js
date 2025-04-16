module.exports = (db) =>
  db.model(
    'Authors',
    db.Schema({
      key: String,
      name: String,
      birth_date: String,
      top_work: String,
      work_count: Number,
      top_subjects: [String],
      _version_: Number,
      alternate_names: [String],
      bio: Object,
      photos: [Number],
    })
  );