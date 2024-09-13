export interface IUser {
    id: number;
    email: string;
    name: string;
    surname: string;
    role: string;
    avatar?: string;
}

export interface IUserResponse {
    data: IUser;
    status: number;
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

export interface IPicture {
    id: number;
    name: string;
    key: string;
    url: string;
    createdAt: string;
    updatedAt: string;
}

export interface IPictureResponse {
    status: number;
    data: IPicture;
}
