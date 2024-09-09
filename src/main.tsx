import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.js';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import { Auth } from './components/Auth.js';
import Routers from './shared/router/index.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Auth>
                <Routers />
            </Auth>
            <Toaster />
        </BrowserRouter>
    </React.StrictMode>
);
