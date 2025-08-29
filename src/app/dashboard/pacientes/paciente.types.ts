
export interface PacienteForm {
    nombre: string;
    telefono: string;
    email: string;
    fechaNacimiento: Date | null;
    sexo: string;
}

export interface Paciente {
    id: string;
    nombre: string;
    telefono: string;
    email: string;
    fechaNacimiento: Date | null;
    sexo: string;
}

export interface ListPacientesResponse {
    data: Paciente[];
    totalCount: number;
}