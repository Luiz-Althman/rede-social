import { InvalidEvent, useCallback, useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import styles from './Post.module.css';
import { Avatar } from './Avatar';
import { getPostsFeed } from '../shared/services/Feed';
import { DEFAULT_AVATAR } from '../shared/config/properties';

export interface PostType {
    id: number;
    user: {
        id: number;
        name: string;
        surname: string;
    };
    content: string;
    createdAt: string;
    comment: [
        {
            id: number;
            userId: number;
            publishId: number;
            comment: string;
            createdAt: string;
            updatedAt: string;
        }
    ];
}

export interface PostTypeResponse {
    status: number;
    data: PostType[];
}

export function Post() {
    // const [comments, setComments] = useState([]);
    // const [newCommentText, setNewCommentText] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const [posts, setPosts] = useState<PostType[]>([]);

    const GetFeed = useCallback(async () => {
        const { status, data } = await getPostsFeed();
        try {
            if ([200, 201].includes(status)) {
                // Ordena os posts assim que são carregados
                const sortedData = [...data].sort((a, b) => {
                    if (sortOrder === 'desc') {
                        return (
                            new Date(a.createdAt).getTime() -
                            new Date(b.createdAt).getTime()
                        ); // Ascendente
                    } else {
                        return (
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime()
                        ); // Descendente
                    }
                });

                setPosts(sortedData); // Seta os posts já ordenados
            }
        } catch (err) {
            console.log(err);
        }
    }, [sortOrder]);

    useEffect(() => {
        GetFeed();
    }, [GetFeed]);

    // const maxLength = 200;

    // configura o formato da hora e os que estão com aspas simples é para o date-fns entender que não precisa formatar.
    // const publishedDateFormatted = format(
    //     posts[0]?.createdAt,
    //     "d 'de' LLLL 'às' HH:mm'h'",
    //     {
    //         locale: ptBR,
    //     }
    // );

    // // publishedDateRelativeToNow faz com que a data que foi postado fique no formato de, exemplo: "há cerca de 19 horas".
    // const publishedDateRelativeToNow = formatDistanceToNow(
    //     posts[0]?.createdAt,
    //     {
    //         locale: ptBR,
    //         addSuffix: true,
    //     }
    // );

    //O evento foi disparado de um campo do formulário e eu preciso falar isso para o typescript utilizando <HTMLTextAreaElement> isso se chama generics e o ChangeEvent especifica que o evento vem de um onChange e o HTMLTextAreaElement diz que o elemento é um textarea
    // const handleNewComment = useCallback(async (values:PostType) => {
    //     const { status, data } = await createNewComment(values);
    //     try {
    //         if ([200, 201].includes(status)) {

    //             setPosts(data.);
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }, [sortOrder]);

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        //essa função faz com que troquemos a mensagem do required, padrao do html. Pt-1
        event.target.setCustomValidity('Campo obrigatório');
    }

    // const isNewCommentEmpty = newCommentText.length === 0;

    return (
        <>
            {posts.map((item, index) => (
                <article className={styles.post} key={`id${index}`}>
                    <header>
                        <div className={styles.author}>
                            <Avatar
                                src={
                                    item.user && item.user.id === 1
                                        ? localStorage.getItem('user-image')
                                        : DEFAULT_AVATAR
                                }
                                editAvatar
                            />
                            <div className={styles.authorInfo}>
                                <strong>
                                    {item.user.name} {item.user.surname}
                                </strong>
                                <span>{'Desenvolvedor'}</span>
                            </div>
                        </div>
                        <time dateTime={item.createdAt}>
                            {formatDistanceToNow(
                                item.createdAt,

                                {
                                    locale: ptBR,
                                    addSuffix: true,
                                }
                            )}
                        </time>
                    </header>

                    <div className={styles.content}>
                        <p>{item.content}</p>
                    </div>

                    {/* <form
                        // onSubmit={handleCreateNewComment}
                        className={styles.commentForm}
                    >
                        <strong>Deixe seu comentário</strong>
                        <textarea
                            name="comment"
                            onChange={handleNewComment}
                            value={newCommentText}
                            placeholder="Deixe um comentário"
                            onInvalid={handleNewCommentInvalid}
                            maxLength={maxLength}
                            required
                        />
                        <div>
                            <p>
                                {maxLength - newCommentText.length} caracteres
                                restantes
                            </p>
                        </div>
                        <footer>
                            <button disabled={isNewCommentEmpty} type="submit">
                                Publicar
                            </button>
                        </footer>
                    </form>

                    <div className={styles.commentList}>
                        {posts.map((comment) => {
                            return (
                                <Comment
                                    content={comment.comment[0]}
                                    
                                />
                            );
                        })}
                    </div> */}
                </article>
            ))}
        </>
    );
}
