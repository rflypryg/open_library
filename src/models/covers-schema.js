module.exports = (db) =>
    db.model(
      'Covers',
      db.Schema({
        coverType: String, // 'b' for book, 'a' for author
        idType: String, // 'isbn', 'olid', etc.
        idValue: String,
        sizes: {
          S: { type: String, default: '' }, // Small
          M: { type: String, default: '' }, // Medium
          L: { type: String, default: '' }, // Large
        },
        imageData: Buffer,
        contentType: String,
      })
    );