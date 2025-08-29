import { Paciente } from '../dashboard/pacientes/paciente.types';

export interface PacienteStore {
    pacientes: Paciente[];
    totalCount: number;
    currentPage: number;
    pageSize: number;
    error: string | null;
    loading: boolean;
}

export interface Pagination {
    pageSize: number;
    page: number;
}

export interface GlobalStore {
    pacientes: PacienteStore;
}

// Re-export types from store for convenience
export type { RootState, AppDispatch } from './store';