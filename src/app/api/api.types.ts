
export interface Personal {
    id: string;
    nombre: string;
    telefono: string;
    email: string;
    rol: string;
}

export interface AuthSuccessResponse {
    token: string;
}

export interface RegisterSuccessResponse {
    personal: Personal;
    token: string;
}