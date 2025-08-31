import React from "react";

export interface Column {
    field: string;
    header: string;
}

export interface DyamicTableProps {
    columns: Column[];
    totalItems: number;
    rowsPerPage: number;
    page: number;
    onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onDetails: (item: Record<string, any>) => void;
    onDelete: () => void;
    data: Record<string, any>[];
}

export interface DeleteModalProps {
    closeDeleteModal: () => void;
    onDelete: () => void;
}