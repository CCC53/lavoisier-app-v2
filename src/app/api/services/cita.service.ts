import { CitaForm, CitaResponse, ListCitasResponse } from "@/app/dashboard/citas/cita.types";
import { apiClient } from "../utils/apiClient";
import { RemoveItemResponse } from "../api.types";

export class CitaService {
    public static async listCitas(page: number, pageSize: number): Promise<ListCitasResponse> {
        try {
            const response = await apiClient.get<ListCitasResponse>(`/cita?page=${page}&pageSize=${pageSize}`);
            return response;
        } catch (error) {
            console.log('error on listCitas: ', error);
            throw error;
        }
    }

    public static async findCitaById(id: string): Promise<CitaResponse> {
        try {
            const response = await apiClient.get<CitaResponse>(`/cita/${id}`);
            return response;
        } catch (error) {
            console.log('error on findCitaById: ', error);
            throw error;
        }
    }

    public static async createCita(data: CitaForm): Promise<CitaResponse> {
        try {
            const response = await apiClient.post<CitaResponse>('/cita', data);
            return response;
        } catch (error) {
            console.log('error on createCita: ', error);
            throw error;
        }
    }

    public static async updateCita(id: string, data: CitaForm): Promise<CitaResponse> {
        try {
            const response = await apiClient.put<CitaResponse>(`/cita/${id}`, data);
            return response;
        } catch (error) {
            console.log('error on updateCita: ', error);
            throw error;
        }
    }

    public static async removeCita(id: string): Promise<RemoveItemResponse> {
        try {
            const response = await apiClient.delete<RemoveItemResponse>(`/cita/${id}`);
            return response;
        } catch (error) {
            console.log('error on removeCita: ', error);
            throw error;
        }
    }
}