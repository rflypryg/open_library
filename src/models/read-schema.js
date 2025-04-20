module.exports = (db) =>
    db.model(
      'ReadableBooks',
      db.Schema({
        key: { type: String, required: true, unique: true },
        olid: { type: String, index: true }, // Open Library ID
        title: { type: String, required: true },
        authors: [{
          key: String,
          name: String
        }],
        identifiers: {
          isbn: [String],
          lccn: [String],
          oclc: [String]
        },
        ia_collection: [String],
        ia: { type: String, index: true }, // Archive.org identifier
        lending_identifier: String,
        printdisabled: Boolean,
        cover_url: String,
        borrow_url: String,
        read_url: String,
        preview_url: String,
        formats: {
          pdf: String,
          epub: String,
          text: String
        },
        access_info: {
          borrow_available: Boolean,
          borrow_until: Date,
          print_disabled: Boolean,
          read_online: Boolean
        },
        last_scan_date: Date,
        created: { type: Date, default: Date.now },
        updated: { type: Date, default: Date.now }
      }, {
        // Indexes for read API
        autoIndex: true
      })
    );