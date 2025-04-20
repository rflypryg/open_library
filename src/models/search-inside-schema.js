module.exports = (db) =>
    db.model(
      'SearchBooks',
      db.Schema({
        key: { type: String, required: true, index: true },
        title: { type: String, required: true, text: true },
        authors: [{
          key: String,
          name: String
        }],
        first_publish_year: Number,
        edition_key: [String],
        cover_i: Number,
        has_fulltext: { type: Boolean, default: false },
        ia: [String],
        language: [String],
        text: [String], // For full text content indexing
        subject: [String], // For filtering by subject
        _textScore: { type: Number, default: 0 } // For relevance scoring
      }, {
        // Text index configuration for search
        autoIndex: true,
        timestamps: true
      })
    );