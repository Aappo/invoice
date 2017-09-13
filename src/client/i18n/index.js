import _ from 'lodash';
import InvoiceGrid from './InvoiceGrid';
import InvoiceImport from './InvoiceImport';
import MyTasks from './MyTasks';
import Navigation from './Navigation';

export default _.merge({},
  InvoiceGrid,
  InvoiceImport,
  MyTasks,
  Navigation
);
