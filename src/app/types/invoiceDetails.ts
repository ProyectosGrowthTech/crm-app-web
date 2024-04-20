export interface InvoiceDetails {
    id: number;
    invoiceDate: Date;
    taxableAmount: number | null;
    tax: number | null;
    totalAmount: number | null;
    status: string;
    type: number | null;
    stakeholderOriginId: string | null;
    stakeholderDestinationId: number | null;
    payment: number | null;
  }