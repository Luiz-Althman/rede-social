import React from 'react';

import { IAuthLogin } from '../../../shared/types/Auth';
import { login, me } from '../../../shared/services/Auth';

import { IAuthenticated } from '../../../shared/types/Auth';
import {
    clearAuthenticatedUser,
    getAuthenticatedUser,
    setAuthenticatedUser,
} from '../../../shared/parsers/localstorage';
import { getDifferenceInMinutes } from '../../../shared/parsers/date';
import toast from 'react-hot-toast';
import { IUser } from '../../../shared/types/Auth';
import { ROUTER } from '../../constants/router';

interface IProps {
    children: any;
}

export interface IAuthContext {
    user: IUser;
    setUser: (value: IUser) => void;
    isAuthenticated: boolean;
    data: IAuthenticated;
    signIn: (formData: IAuthLogin, callback?: () => void) => void;
    signOut: () => void;
    error: Error;
    onSubmit: (value: IAuthLogin) => void;
}

const AuthContext = React.createContext({} as IAuthContext);

const TOKEN_VALID_MINUTES = 60;

const AuthProvider: React.FC<IProps> = ({ children }) => {
    const [user, setUser] = React.useState<IUser>({} as IUser);
    const [error] = React.useState<Error>({} as Error);

    const [data, setData] = React.useState<IAuthenticated>(() => {
        const authenticated = getAuthenticatedUser();

        if (authenticated.auth) {
            const isTokenExpired =
                getDifferenceInMinutes(
                    new Date(),
                    new Date(authenticated.auth.expire_at || '')
                ) >= TOKEN_VALID_MINUTES;

            if (isTokenExpired) {
                clearAuthenticatedUser();
                return {} as IAuthenticated;
            }
        }

        return authenticated;
    });

    const signIn = React.useCallback(async (values: IAuthLogin) => {
        try {
            const { status, data } = await login(values);
            if ([200, 201].includes(status)) {
                toast.success('Autenticado. Aguarde...');
                localStorage.setItem('logged-email', values.email);

                const { status: statusMe, data: dataMe } = await me(
                    data.access_token
                );

                if (statusMe !== 200) {
                    throw new Error('Email ou senha inválido.');
                }
                const authenticated: IAuthenticated = {
                    auth: { access_token: data.access_token },
                    user: dataMe,
                };
                if (!localStorage.getItem('user')) {
                    localStorage.setItem(
                        'userMock',
                        JSON.stringify({ userId: 1 })
                    );
                }
                setAuthenticatedUser(authenticated);
                setData(authenticated);
                setTimeout(() => {
                    window.location.href = ROUTER.HOME;
                }, 2500);
            } else {
                throw new Error('Email ou senha inválido.');
            }
        } catch (e: any) {
            toast.error(e.message);
        }
    }, []);

    // const reload = React.useCallback(async (): Promise<boolean> => {
    //     try {
    //       if (!localStorage.getItem(AUTH_TOKEN)) return false;
    //       const { status, data } = await me();
    //       if (status === 200) {
    //         setUser(data);
    //       }
    //       return true;
    //     } catch (e: any) {
    //       console.log(e.message);
    //       return false;
    //     }
    //   }, []);

    const signOut = React.useCallback(() => {
        clearAuthenticatedUser();
        setData({} as IAuthenticated);
        window.location.href = ROUTER.LOGIN;
    }, []);

    const onSubmit = React.useCallback(
        (formData: IAuthLogin) => {
            signIn(formData);
        },
        [signIn]
    );

    const value = React.useMemo(
        () => ({
            user,
            setUser,
            onSubmit,
            data,
            isAuthenticated: Boolean(data.auth?.access_token && data.user),
            signIn,
            signOut,
            error,
        }),
        [user, setUser, onSubmit, data, signIn, signOut, error]
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

const useAuth = (): IAuthContext => React.useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
