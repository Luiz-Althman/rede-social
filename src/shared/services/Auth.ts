import axiosInstance, { uri } from './api';
import { IAuthLogin, IAuthRegister, IAuthResponse } from '../types/Auth';

export const login = async (data: IAuthLogin): Promise<IAuthResponse> =>
    axiosInstance.post(`${uri}/login`, data);

export const registerCreate = async (
    data: IAuthRegister
): Promise<IAuthResponse> => {
    return axiosInstance.post(`${uri}/user`, data);
};
