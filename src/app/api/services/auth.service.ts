import { jwtDecode } from "jwt-decode";
import { AuthDynamicFields } from "@/app/auth/auth.types";
import { AuthSuccessResponse, DecodedPayload, RegisterSuccessResponse } from "../api.types";
import { apiClient } from "../utils/apiClient";

export class AuthService {
    public static async auth(data: AuthDynamicFields, doRegister: boolean): Promise<{ token: string }> {
        try {
            const response = doRegister ? await apiClient.post<RegisterSuccessResponse>('/auth/register', data) : await apiClient.post<AuthSuccessResponse>('/auth/login', data);
            if (response.token) {
                localStorage.setItem('token', response.token);
            }
            return { token: response.token };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public static getPayloadFromToken() {
        const token = localStorage.getItem('token');
        if (!token) {
            return {} as DecodedPayload;
        }
        const decoded = jwtDecode(token) as DecodedPayload;
        return decoded;
    }
}