import { Paciente } from '../dashboard/pacientes/paciente.types';

export interface PacienteStore {
    pacientes: Paciente[];
    selectedPaciente: Paciente | null;
    error: string | null;
}

export interface ComponentStore {
    totalCount: number;
    currentPage: number;
    pageSize: number;
    loading: boolean;
    modalOpen: boolean;
    selectedRow: Record<string, any> | null;
}

export interface Pagination {
    pageSize: number;
    page: number;
}

export interface GlobalStore {
    pacientes: PacienteStore;
    components: ComponentStore
}

// Re-export types from store for convenience
export type { RootState, AppDispatch } from './store';