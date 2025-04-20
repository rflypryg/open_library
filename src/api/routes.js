const express = require('express');

const search = require('./components/search/search-route');
const works = require('./components/works/works-route');
const mybooks = require('./components/mybooks/mybooks-route');
const covers = require('./components/covers/covers-route');
const changes = require('./components/changes/changes-route');
const authors = require('./components/authors/authors-works-route');
const subjects = require('./components/subjects/subjects-route');
const editions = require('./components/editions/editions-route');
const lists = require('./components/lists/lists-route');
const searchinside = require('./components/searchinside/search-inside-route');
const read = require('./components/read/read-route');

module.exports = () => {
  const app = express.Router();

  search(app);
  works(app);
  mybooks(app);
  covers(app);
  changes(app);
  authors(app);
  subjects(app);
  editions(app);
  lists(app);
  searchinside(app);
  read(app);

  return app;
};
