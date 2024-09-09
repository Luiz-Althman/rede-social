import React from 'react';
import { Route as ReactDOMRoute, Navigate } from 'react-router-dom';

import { AUTH_TOKEN } from '../../shared/constants/auth';
import { ROUTER } from '../../shared/constants/router';

const Route: React.FC<any> = ({ isPrivate, component: Component, ...rest }) => {
    const hasToken = localStorage.getItem(AUTH_TOKEN);

    return (
        <ReactDOMRoute
            {...rest}
            render={() => {
                return isPrivate === !!hasToken ? (
                    <Component />
                ) : (
                    <Navigate
                        to={{
                            pathname: isPrivate && ROUTER.LOGIN,
                        }}
                    />
                );
            }}
        />
    );
};

export default Route;
