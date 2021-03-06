'use strict';

const path = require('path');

module.exports = function(app, db) {

  app.get([
    '/',
    '/tasks/active',
    '/tasks/processed',
    '/list',
    '/import',
    '/tasks/*'
  ], function (req, res) {
    if (req.opuscapita.userData().customerid) {
      res.render('index', {
        userData: req.opuscapita.userData() || {},
        useMinifiedReact: process.env.NODE_ENV !== 'development',
        helpers: { json: JSON.stringify }
      });
    } else {
      // res.sendFile(path.normalize(__dirname + '/../static/index.html'));
      res.send('This page is restricted to customer assigned users.')
    }
  });
};
