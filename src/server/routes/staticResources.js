'use strict';

const path = require('path');

module.exports = function(app, db) {

  app.get([
    '/',
    '/taskList',
    '/import'
  ], function (req, res) {
    if (req.opuscapita.userData().customerid) {
      res.render('index', { userData: req.opuscapita.userData() || {} });
    } else {
      // res.sendFile(path.normalize(__dirname + '/../static/index.html'));
      res.send('This page is restricted to customer assigned users.')
    }
  });
  //
  // app.get([
  //   '/edit/:id',
  //   '/edit/:id/items',
  //   '/create',
  //   '/import',
  //   '/glAccounts',
  //   '/taskList'
  // ], (req, res) => {
  //   res.sendFile(path.normalize(__dirname + '/../static/index.html'));
  // });
};
