module.exports = (db) =>
    db.model(
        'Users',
        db.Schema({
            username: { type: String, unique: true, required: true },
            email: { type: String, unique: true, required: true },
            password: { type: String, required: true },
            fullName: String,
            wantToRead: [{ type: db.Schema.Types.ObjectId, ref: 'Books' }],
            currentlyReading: [{ type: db.Schema.Types.ObjectId, ref: 'Books' }],
            alreadyRead: [{ type: db.Schema.Types.ObjectId, ref: 'Books' }],
        })
    );