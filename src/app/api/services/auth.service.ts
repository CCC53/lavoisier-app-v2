import { store } from "@/app/redux/store";
import { AuthDynamicFields } from "@/app/auth/auth.types";
import { AuthSuccessResponse, RegisterSuccessResponse } from "../api.types";
import { apiClient } from "../utils/apiClient";
import { setToken } from "@/app/redux/auth.slice";

export class AuthService {
    public static async auth(data: AuthDynamicFields, doRegister: boolean): Promise<{ token: string }> {
        try {
            const response = doRegister ? await apiClient.post<RegisterSuccessResponse>('/auth/register', data) : await apiClient.post<AuthSuccessResponse>('/auth/login', data);
            if (response.token) {
                store.dispatch(setToken(response.token));
            }
            return { token: response.token };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}