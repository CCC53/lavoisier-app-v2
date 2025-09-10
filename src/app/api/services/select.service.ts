import { ListPacientesResponse } from "@/app/dashboard/pacientes/paciente.types";
import { SelectOption } from "../api.types";
import { apiClient } from "../utils/apiClient";
import { ListCitasResponse } from "@/app/dashboard/citas/cita.types";

export class SelectService {
    public static async listPacientesOptions(): Promise<SelectOption[]> {
        try {
            const response = await apiClient.get<ListPacientesResponse>('/paciente?page=0&pageSize=100');
            return response.data.map(p => ({ value: p.id, label: p.nombre } as SelectOption));
        } catch (error) {
            console.log('error on listPacientesOptions: ', error);
            throw error;
        }
    }

    public static async listCitasOptions(): Promise<SelectOption[]> {
        try {
            const response = await apiClient.get<ListCitasResponse>('/cita?page=0&pageSize=100');
            return response.data.map(c => ({ value: c.id, label: `${c.motivo} - ${c.paciente.nombre}` } as SelectOption));
        } catch (error) {
            console.log('error on listPacientesOptions: ', error);
            throw error;
        }
    }
}