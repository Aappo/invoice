'use strict';

const path = require('path');

module.exports = function(app, db) {

  app.get('/', function (req, res) {
    if (req.opuscapita.userData().customerid) {
      res.render('index', { currentUserData: req.opuscapita.userData() || {} });
    } else {
      res.sendFile(path.normalize(__dirname + '/../static/index.html'));
    }
  });

  app.get([
    '/edit/:id',
    '/edit/:id/items',
    '/create',
    '/import',
    '/glAccounts'
  ], (req, res) => {
    res.sendFile(path.normalize(__dirname + '/../static/index.html'));
  });
};
