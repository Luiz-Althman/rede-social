import { ChangeEvent, InvalidEvent, useState } from 'react';
import styles from './UserPost.module.css';
import { ROUTER } from '../shared/constants/router';

import { useForm } from 'react-hook-form';
import { createNewPost } from '../shared/services/Feed';
import toast from 'react-hot-toast';

export interface NewPostType {
    content: string;
    id: number;
}
export interface NewPostTypeResponse {
    status: number;
    data: NewPostType;
}

export function UserPost() {
    const [newPost, setNewPost] = useState('');

    const maxLength = 200;

    const { register, handleSubmit, setValue } = useForm<NewPostType>({
        mode: 'onBlur',
        reValidateMode: 'onChange',
    });

    const onSubmit = async (values: NewPostType) => {
        console.log('values => ', values);
        try {
            const { status, data } = await createNewPost(values);
            if ([200, 201].includes(status)) {
                console.log('data =>', data);
                toast.success('Post feito!', { duration: 1500 });
                setTimeout(() => {
                    window.location.href = ROUTER.HOME;
                }, 1000);
                setValue('content', '');
            } else {
                toast.error('Erro, tente novamente!', { duration: 1500 });
            }
        } catch (err) {
            console.log('error =>', err);
        }
    };

    function handleNewPostChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setNewPost(event.target.value);
    }

    function handleNewPostInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        //essa função faz com que troquemos a mensagem do required, padrao do html. Pt-1
        event.target.setCustomValidity('Campo obrigatório');
    }
    const isNewPostEmpty = newPost.length === 0;

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.post}>
                <textarea
                    value={newPost}
                    placeholder="No que você está pensando...?"
                    onInvalid={handleNewPostInvalid}
                    required
                    maxLength={maxLength}
                    {...register('content')}
                    onChange={handleNewPostChange}
                />
                <div>
                    <p>{maxLength - newPost.length} caracteres restantes</p>
                </div>
                <footer>
                    <button disabled={isNewPostEmpty} type="submit">
                        Publicar
                    </button>
                </footer>
            </form>
        </div>
    );
}
