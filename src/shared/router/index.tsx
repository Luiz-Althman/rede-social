import React from 'react';
import { Routes, Route } from 'react-router-dom';

//Public pages

//Authenticated pages
import App from '../../App';

import { ROUTER } from '../../shared/constants/router';
import { Login } from '../../components/Login';
import { Register } from '../../components/Register';

const Routers: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path={ROUTER.LOGIN} element={<Login />} />
            <Route path={ROUTER.HOME} element={<App />} />
            <Route path={ROUTER.REGISTER} element={<Register />} />
        </Routes>
    );
};

export default Routers;
