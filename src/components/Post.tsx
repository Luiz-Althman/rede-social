import {
    ChangeEvent,
    InvalidEvent,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import styles from './Post.module.css';
import { Comment } from './Comment';
import { Avatar } from './Avatar';
import { getPostsFeed } from '../shared/services/Feed';
import { DEFAULT_AVATAR } from '../shared/config/properties';

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

export interface PostType {
    id: number;
    author?: Author;
    createdAt: string;
    content: string;
}

export interface PostTypeResponse {
    status: number;
    data: PostType[];
}

export function Post() {
    const [comments, setComments] = useState([]);
    const [newCommentText, setNewCommentText] = useState('');
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

    const handleImage = localStorage.getItem('user-image') ?? DEFAULT_AVATAR;

    useEffect(() => {
        GetFeed();
    }, [GetFeed]);

    const maxLength = 200;

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
    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        // aqui setamos o setCustomValidity como vazio para que, dps do usuário tentar mandar o formulario vazio e ativar o required, ele possa digitar e enviar qualquer coisa. Sem isso, o usuário nao consegue mais mandar nada no campo. Pt-2
        event.target.setCustomValidity('');
        setNewCommentText(event.target.value);
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        //essa função faz com que troquemos a mensagem do required, padrao do html. Pt-1
        event.target.setCustomValidity('Campo obrigatório');
    }

    // function handleCreateNewComment(event: FormEvent) {
    //     //event.preventDefault() é utilizado para tirar o redirecionamento de tela que o form do html tem, por padrão, depois de um envio de um submit. Quando enviar o formulário, o usuário n da reload na tela.
    //     event.preventDefault();
    //     // ...comments serve para copiar tudo que tem no estado já, seria a mesma coisa do que colocar ['comentário novo'].
    //     setComments([...comments, newCommentText]);
    //     // event.target.comment.value = '' serve para limpar o campo depois do submit.
    //     setNewCommentText('');
    //     //setNewCommentText(''), seta o estado para vazio. Precisa colocar o value do textarea para ficar olhando o estado 'newCommentText'.
    // }

    function deleteComment(commentToDelete: string) {
        const commentsWithoutDeletedOne = comments.filter((comment) => {
            return comment !== commentToDelete;
        });

        setComments(commentsWithoutDeletedOne);
    }

    const isNewCommentEmpty = newCommentText.length === 0;

    return (
        <>
            {posts.map((item, index) => (
                <article className={styles.post} key={`id${index}`}>
                    <header>
                        <div className={styles.author}>
                            <Avatar src={handleImage} editAvatar />
                            <div className={styles.authorInfo}>
                                <strong>
                                    {item.author?.name || 'Luiz Henrique'}
                                </strong>
                                <span>{item.author?.role || 'Developer'}</span>
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

                    <form
                        // onSubmit={handleCreateNewComment}
                        className={styles.commentForm}
                    >
                        <strong>Deixe seu comentário</strong>
                        <textarea
                            name="comment"
                            onChange={handleNewCommentChange}
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
                        {comments.map((comment) => {
                            return (
                                <Comment
                                    content={comment}
                                    key={comment}
                                    onDeleteComment={deleteComment}
                                />
                            );
                        })}
                    </div>
                </article>
            ))}
        </>
    );
}
