import { Paciente } from "../pacientes/paciente.types";

export interface Cita {
    id: string;
    motivo: string;
    fecha: Date | string;
    horario: string;
    paciente: Paciente;
}

export interface CitaForm {
    motivo: string;
    fecha: Date | null;
    horario: string;
    paciente: string;
}

export interface ListCitasResponse {
    data: Cita[];
    totalCount: number;
}

export interface CitaResponse {
    data: Cita;
}