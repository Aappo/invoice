const _ = require('lodash');

/**
 * Checks that user roles has any of restricted role (basicly checks restricted
 * roles and user roles intersections )
 *
 * @param restrictedRoles - user that are required for passing - passed as workflow guard arguments
 * @param request - dynamically passes user data with roles array field
 * @return {boolean}
 *
 * @author Daniel Zhitomirsky
 */
module.exports = ({ restrictedRoles, request = {roles : []} }) => {
  if(_.isEmpty(restrictedRoles)) {
    return true
  };

  return request? _(request.roles).intersection(
    _.isArray(restrictedRoles) ? restrictedRoles : [restrictedRoles]
  ).size() > 0 : false;
};
