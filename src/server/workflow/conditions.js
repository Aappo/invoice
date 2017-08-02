'use strict';

const _ = require('lodash');

module.exports = {
  userHasRoles: ({ restrictedRoles, request: {roles} }) => {
    return _(roles).intersection(
      _.isArray(restrictedRoles)? restrictedRoles : [restrictedRoles]
      ).size() > 0;
  }
};
