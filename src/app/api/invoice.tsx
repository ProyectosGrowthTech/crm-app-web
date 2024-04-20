import { Invoice } from "../types/invoice";
import { InvoiceDetails } from "../types/invoiceDetails";

export async function postInvoice(invoice: InvoiceDetails) {
  try {
    const url = 'http://localhost:8082/v1/invoice/';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(invoice)
    });

    if (!response.ok) {
      throw new Error('Failed to post invoice');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error posting invoice:', error);
    throw error;
  }
}

export async function getInvoices(page = 0, pageSize = 10) {
  try {
    const url = `http://localhost:8082/v1/invoice/?page=${page}&pageSize=${pageSize}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();

    const invoiceList = data.invoiceList.map((invoice: Invoice) => ({
      ...invoice,
      invoiceDate: new Date(invoice.invoiceDate) // Convert invoiceDate to Date object
    }));

    return {
      ...data,
      invoiceList
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}