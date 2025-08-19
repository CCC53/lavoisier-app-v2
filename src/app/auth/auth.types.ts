
export const ROL_OPTIONS = [
    { value: '', label: 'Seleccione un rol' },
    { value: 'N', label: 'Nutriologo' },
    { value: 'R', label: 'Recepcionista' }
]

export interface AuthDynamicFields {
    email: string;
    password: string;
    nombre: string,
    telefono: string,
    rol: string
}

export interface AuthDynamicFieldsTouched {
    email: boolean;
    password: boolean;
    nombre: boolean,
    telefono: boolean,
    rol: boolean
}

export interface AuthDynamicFieldsTouchedErrors {
    email: string;
    password: string;
    nombre: string,
    telefono: string,
    rol: string;
    general?: string;
}