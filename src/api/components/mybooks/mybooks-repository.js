const { Users, Books } = require('../../../models');

async function getUserByUsername(username) {
  return Users.findOne({ username }).lean();
}

async function getBooksByList(username, list) {
  // Get the user document
  const user = await Users.findOne({ username }).populate(list).lean();

  if (!user) {
    return null;
  }

  return {
    reading_log_entries: user[list].map(book => ({
      work: {
        title: book.title,
        key: book.key,
        author_names: book.author_name,
        cover_id: book.cover_i
      },
      logged_date: new Date(),
      status: list
    }))
  };
}

async function addBookToList(username, bookId, list) {
  // Create the update operation based on the list name
  const updateOp = {};
  updateOp[list] = bookId;

  return Users.updateOne(
    { username },
    { $addToSet: updateOp }
  );
}

async function removeBookFromList(username, bookId, list) {
  // Create the update operation based on the list name
  const updateOp = {};
  updateOp[list] = bookId;

  return Users.updateOne(
    { username },
    { $pull: updateOp }
  );
}

module.exports = {
  getUserByUsername,
  getBooksByList,
  addBookToList,
  removeBookFromList,
};
