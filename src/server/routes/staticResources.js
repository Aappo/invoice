'use strict';

const path = require('path');

module.exports = function(app, db) {

  app.get([
    '/',
    '/taskList',
    '/allTaskList',
    '/import'
  ], function (req, res) {
    if (req.opuscapita.userData().customerid) {
      res.render('index', { userData: req.opuscapita.userData() || {} });
    } else {
      // res.sendFile(path.normalize(__dirname + '/../static/index.html'));
      res.send('This page is restricted to customer assigned users.')
    }
  });
};
