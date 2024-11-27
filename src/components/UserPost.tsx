import { InvalidEvent, useState } from 'react';
import styles from './UserPost.module.css';
import { ROUTER } from '../shared/constants/router';

import { useForm } from 'react-hook-form';
import { createNewPost } from '../shared/services/Feed';
import toast from 'react-hot-toast';

export interface NewPostType {
    content: string;
    userId: number;
}
export interface NewPostTypeResponse {
    status: number;
    data: NewPostType;
}

export function UserPost() {
    const [newPost, setNewPost] = useState('');

    const { register, handleSubmit, setValue } = useForm<NewPostType>({
        mode: 'onBlur',
        reValidateMode: 'onChange',
    });

    const onSubmit = async (values: NewPostType) => {
        try {
            const local = localStorage.getItem('socialMedia:dev:user');
            const userId = JSON.parse(local || '');

            values.userId = userId.userId;

            const { status, data } = await createNewPost(values);
            if ([200, 201].includes(status)) {
                toast.success('Postado com sucesso!', { duration: 1500 });
                setTimeout(() => {
                    window.location.href = ROUTER.HOME;
                }, 1000);
                setValue('content', '');
                setNewPost(data.content);
            } else {
                toast.error('Erro, tente novamente!', { duration: 1500 });
            }
        } catch (err) {
            console.log('error =>', err);
        }
    };

    // function handleNewPostChange(event: ChangeEvent<HTMLTextAreaElement>) {
    //     setNewPost(event.target.value);
    // }

    function handleNewPostInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        //essa função faz com que troquemos a mensagem do required, padrao do html. Pt-1
        event.target.setCustomValidity('Campo obrigatório');
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.post}>
                <textarea
                    placeholder="No que você está pensando...?"
                    onInvalid={handleNewPostInvalid}
                    required
                    {...register('content')}
                />

                <footer>
                    <button type="submit">Publicar</button>
                </footer>
            </form>
        </div>
    );
}
