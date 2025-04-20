const readRepository = require('./read-repository');

async function getBookReadData(id) {
  const book = await readRepository.getReadableBook(id);
  
  if (!book) {
    return null;
  }

  return {
    data: {
      key: book.key,
      title: book.title,
      authors: book.authors?.map(a => ({
        key: a.key,
        name: a.name
      })) || [],
      identifiers: book.identifiers || {},
      ia_collection: book.ia_collection || [],
      lending_identifier: book.lending_identifier,
      printdisabled: book.printdisabled || false,
      cover_url: book.cover_url,
      read_url: `https://archive.org/details/${book.ia}`,
      preview_url: `https://archive.org/stream/${book.ia}`,
      borrow_url: book.borrow_url
    },
    html: generateReadHTML(book)
  };
}

function generateReadHTML(book) {
  // Simplified HTML generation
  return `
    <html>
      <head>
        <title>${book.title} - Read Online</title>
      </head>
      <body>
        <h1>${book.title}</h1>
        ${book.authors?.length ? `<p>By ${book.authors.map(a => a.name).join(', ')}</p>` : ''}
        <iframe src="https://archive.org/stream/${book.ia}" width="100%" height="800px"></iframe>
      </body>
    </html>
  `;
}

module.exports = {
  getBookReadData,
};