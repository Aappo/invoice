import lodash from 'lodash';

function roundDecimalNumber(number) {
  return parseFloat(number.toFixed(6))
}

/**
 * Calculates the sum of the list item's field with the next behaviour:
 * sum([]) == 0
 * sum([1,2,0]) == 3
 * sum([1,2,undefined]) == 3
 * sum([undefined,undefined]) == NaN
 */
function calculateTotalSum(i18n, list, field) {
  let numericListValues = lodash.filter(list, (item) => {
    try {
      let itemFieldValue = typeof item[field] === 'number' ? item[field] : i18n.parseDecimalNumber(item[field]);
      return !lodash.isNaN(itemFieldValue) && !lodash.isNil(itemFieldValue);
    } catch (e) {
      return false;
    }
  });

  if (lodash.size(numericListValues) > 0) {
    return roundDecimalNumber(lodash.sumBy(numericListValues, (item) =>
      typeof item[field] === 'number' ? item[field] : i18n.parseDecimalNumber(item[field])));
  } else if (lodash.size(list) > 0) {
    return NaN;
  } else {
    return 0;
  }
}

function formattedTotalSum(i18n, list, field) {
  let totalSum = calculateTotalSum(i18n, list, field);

  return i18n.formatDecimalNumber(totalSum)
}

function isDecimalNumbersEqual(left, right) {
  return roundDecimalNumber(left) === roundDecimalNumber(right)
}

export {
  calculateTotalSum,
  formattedTotalSum,
  isDecimalNumbersEqual,
  roundDecimalNumber
}
