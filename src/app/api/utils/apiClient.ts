import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class ApiClient {
    private static instance: ApiClient;
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
            timeout: 15000,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        this.setupInterceptors();
    }

    public static getInstance(): ApiClient {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient();
        }
        return ApiClient.instance;
    }

    public setupInterceptors(): void {
        this.axiosInstance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        this.axiosInstance.interceptors.response.use(
            (res) => res, async(error: AxiosError) => {
                if (error.response?.status === 401 || error.response?.status === 403) {
                    localStorage.removeItem('token');
                    window.location.href = '/auth';
                }
                return Promise.reject(error);
            }
        );
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return (await this.axiosInstance.get<T>(url, config)).data;
    }

    public async post<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T> {
        return (await this.axiosInstance.post<T, AxiosResponse<T>, D>(url, data, config)).data;
    } 

    public async put<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T> {
        return (await this.axiosInstance.put<T, AxiosResponse<T>, D>(url, data, config)).data;
    }

    public async delete<T, D = unknown>(url: string, config?: AxiosRequestConfig<D>): Promise<T> {
        return (await this.axiosInstance.delete<T>(url, config)).data;
    }
}

export const apiClient = ApiClient.getInstance();