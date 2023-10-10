import { Stakeholder } from "../types/stakeholder";

interface Column {
    id: keyof Stakeholder;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

export const stakeholderTableColumns: Column[] = [
    { id: 'id', label: 'ID', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'type', label: 'Type', minWidth: 150 },
    { id: 'identificationCode', label: 'Id', minWidth: 150 },
    { id: 'email', label: 'Email', minWidth: 150 },
    { id: 'phone', label: 'Phone', minWidth: 150 },
    { id: 'businessAddress', label: 'Business address', minWidth: 150 },
    { id: 'taxAddress', label: 'Tax address', minWidth: 150 },
    { id: 'stakeholderType', label: 'Stakeholder type', minWidth: 150 }
];