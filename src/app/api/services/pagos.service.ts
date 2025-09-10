import { ListPagoResponse, PagoForm, PagoResponse } from "@/app/dashboard/pagos/pagos.types";
import { apiClient } from "../utils/apiClient";

export class PagosService {
    public static async listPagos(page: number, pageSize: number): Promise<ListPagoResponse> {
        try {
            const response = await apiClient.get<ListPagoResponse>(`/pagos?page=${page}&pageSize=${pageSize}`);
            return response;
        } catch (error) {
            console.log('error on listPagos: ', error);
            throw error;
        }
    }

    public static async findByID(id: string): Promise<PagoResponse> {
        try {
            const response = await apiClient.get<PagoResponse>(`/pagos/${id}`);
            return response;
        } catch (error) {
            console.log('error on findByID: ', error);
            throw error;
        }
    }

    public static async createPago(data: PagoForm): Promise<PagoResponse> {
        try {
            const response = await apiClient.post<PagoResponse>('/pagos', data);
            return response;
        } catch (error) {
            console.log('error on createPago: ', error);
            throw error;
        }
    }
}