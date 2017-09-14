import _ from 'lodash';

/**
 * Enumeration of locales that is supported by the app
 */
const supportedLocales = [
  'en',
  'de'
];

/**
 * Enumeration of locale bundles
 */
const messageBundles = [
  'InvoiceGrid',
  'InvoiceImport',
  'MyTasks',
  'Navigation'
];
/**
 * Merges messages from all localeBundles with the same locale (one of @supportedLocales)
 * into a monolith object
 */
const getBundleForLocale = (locale) => {
  return _.reduce(messageBundles, (finalBundle, currentBundle) => {
    let messages = require(`./${currentBundle}/${locale}.json`);
    if(messages) {
      return {...finalBundle, ...messages};
    } else return finalBundle;
  }, {})
};

/**
 * Export object with the next notation:
 * {'en' : {'some.message.key': 'message']}
 */
export default _.reduce(supportedLocales, (localeBundle, locale) => {
  return {
    ...localeBundle,
    [locale]: getBundleForLocale(locale)
  }
}, {});

