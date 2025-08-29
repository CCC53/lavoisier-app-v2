import { ListPacientesResponse } from "@/app/dashboard/pacientes/paciente.types";
import { apiClient } from "../utils/apiClient";

export class PacienteService {
    public static async listPacientes(page: number, pageSize: number): Promise<ListPacientesResponse> {
        try {
            const response = await apiClient.get<ListPacientesResponse>(`/paciente?page=${[page]}&pageSize=${pageSize}`);
            return response;
        } catch (error) {
            console.log('error on listPayments: ', error);
            throw error;
        }
    }
}