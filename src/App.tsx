import { Post, PostType } from './components/Post';
import { Header } from './components/Header';

import './global.css';
import styles from './App.module.css';
import { Sidebar } from './components/Sidebar';
import { useCallback, useEffect, useState } from 'react';
import { getPostsFeed } from './shared/services/Feed';
import { UserPost } from './components/UserPost';
import withAuthenticationRequired from './shared/hocs/with-authentication-required';

// const posts: PostType[] = [
//     {
//         id: 1,
//         author: {
//             avatarUrl: 'https://github.com/diego3g.png',
//             name: 'Diego Fernandes',
//             role: 'CTO',
//         },
//         content: [
//             { type: 'paragraph', content: 'Fala galeraa 👋' },
//             {
//                 type: 'paragraph',
//                 content:
//                     'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return. O nome do projeto é DoctorCare 🚀',
//             },
//             { type: 'link', content: ' jane.design/doctorcare' },
//         ],
//         publishedAt: new Date('2023-08-25 21:10:13'),
//     },
//     {
//         id: 2,
//         author: {
//             avatarUrl: 'https://github.com/Luiz-Althman.png',
//             name: 'Luiz Althman',
//             role: 'Web Developer',
//         },
//         content: [
//             { type: 'paragraph', content: 'Fala galeraa 👋' },
//             {
//                 type: 'paragraph',
//                 content:
//                     'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return. O nome do projeto é DoctorCare 🚀',
//             },
//             { type: 'link', content: ' jane.design/doctorcare' },
//         ],
//         publishedAt: new Date('2024-07-03 21:10:13'),
//     },
// ];

const App = () => {
    return (
        <div>
            <Header />
            <div className={styles.wrapper}>
                <Sidebar />
                <main>
                    <UserPost />
                    <Post />
                </main>
            </div>
        </div>
    );
};

export default withAuthenticationRequired(App);
