import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import Routers from './shared/router/index.js';
import { AuthProvider } from './shared/providers/auth/index.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <Routers />
            </AuthProvider>
            <Toaster />
        </BrowserRouter>
    </React.StrictMode>
);
