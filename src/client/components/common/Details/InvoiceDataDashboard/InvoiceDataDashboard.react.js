import React from 'react';
import AttachmentDetails from './AttachmentDetails/index';
import SupplierDetails from './SupplierDetails/index'
import PriceDetails from './PriceDetails/index'
import CommentHistory from './CommentHistory/index'
import { Collapsible, Dashboard, DashboardWidget } from '@opuscapita/react-dashboard';

const InvoiceDataDashboard = ({invoice}, context) => (
  <Dashboard>
    <DashboardWidget id="supplierDetails" w={12} h={4}>
      <Collapsible title="Supplier">
        <SupplierDetails invoice={invoice}/>
      </Collapsible>
    </DashboardWidget>
    <DashboardWidget id="priceDetails" w={12} h={5}>
      <Collapsible title="Totals">
        <PriceDetails invoice={invoice}/>
      </Collapsible>
    </DashboardWidget>
    <DashboardWidget id="comments" w={12} h={4}>
      <Collapsible title="Comments">
        <CommentHistory invoice={invoice}/>
      </Collapsible>
    </DashboardWidget>
    <DashboardWidget id="attachments" w={12} h={3}>
      <Collapsible title="Attachments">
        <AttachmentDetails invoice={invoice}/>
      </Collapsible>
    </DashboardWidget>
  </Dashboard>
);

export default InvoiceDataDashboard;
