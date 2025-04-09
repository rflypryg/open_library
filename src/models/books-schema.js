module.exports = (db) =>
  db.model(
    'Books',
    db.Schema({
      title: String,
      author_name: [String],
      first_publish_year: Number,
      key: String,
      cover_i: Number,
      isbn: [String],
      language: [String],
      publisher: [String],
      publish_year: [Number],
      subject: [String],
      type: String,
      ebook_access: String,
      availability: Object,
    })
  );