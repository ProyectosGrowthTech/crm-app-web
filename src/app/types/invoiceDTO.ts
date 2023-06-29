import { Invoice } from './invoice';

export interface InvoiceDTO {
  invoiceList: Invoice[];
  totalInvoices: number;
}
