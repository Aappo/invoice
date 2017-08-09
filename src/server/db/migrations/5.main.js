'use strict';

const Sequelize = require("sequelize");
const Promise = require("bluebird");

module.exports.up = function(db, config) {

  return Promise.all(['InspectedBy', 'ApprovedBy'].map(column =>
    db.getQueryInterface().addColumn(
      'PurchaseInvoice',
      column,
      {
        type: Sequelize.STRING(255),
        allowNull: true
      }
    )
  ));
};

module.exports.down = function (db, config) {

  return Promise.all(['InspectedBy', 'ApprovedBy'].map(column =>
    db.getQueryInterface().removeColumn('PurchaseInvoice', column))
  );
};
