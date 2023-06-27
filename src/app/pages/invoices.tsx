import React from 'react';
import TableExample from '../components/table';

const InvoicePage = () => {
  // Table component content goes here
  return (
    <>
      <h1 className="mb-3 text-2xl font-semibold">Sold invoices</h1>
      <TableExample />
    </>
  );
};

export default InvoicePage;
