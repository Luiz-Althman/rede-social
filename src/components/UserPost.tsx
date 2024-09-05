import { ChangeEvent, InvalidEvent, useState } from 'react';
import styles from './UserPost.module.css';

import { useForm } from 'react-hook-form';
import { createNewPost } from '../shared/services/Feed';
import toast from 'react-hot-toast';

interface NewPostType {
    content: string;
    id: number;
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
        console.log('values => ', values);
        return false;
        try {
            const { status, data } = await createNewPost();
            if ([200, 201].includes(status)) {
                console.log('data =>', data);
                toast.success('Post feito!', { duration: 1500 });
                window.location.href = '/';
                setValue('content', '');
            } else {
                toast.error('Erro ao fazer o post!', { duration: 1500 });
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
                    placeholder="No que você está pensando ?"
                    onInvalid={handleNewPostInvalid}
                    required
                    {...register('content')}
                    onChange={handleNewPostChange}
                />
                <footer>
                    <button disabled={isNewPostEmpty} type="submit">
                        Publicar
                    </button>
                </footer>
            </form>
        </div>
    );
}
