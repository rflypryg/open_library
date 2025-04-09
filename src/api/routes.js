const express = require('express');

const search = require('./components/search/search-route');
const works = require('./components/works/works-route');
const mybooks = require('./components/mybooks/mybooks-route');
const covers = require('./components/covers/covers-route');
const changes = require('./components/changes/changes-route');


module.exports = () => {
  const app = express.Router();

  search(app);
  works(app);
  mybooks(app);
  covers(app);
  changes(app);

  return app;
};
