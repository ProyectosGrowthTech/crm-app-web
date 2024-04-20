import { Address } from "../types/address";

interface Column {
    id: keyof Address;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

export const addressTableColumns: Column[] = [
    { id: 'id', label: 'ID', minWidth: 100 },
    { id: 'addressLine', label: 'Address Line', minWidth: 170 },
    { id: 'city', label: 'City', minWidth: 150 },
    { id: 'postalCode', label: 'Postal Code', minWidth: 150 },
    { id: 'country', label: 'Country', minWidth: 150 },
    { id: 'addressName', label: 'Address Name', minWidth: 150 },
    { id: 'state', label: 'State', minWidth: 150 },
];