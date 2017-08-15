/**
 * Checks that invoice.field < <amount>
 *
 * @param amount - passed as workflow guard arguments
 * @param field - passed as workflow guard arguments
 * @param object - dynamically invoice instance
 * @return {boolean}
 *
 * @author Daniel Zhitomirsky
 */
module.exports = ({amount, field, object}) => {
  if(!object) {
    throw new Error("Error in 'isLessThan' guard: 'object' is undefined.")
  }
  if(!field){
    throw new Error("Error in 'isLessThan' guard: 'field' is undefined.")
  }
  if(!amount) {
    throw new Error("Error in 'isLessThan' guard: 'amount' is undefined.")
  }
  if(!object[field]) {
    return false
  }
  return object[field] < amount;
};
