const columns = [{
  header: 'Match %',
  valueKeyPath: ['matchPercent'],
  valueType: 'number',
  componentType: 'number',
  width: 100,
}, {
  header: 'Order no.',
  valueKeyPath: ['orderNro'],
  valueType: 'number',
  componentType: 'number',
  width: 100,
}, {
  header: 'Article',
  valueKeyPath: ['article'],
  valueType: 'text',
  componentType: 'text',
  width: 240,
}, {
  header: 'ProductID',
  valueKeyPath: ['productID'],
  valueType: 'text',
  componentType: 'text',
  width: 100,
}, {
  header: 'Ordered',
  valueKeyPath: ['ordered'],
  valueType: 'number',
  componentType: 'number',
  width: 100,
}, {
  header: 'Delivered',
  valueKeyPath: ['delivered'],
  valueType: 'number',
  componentType: 'number',
  width: 100,
}, {
  header: 'Charged',
  valueKeyPath: ['charged'],
  valueType: 'number',
  componentType: 'number',
  width: 100,
}, {
  header: 'Unit price',
  valueKeyPath: ['unitPrice'],
  valueType: 'float',
  componentType: 'float',
  width: 100,
}, {
  header: 'Unit',
  valueKeyPath: ['unit'],
  valueType: 'text',
  componentType: 'text',
  width: 100,
}];

export default columns;
