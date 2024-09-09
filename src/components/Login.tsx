import { useCallback, useEffect, useState } from 'react';
import styles from './Login.module.css';
import igniteLogo from '../assets/Ignite-logo.svg';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import { IAuthLogin } from '../shared/types/Auth';
import toast from 'react-hot-toast';
import { login } from '../shared/services/Auth';
import { ROUTER } from '../shared/constants/router';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const Schema = yup.object().shape({
    email: yup
        .string()
        .email('Insira um e-mail válido.')
        .required('Campo obrigatório.'),
    password: yup.string().required('Campo obrigatório.'),
});

export function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const withRegister = window.localStorage.getItem('email');

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const { handleSubmit, register, setValue } = useForm<IAuthLogin>({
        resolver: yupResolver(Schema),
        mode: 'onBlur',
        reValidateMode: 'onChange',
    });

    const signIn = useCallback(async (values: IAuthLogin) => {
        console.log('values =>', values);
        try {
            const { status } = await login(values);
            if ([200, 201, 404].includes(status)) {
                toast.success('Autenticado. Aguarde...', { duration: 1500 });
                localStorage.setItem('logged-user', 'true');
                setTimeout(() => {
                    window.location.href = ROUTER.HOME;
                }, 1500);
            } else {
                throw new Error('Email ou senha inválido.');
            }
        } catch (e: any) {
            toast.error(e.message);
        }
    }, []);

    useEffect(() => {
        if (withRegister && withRegister) {
            setValue('email', withRegister);
        }
    }, []);

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <img src={igniteLogo} alt="Logotipo do Ignite" />
                <h1>Login</h1>
            </header>
            <form className={styles.content} onSubmit={handleSubmit(signIn)}>
                <div className={styles.input}>
                    <label className={styles.label} htmlFor="emailLogin">
                        E-mail
                    </label>
                    <input
                        id="emailLogin"
                        className={styles.inputLogin}
                        type="email"
                        placeholder="Digite seu e-mail."
                        required
                        {...register('email')}
                    />
                </div>
                <div className={styles.input}>
                    <label className={styles.label} htmlFor="passwordLogin">
                        Senha
                    </label>
                    <input
                        id="passwordLogin"
                        className={styles.inputLogin}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Digite sua senha."
                        required
                        {...register('password')}
                    />
                    <button type="button" onClick={toggleShowPassword}>
                        {showPassword ? (
                            <IoMdEye size={25} />
                        ) : (
                            <IoMdEyeOff size={25} />
                        )}
                    </button>
                </div>
                <div className={styles.register}>
                    <a href={ROUTER.REGISTER}>Cadastre-se</a>
                </div>
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}
