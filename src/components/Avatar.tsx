import { ImgHTMLAttributes } from 'react';
import styles from './Avatar.module.css';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
    hasBorder?: boolean;
}
//usando o extends eu consigo extender todos os atributos do <img> sem precisar passar na tipagem.

export function Avatar({ hasBorder = true, ...props }: AvatarProps) {
    // ...props (rest operator) permite que todas as propriedades que o <img> tem, sejam aceitas em qualquer lugar que usar o componente, sem precisar passar na interface ou em props direto na função como o hasBorder
    return (
        <img
            className={hasBorder ? styles.avatarWithBorder : styles.avatar}
            {...props}
            //{...props} ele que captura tudo do ...props do que está declarado na função
        />
    );
}
