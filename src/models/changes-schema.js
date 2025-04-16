module.exports = (db) =>
    db.model(
        'Changes',
        db.Schema({
            kind: String,
            timestamp: { type: Date, default: Date.now },
            author: {
                key: String,
                name: String,
            },
            comment: String,
            changes: [Object],
            bot: Boolean,
            ip: String,
            data: Object,
        })
    );