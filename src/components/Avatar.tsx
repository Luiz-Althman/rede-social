import { ImgHTMLAttributes } from 'react';
import styles from './Avatar.module.css';

import { useRef } from 'react';
import { update, uploadPicture } from '../shared/services/Auth';
import toast from 'react-hot-toast';
import { useAuth } from '../shared/providers/auth';

import { PiPencilSimpleLineLight } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { ROUTER } from '../shared/constants/router';
import { DEFAULT_AVATAR } from '../shared/config/properties';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
    hasBorder?: boolean;
    editAvatar?: boolean;
}
//usando o extends eu consigo extender todos os atributos do <img> sem precisar passar na tipagem.

export function Avatar({
    hasBorder = true,
    editAvatar = false,
    ...props
}: AvatarProps) {
    // ...props (rest operator) permite que todas as propriedades que o <img> tem, sejam aceitas em qualquer lugar que usar o componente, sem precisar passar na interface ou em props direto na função como o hasBorder
    // const { user } = useAuth();

    const isSidebar = editAvatar;
    const navigate = useNavigate();

    const inputFile = useRef<any>(null);

    const handleChangeImg = () => {
        inputFile.current.click();
    };

    const handleImage = localStorage.getItem('user-image') ?? DEFAULT_AVATAR;

    // const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files && e.target.files[0]) {
    //         const formData = new FormData();
    //         formData.append('file', e.target.files[0]);
    //         const { status, data } = await uploadPicture(formData);
    //         if ([200, 201].includes(status)) {
    //             user.avatar = data.url;

    //             const { status: statusAvatar } = await update(user);

    //             if ([200, 201].includes(statusAvatar)) {
    //                 navigate(ROUTER.HOME);
    //                 toast.success('Alterado com sucesso!');
    //             }

    //             reload();
    //         } else {
    //             toast.error(
    //                 'Não foi possível alterar sua foto, tente novamente.'
    //             );
    //         }
    //         inputFile.current.value = '';
    //     }
    // };
    return isSidebar ? (
        <img
            className={hasBorder ? styles.avatarWithBorder : styles.avatar}
            {...props}
            //{...props} ele que captura tudo do ...props do que está declarado na função
        />
    ) : (
        <div className={styles.wrapper} onClick={handleChangeImg}>
            <input
                type="file"
                ref={inputFile}
                // onChange={handleSubmit}
                style={{ display: 'none' }}
            />
            <div className={styles.icon}>
                <PiPencilSimpleLineLight />
            </div>
            <img
                className={hasBorder ? styles.avatarWithBorder : styles.avatar}
                src={handleImage}
                // {...props}
                //{...props} ele que captura tudo do ...props do que está declarado na função
            />
        </div>
    );
}
