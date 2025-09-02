import { SelectOption } from '../api/api.types';
import { Cita } from '../dashboard/citas/cita.types';
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

export interface CitaStore {
    citas: Cita[];
    selectedCita: Cita | null;
    pacientesInput: SelectOption[];
}


export interface GlobalStore {
    pacientes: PacienteStore;
    components: ComponentStore;
    citas: CitaStore;
}

export type { RootState, AppDispatch } from './store';