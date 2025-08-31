
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

export interface DecodedPayload {
    sub: string;
    role: "R" | "N";
    id: string;
    iat: number;
    exp: number;
}

export interface RemoveItemResponse {
    removed: boolean;
}