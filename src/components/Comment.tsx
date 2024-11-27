import styles from './Comment.module.css';

import { FaRegTrashAlt } from 'react-icons/fa';
import { Avatar } from './Avatar';
import { useState } from 'react';

export interface NewComment {
    userId: number;
    publishId: number;
    comment: string;
}

export interface NewCommentResponse {
    data: NewComment;
    status: number;
}

interface IProps {
    comment: NewComment;
}

export function Comment({ comment }: IProps) {
    // function handleDeleteComment() {
    //     onDeleteComment(content);
    // }

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
                            <strong>{comment.userId}</strong>
                            <time
                                title="11 de Maio ás 08:13"
                                dateTime="2022-05-11 08:13:30"
                            >
                                Cerca de 1h atrás
                            </time>
                        </div>
                    </header>

                    {/* <p>{comment}</p> */}
                </div>
                {/* <footer>
                    <button onClick={handleLikeComment}>
                        <AiOutlineLike />
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer> */}
            </div>
        </div>
    );
}
