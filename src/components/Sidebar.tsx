import styles from './Sidebar.module.css';

import { PiPencilSimpleLineLight } from 'react-icons/pi';
import { Avatar } from './Avatar';

export function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <img
                src="https://images.unsplash.com/photo-1546146830-2cca9512c68e?q=50&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Foto de capa"
                className={styles.cover}
            />

            <div className={styles.profile}>
                <Avatar src="https://github.com/Luiz-Althman.png" />
                <strong>Luiz Henrique</strong>
                <span>Web Developer</span>
            </div>

            <footer>
                <a href="#">
                    <PiPencilSimpleLineLight size={20} /> Editar seu perfil
                </a>
            </footer>
        </aside>
    );
}
