import React from 'react';

import { IAuthLogin } from '../../../shared/types/Auth';
import { AUTH_TOKEN } from '../../../shared/constants/auth';
import { login, me } from '../../../shared/services/Auth';

import { useNavigate } from 'react-router-dom';
import { IAuthenticated } from '../../../shared/types/Auth';
import {
    clearAuthenticatedUser,
    getAuthenticatedUser,
    setAuthenticatedUser,
} from '../../../shared/parsers/localstorage';
import { getDifferenceInMinutes } from '../../../shared/parsers/date';
import toast from 'react-hot-toast';
import { IUser } from '../../../shared/types/Auth';

interface IProps {
    children: any;
}

export interface IAuthContext {
    user: IUser;
    setUser: (value: IUser) => void;

    reload: () => void;
    isAuthenticated: boolean;
    data: IAuthenticated;
    signIn: (formData: IAuthLogin, callback?: () => void) => void;
    signOut: () => void;
    error: Error;
    loading: boolean;
    typeProfile: any;
    setTypeProfile: any;
    onSubmit: (value: IAuthLogin) => void;
    handleToHome?: () => void;
    handleToRecovery?: () => void;
    handleToTypeProfile?: () => void;
    isKeepData: boolean;
    setIsKeepData: (value: boolean) => void;
    handleSignature: (value: string) => string;
    handleTypeOfProfessional: (value: string) => string;
}

const AuthContext = React.createContext({} as IAuthContext);

const TOKEN_VALID_MINUTES = 120;

const AuthProvider: React.FC<IProps> = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = React.useState<IUser>({} as IUser);

    const [error] = React.useState<Error>({} as Error);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [typeProfile, setTypeProfile] = React.useState('');
    const [isKeepData, setIsKeepData] = React.useState<boolean>(
        localStorage.getItem('keepData') ? true : false
    );

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

    const handleSignature = React.useCallback((value: string): string => {
        if ('EVALUATION' === value) return 'Período de teste (30 dias)';
        if ('FREE' === value) return 'Grátis (Free)';
        if ('BASIC' === value) return 'Básico (Basic)';
        if ('PREMIUM' === value) return 'Premium';
        if ('ENTERPRISE' === value) return 'Enterprise';
        return value;
    }, []);

    const handleTypeOfProfessional = React.useCallback(
        (value: string): string => {
            if ('PHYSIOTHERAPIST' === value) return 'Fisioterapeuta';
            if ('DOCTOR' === value) return 'Médico';
            if ('ODONTOLOGIST' === value) return 'Odontologista';
            if ('OCCUPATIONAL_THERAPIST' === value)
                return 'Terapeuta Ocupacional';
            return value;
        },
        []
    );

    const signIn = React.useCallback(async (values: IAuthLogin) => {
        try {
            setLoading(true);
            const { status, data } = await login(values);
            if ([200, 201].includes(status)) {
                toast.success('Autenticado. Aguarde...');
                localStorage.setItem('logged-email', values.email);
                localStorage.getItem('token');
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
                setAuthenticatedUser(authenticated);
                setData(authenticated);
                window.location.href = '/home';
            } else {
                throw new Error('Email ou senha inválido.');
            }
        } catch (e: any) {
            toast.error(e.message);
            setLoading(false);
        }
        setLoading(false);
    }, []);

    const reload = React.useCallback(async (): Promise<boolean> => {
        try {
            if (!localStorage.getItem(AUTH_TOKEN)) return false;
            const { status, data } = await me();
            if (status === 200) {
                setUser(data);
            }
            return true;
        } catch (e: any) {
            console.log(e.message);
            return false;
        }
    }, []);

    const signOut = React.useCallback(() => {
        clearAuthenticatedUser();
        setData({} as IAuthenticated);
        window.location.href = '/login';
    }, []);

    const onSubmit = React.useCallback(
        (formData: IAuthLogin) => {
            signIn(formData);
        },
        [signIn]
    );

    const handleToHome = React.useCallback(() => {
        navigate('/home');
    }, [navigate]);

    const handleToRecovery = React.useCallback(() => {
        navigate('/forget');
    }, [navigate]);

    const handleToTypeProfile = React.useCallback(() => {
        navigate('/typeProfile');
    }, [navigate]);

    React.useEffect(() => {
        reload();
    }, [reload]);

    const value = React.useMemo(
        () => ({
            user,
            setUser,
            onSubmit,
            handleToHome,
            handleToRecovery,
            handleToTypeProfile,
            data,
            typeProfile,
            setTypeProfile,
            isAuthenticated: Boolean(data.auth?.access_token && data.user),
            signIn,
            signOut,
            error,
            loading,
            isKeepData,
            setIsKeepData,
            reload,
            handleSignature,
            handleTypeOfProfessional,
        }),
        [
            user,
            setUser,
            onSubmit,
            handleToHome,
            handleToRecovery,
            handleToTypeProfile,
            data,
            typeProfile,
            setTypeProfile,
            signIn,
            signOut,
            error,
            loading,
            isKeepData,
            setIsKeepData,
            reload,
            handleSignature,
            handleTypeOfProfessional,
        ]
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

const useAuth = (): IAuthContext => React.useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
