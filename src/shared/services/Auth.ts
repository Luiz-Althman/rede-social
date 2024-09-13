import axiosInstance, { uri } from './api';
import {
    IAuthenticated,
    IAuthLogin,
    IAuthRegister,
    IAuthResponse,
    IPictureResponse,
    IUser,
    IUserResponse,
} from '../types/Auth';
import { AUTH_TOKEN, AUTH_USER } from '../constants/auth';

export const login = async (data: IAuthLogin): Promise<IAuthResponse> =>
    axiosInstance.post(`${uri}/auth/login`, data);

export const me = async (token?: string): Promise<IUserResponse> => {
    let headers = {};
    if (token)
        headers = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

    return axiosInstance.get(`${uri}/auth/me`, headers);
};

export const getAuthenticatedUser = (): IAuthenticated => {
    const auth = localStorage.getItem(AUTH_TOKEN);
    const user = localStorage.getItem(AUTH_USER);

    if (auth && user) {
        return { auth: JSON.parse(auth), user: JSON.parse(user) };
    }
    return {} as IAuthenticated;
};

export const registerCreate = async (
    data: IAuthRegister
): Promise<IAuthResponse> => {
    return axiosInstance.post(`${uri}/user`, data);
};

export const uploadPicture = (data: any): Promise<IPictureResponse> => {
    return axiosInstance.post('', data);
};

export const update = (data: IUser): Promise<IUserResponse> => {
    return axiosInstance.patch('', data);
};
