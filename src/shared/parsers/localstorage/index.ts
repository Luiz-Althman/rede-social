/* eslint-disable import/prefer-default-export */
import { AUTH_TOKEN, AUTH_USER } from '../../../shared/constants/auth';
import { IAuthenticated } from '../../../shared/types/Auth';

export const getAuthenticatedUser = (): IAuthenticated => {
    const auth = localStorage.getItem(AUTH_TOKEN);
    const user = localStorage.getItem(AUTH_USER);

    if (auth && user) {
        return { auth: JSON.parse(auth), user: JSON.parse(user) };
    }
    return {} as IAuthenticated;
};

export const clearAuthenticatedUser = (): void => {
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(AUTH_USER);
};

export const setAuthenticatedUser = ({ auth, user }: IAuthenticated): void => {
    localStorage.setItem(AUTH_TOKEN, JSON.stringify(auth));
    localStorage.setItem(AUTH_USER, JSON.stringify(user));
};
