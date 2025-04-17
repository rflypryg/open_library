module.exports = (db) =>
  db.model(
    "Lists",
    db.Schema({
      key: String,
      name: String,
      description: String,
      created: {
        type: Date,
        default: Date.now,
      },
      last_modified: {
        type: Date,
        default: Date.now,
      },
      owner: {
        key: String,
        username: String,
      },
      seeds: [
        {
          key: String,
          type: String, // 'work', 'edition', 'subject', etc.
          title: String,
          cover_id: Number,
        },
      ],
      tags: [String],
      is_public: { type: Boolean, default: true },
    })
  );
