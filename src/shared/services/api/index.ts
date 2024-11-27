import axios, { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';
import { API_URL } from '../../config/properties';
import { ROUTER } from '../../constants/router';
import { AUTH_TOKEN } from '../../constants/auth';

export const uri = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
});

const excessionRouter = [, ROUTER.LOGIN, ROUTER.REGISTER, ROUTER.HOME];

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    let token: any = localStorage.getItem(AUTH_TOKEN);

    if (token && config) {
        try {
            const parsedToken = JSON.parse(token);
            if (parsedToken && parsedToken.access_token) {
                config.headers = config.headers || new AxiosHeaders();
                config.headers.set(
                    'Authorization',
                    `Bearer ${parsedToken.access_token}`
                );
            }
        } catch (error) {
            console.error('Erro ao analisar o token:', error);
        }
    }

    return config;
});

axiosInstance.interceptors.response.use(undefined, (error) => {
    if (error.response && error.response.status === 401) {
        if (!excessionRouter.includes(window.location.pathname)) {
            window.location.href = '/login';
            localStorage.clear();
        }
    }
    return error.response;
});

export default axiosInstance;
