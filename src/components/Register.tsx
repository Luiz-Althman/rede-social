import { useCallback, useState } from 'react';
import styles from './Register.module.css';
import igniteLogo from '../assets/Ignite-logo.svg';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import { IAuthRegister } from '../shared/types/Auth';
import toast from 'react-hot-toast';
import { registerCreate } from '../shared/services/Auth';
import { ROUTER } from '../shared/constants/router';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaArrowLeft } from 'react-icons/fa6';

const Schema = yup.object().shape({
    name: yup.string().required('Campo obrigatório.'),
    surname: yup.string().required('Campo obrigatório.'),
    role: yup.string().required('Campo obrigatório'),
    nickname: yup.string().required('Campo obrigatório'),
    email: yup
        .string()
        .email('Insira um e-mail válido.')
        .required('Campo obrigatório.'),
    password: yup.string().required('Campo obrigatório.'),
});

export function Register() {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const { handleSubmit, register } = useForm<IAuthRegister>({
        resolver: yupResolver(Schema),
        mode: 'onBlur',
        reValidateMode: 'onChange',
    });

    const signIn = useCallback(async (values: IAuthRegister) => {
        console.log('values =>', values);
        localStorage.setItem('email', values.email);
        return false;

        try {
            const { status } = await registerCreate(values);
            if ([200, 201, 404].includes(status)) {
                toast.success('Cadastrado com sucesso!', { duration: 1500 });
                setTimeout(() => {
                    window.location.href = ROUTER.LOGIN;
                }, 1500);
            } else {
                throw new Error('Ocorreu um erro, tente novamente.');
            }
        } catch (e: any) {
            toast.error(e.message);
        }
    }, []);

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <img src={igniteLogo} alt="Logotipo do Ignite" />
                <h1>Cadastro</h1>
            </header>
            <form className={styles.content} onSubmit={handleSubmit(signIn)}>
                <a href={ROUTER.LOGIN}>
                    <FaArrowLeft size={40} />
                </a>
                <div className={styles.input}>
                    <label className={styles.label} htmlFor="NameRegister">
                        Nome
                    </label>
                    <input
                        id="NameRegister"
                        className={styles.inputRegister}
                        type="text"
                        placeholder="Digite seu nome."
                        required
                        {...register('name')}
                    />
                </div>
                <div className={styles.input}>
                    <label className={styles.label} htmlFor="SurnameRegister">
                        Sobrenome
                    </label>
                    <input
                        id="SurnameRegister"
                        className={styles.inputRegister}
                        type="text"
                        placeholder="Digite seu sobrenome."
                        required
                        {...register('surname')}
                    />
                </div>
                <div className={styles.input}>
                    <label className={styles.label} htmlFor="NicknameRegister">
                        Apelido
                    </label>
                    <input
                        id="NicknameRegister"
                        className={styles.inputRegister}
                        type="text"
                        placeholder="Digite seu apelido."
                        required
                        {...register('nickname')}
                    />
                </div>
                <div className={styles.input}>
                    <label className={styles.label} htmlFor="RoleRegister">
                        Cargo/Profissão
                    </label>
                    <input
                        id="RoleRegister"
                        className={styles.inputRegister}
                        type="text"
                        placeholder="Digite seu cargo."
                        required
                        {...register('role')}
                    />
                </div>
                <div className={styles.input}>
                    <label className={styles.label} htmlFor="emailRegister">
                        E-mail
                    </label>
                    <input
                        id="emailRegister"
                        className={styles.inputRegister}
                        type="email"
                        placeholder="Digite seu e-mail."
                        required
                        {...register('email')}
                    />
                </div>
                <div className={styles.input} style={{ position: 'relative' }}>
                    <label className={styles.label} htmlFor="passwordRegister">
                        Senha
                    </label>
                    <input
                        id="passwordRegister"
                        className={styles.inputRegister}
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
                    <a href={ROUTER.LOGIN}>Já tenho cadastro</a>
                </div>
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}
