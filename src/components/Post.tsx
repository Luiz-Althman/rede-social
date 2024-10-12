import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import styles from './Post.module.css';
import { Comment } from './Comment';
import { Avatar } from './Avatar';

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

interface Content {
    type: string;
    content: string;
}
export interface PostType {
    id: number;
    author: Author;
    publishedAt: Date;
    content: Content[];
}

export interface PostTypeResponse {
    status: number;
    data: PostType[];
}

interface PostProps {
    post: PostType;
}

export function Post({ post }: PostProps) {
    const [comments, setComments] = useState(['Post muito bacana, hein?']);
    const [newCommentText, setNewCommentText] = useState('');

    const maxLength = 200;

    // configura o formato da hora e os que estão com aspas simples é para o date-fns entender que não precisa formatar.
    const publishedDateFormatted = format(
        post.publishedAt,
        "d 'de' LLLL 'às' HH:mm'h'",
        {
            locale: ptBR,
        }
    );

    // publishedDateRelativeToNow faz com que a data que foi postado fique no formato de, exemplo: "há cerca de 19 horas".
    const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
        locale: ptBR,
        addSuffix: true,
    });

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

    function handleCreateNewComment(event: FormEvent) {
        //event.preventDefault() é utilizado para tirar o redirecionamento de tela que o form do html tem, por padrão, depois de um envio de um submit. Quando enviar o formulário, o usuário n da reload na tela.
        event.preventDefault();
        // ...comments serve para copiar tudo que tem no estado já, seria a mesma coisa do que colocar ['comentário novo'].
        setComments([...comments, newCommentText]);
        // event.target.comment.value = '' serve para limpar o campo depois do submit.
        setNewCommentText('');
        //setNewCommentText(''), seta o estado para vazio. Precisa colocar o value do textarea para ficar olhando o estado 'newCommentText'.
    }

    function deleteComment(commentToDelete: string) {
        const commentsWithoutDeletedOne = comments.filter((comment) => {
            return comment !== commentToDelete;
        });

        setComments(commentsWithoutDeletedOne);
    }

    const isNewCommentEmpty = newCommentText.length === 0;

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={post.author.avatarUrl} editAvatar />
                    <div className={styles.authorInfo}>
                        <strong>{post.author.name}</strong>
                        <span>{post.author.role}</span>
                    </div>
                </div>
                <time
                    title={publishedDateFormatted}
                    dateTime={post.publishedAt.toISOString()}
                >
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {post.content.map((line) => {
                    return <p key={line.content}>{line.content}</p>;
                })}
            </div>

            <form
                onSubmit={handleCreateNewComment}
                className={styles.commentForm}
            >
                <strong>Deixe seu feedback</strong>
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
                        {maxLength - newCommentText.length} caracteres restantes
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
    );
}
