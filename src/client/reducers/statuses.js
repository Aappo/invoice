const invoiceStatuses = [
  { 'statusId': '070', 'description': 'rejected' },
  { 'statusId': '100', 'description': 'created' },
  { 'statusId': '390', 'description': 'approved' },
  { 'statusId': '400', 'description': 'transferred' },
  { 'statusId': '800', 'description': 'deleted' },
  { 'statusId': '820', 'description': 'registered' }
];

export default function statuses(state = { invoiceStatuses: invoiceStatuses }, action) {
  switch (action.type) {
    default:
      return state;
  }
}
