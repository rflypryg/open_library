module.exports = (db) =>
  db.model(
    'Works',
    db.Schema({
      key: String,
      title: String,
      description: Object,
      covers: [Number],
      subjects: [String],
      subject_places: [String],
      subject_times: [String],
      authors: [{ type: Object, ref: 'Authors' }],
      type: { type: String, default: 'work' },
      latest_revision: Number,
      revision: Number,
      created: {
        type: Date,
        value: Date.now,
      },
      last_modified: {
        type: Date,
        value: Date.now,
      },
    })
  );