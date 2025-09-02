import { FindOnePacienteResponse, ListPacientesResponse, PacienteForm } from "@/app/dashboard/pacientes/paciente.types";
import { apiClient } from "../utils/apiClient";
import { RemoveItemResponse } from "../api.types";

export class PacienteService {
    public static async listPacientes(page: number, pageSize: number): Promise<ListPacientesResponse> {
        try {
            const response = await apiClient.get<ListPacientesResponse>(`/paciente?page=${page}&pageSize=${pageSize}`);
            return response;
        } catch (error) {
            console.log('error on listPacientes: ', error);
            throw error;
        }
    }

    public static async findPacienteById(id: string): Promise<FindOnePacienteResponse> {
        try {
            const response = await apiClient.get<FindOnePacienteResponse>(`/paciente/${id}`);
            return response;
        } catch (error) {
            console.log('error on findPacienteById: ', error);
            throw error;
        }
    }

    public static async createPaciente(data: PacienteForm): Promise<FindOnePacienteResponse> {
        try {
            const response = await apiClient.post<FindOnePacienteResponse>(`/paciente`, data);
            return response;
        } catch (error) {
            console.log('error on createPaciente: ', error);
            throw error;
        }
    }

    public static async updatePaciente(id: string, data: PacienteForm): Promise<FindOnePacienteResponse> {
        try {
            const response = await apiClient.put<FindOnePacienteResponse>(`/paciente/${id}`, data);
            return response;
        } catch (error) {
            console.log('error on updatePaciente: ', error);
            throw error;
        }
    }

    public static async removePaciente(id: string): Promise<RemoveItemResponse> {
        try {
            const response = await apiClient.delete<RemoveItemResponse>(`/paciente/${id}`);
            return response;
        } catch (error) {
            console.log('error on removePaciente: ', error);
            throw error;
        }
    }
}