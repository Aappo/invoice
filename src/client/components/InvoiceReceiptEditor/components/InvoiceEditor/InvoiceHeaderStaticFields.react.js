import React, { PropTypes } from 'react';
import FormGroupMarkup from '../../../common/FormGroupMarkup/index';
import lodash from 'lodash';

const _extractInvoiceAddress = (addresses) => {
  if(!addresses) {
    return null;
  }
  let extractedAddress = lodash.find(addresses, (address) => {
    return address.type === 'invoice'
  });

  if (!extractedAddress) {
    extractedAddress = lodash.find(addresses, (address) => {
      return address.type === "default"
    })
  }

  return extractedAddress;
};

const _addressToString = (address) => {
  let result = '';
  let addressFields = [];
  if (address) {
    if (address.street) {
      addressFields.push(address.street)
    }
    if (address.zipCode) {
      addressFields.push(address.zipCode)
    }
    if (address.city) {
      addressFields.push(address.city)
    }
    if (address.countryCode) {
      addressFields.push(address.countryCode)
    }
  }
  if (addressFields.length) {
    result = lodash.join(addressFields, ", ")
  }
  return result;
};

const _contactToString = (contact) => {
  if (lodash.isEmpty(contact) || lodash.isNil(contact)) {
    return ''
  }

  let result = '';
  let contactFields = [];
  if (contact.firstName) {
    contactFields.push(contact.firstName)
  }
  if (contact.lastName) {
    contactFields.push(contact.lastName)
  }
  if (contact.phone) {
    contactFields.push(contact.phone)
  }
  if (contactFields.length) {
    result = lodash.join(contactFields, ", ")
  }
  return result
};

const InvoiceHeaderStaticFields = ({
  customer,
  supplier,
  supplierAddresses,
  supplierContacts
}) => {
  const fields = [
    {
      label: 'Labels.supplier',
      value: `${supplier.supplierId} - ${supplier.supplierName}`
    },
    {
      label: 'Labels.supplierAddress',
      value: _addressToString(_extractInvoiceAddress(supplierAddresses))
    },
    {
      label: 'Labels.supplierContact',
      value: _contactToString(supplierContacts? supplierContacts[0] : undefined)
    },
    {
      label: 'Labels.customer',
      value: `${customer.id} - ${customer.customerName}`
    },
    {
      label: 'Labels.customerAddress',
      value: _addressToString(_extractInvoiceAddress(customer.addressAssociations))
    },
    {
      label: 'Labels.vatRegNo',
      value: supplier.vatRegNo
    }
  ];

  return (
    <div>
      {fields.map((field) => (
        <FormGroupMarkup key={lodash.uniqueId()} label={field.label}>
            <span>
              {field.value || '-'}
            </span>
        </FormGroupMarkup>
      ))}
    </div>
  )
};

InvoiceHeaderStaticFields.propTypes = {
  customer: PropTypes.object.isRequired,
  supplier: PropTypes.object.isRequired
};

export default InvoiceHeaderStaticFields;
