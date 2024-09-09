export interface IUser {
    id: number;
    email: string;
    name: string;
    surname: string;
    role: string;
}

export interface IAuth {
    access_token: string;
    expire_at?: string;
}

export interface IAuthResponse {
    status: number;
    data: IAuth;
}

export interface IAuthenticated {
    user: IUser;
    auth: IAuth;
}

export interface IAuthLogin {
    email: string;
    password: string;
}

export interface IAuthRegister {
    name: string;
    surname: string;
    nickname: string;
    email: string;
    role: string;
    password: string;
}

export interface IAuthRegisterResponse {
    data: IAuthRegister;
    status: number;
}
