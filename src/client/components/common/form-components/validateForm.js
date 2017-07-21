import validate from 'validate.js';
import lodash from 'lodash';

/**
 * Returns function to validate form based on passed constraints
 *
 * @param formConstraints - constraints
 * @return {function}
 */
export const validateForm = (formConstraints) => {
  return (values) => {
    const validationResult = {};
    lodash.forEach(validate(values, formConstraints), (value, key) => {
      lodash.set(validationResult, key, value[0])
    });
    return validationResult;
  }
};
