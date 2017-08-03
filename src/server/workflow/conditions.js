'use strict';

const _ = require('lodash');

module.exports = {
  userHasRoles: ({ restrictedRoles, request = {roles : []} }) => {
    if(_.isEmpty(restrictedRoles)) {
      return true
    };

    return request? _(request.roles).intersection(
        _.isArray(restrictedRoles) ? restrictedRoles : [restrictedRoles]
      ).size() > 0 : false;
  }
};
