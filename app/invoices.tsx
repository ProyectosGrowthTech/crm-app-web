import React from 'react';
import TableExample from './table';

const InvoiceComponent = () => {
  // Table component content goes here
  return (
    <>
      <h1 className="mb-3 text-2xl font-semibold">Sold invoices</h1>
      <TableExample />
    </>
  );
};

export default InvoiceComponent;
