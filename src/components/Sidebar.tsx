import styles from './Sidebar.module.css';

import { CiLogout } from 'react-icons/ci';
import { Avatar } from './Avatar';
import { useAuth } from '../shared/providers/auth';
import { useEffect } from 'react';
import { DEFAULT_AVATAR } from '../shared/config/properties';

export function Sidebar() {
    const { signOut } = useAuth();

    const details = localStorage.getItem('user');
    const detailsMock = localStorage.getItem('socialMedia:dev:user');

    const user = JSON.parse(details || '{}');
    const userMock = JSON.parse(detailsMock || '{}');

    useEffect(() => {
        console.log('oi', userMock.userId);
    }, [userMock]);

    return (
        <aside className={styles.sidebar}>
            <img
                src="https://images.unsplash.com/photo-1546146830-2cca9512c68e?q=50&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Foto de capa"
                className={styles.cover}
            />

            <div className={styles.profile}>
                <Avatar src={DEFAULT_AVATAR} />
                <strong>
                    {user && user.name}{' '}
                    {userMock.userId === 1 && 'Luiz Althman'}{' '}
                    {user && user.surname}
                </strong>
                <span>{user?.role}</span>
            </div>

            <footer>
                {/* <a href="#">
                    <PiPencilSimpleLineLight size={20} /> Editar seu perfil
                </a> */}
                <a onClick={signOut}>
                    <CiLogout size={20} /> Sair
                </a>
            </footer>
        </aside>
    );
}
