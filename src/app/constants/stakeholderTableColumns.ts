import { Stakeholder } from "../types/stakeholder";

interface Column {
    id: keyof Stakeholder;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

export const invoiceTableColumns: Column[] = [
    { id: 'id', label: 'ID', minWidth: 100 },
    { id: 'name', label: 'Invoice Date', minWidth: 170 },
    { id: 'type', label: 'Total Amount', minWidth: 150 },
    { id: 'identificationCode', label: 'Status', minWidth: 150 },
    { id: 'email', label: 'Type', minWidth: 150 },
    { id: 'phone', label: 'Status', minWidth: 150 },
    { id: 'businessAddress', label: 'Status', minWidth: 150 },
    { id: 'taxAddress', label: 'Status', minWidth: 150 },
    { id: 'stakeholderType', label: 'Status', minWidth: 150 }
];