
export interface Column {
    field: string;
    header: string;
}

export interface DyamicTableProps {
    columns: Column[];
    data: Record<string, any>[];
}