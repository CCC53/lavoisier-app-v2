import { Cita } from "../citas/cita.types";

export interface Pago {
    id: string;
    monto: number;
    metodoPago: string;
    tipoPago: number;
    cantidadRecibida: number;
    cambio: number;
    cita: Cita;
}

export interface PagoForm {
    monto: number | string;
    tipoPago: number | string;
    metodoPago: string;
    cantidadRecibida: number | string;
    cambio: number | null | string;
    citaId: string;
}

export interface ListPagoResponse {
    data: Pago[];
    totalCount: number;
}

export interface PagoResponse {
    data: Pago;
}