import { Invoice } from "../types/invoice";

interface Column {
    id: keyof Invoice;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

export const invoiceTableColumns: Column[] = [
    { id: 'id', label: 'ID', minWidth: 100 },
    { id: 'invoiceDate', label: 'Invoice Date', minWidth: 170 },
    { id: 'totalAmount', label: 'Total Amount', minWidth: 150 },
    { id: 'status', label: 'Status', minWidth: 150 },
    { id: 'invoiceType', label: 'Type', minWidth: 150 },
];