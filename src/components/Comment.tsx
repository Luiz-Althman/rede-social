import styles from './Comment.module.css';

import { FaRegTrashAlt } from 'react-icons/fa';
import { AiOutlineLike } from 'react-icons/ai';
import { Avatar } from './Avatar';
import { useState } from 'react';

interface CommentProps {
    content: string;
    onDeleteComment: (params: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {
    const [likeCount, setLikeCount] = useState(0);

    function handleDeleteComment() {
        onDeleteComment(content);
    }

    function handleLikeComment() {
        // setLikeCount(likeCount + 1);

        setLikeCount((state) => {
            return state + 1;
        });
        // Sempre que eu precisar atualizar uma informação e essa informação depende do valor que ela possuia anteriormente, ou seja, dela mesma, usa essa forma dentro do set do estado. exemplo: para atualizar o número de likes, eu preciso saber o número de likes anterior. e a propriedade state é o likeCount
    }

    return (
        <div className={styles.comment}>
            <Avatar
                hasBorder={false}
                src="https://github.com/Luiz-Althman.png"
                editAvatar={true}
            />

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Luiz Henrique</strong>
                            <time
                                title="11 de Maio ás 08:13"
                                dateTime="2022-05-11 08:13:30"
                            >
                                Cerca de 1h atrás
                            </time>
                        </div>
                        <button
                            onClick={handleDeleteComment}
                            title="Deletar comentário"
                        >
                            <FaRegTrashAlt size={24} />
                        </button>
                    </header>

                    <p>{content}</p>
                </div>
                <footer>
                    <button onClick={handleLikeComment}>
                        <AiOutlineLike />
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    );
}
