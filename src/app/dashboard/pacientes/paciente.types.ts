
export interface PacienteForm {
    nombre: string;
    telefono: string;
    email: string;
    nacimiento: Date | null;
    sexo: string;
}

export interface Paciente {
    id: string;
    nombre: string;
    telefono: string;
    email: string;
    nacimiento: Date | string;
    sexo: string;
}

export interface ListPacientesResponse {
    data: Paciente[];
    totalCount: number;
}

export interface FindOnePacienteResponse {
    data: Paciente;
}