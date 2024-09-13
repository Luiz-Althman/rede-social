import React from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTER } from '../../../shared/constants/router';
import { useAuth } from '../../../shared/providers/auth';

function withAuthenticationRequired<P>(
    Component: React.ComponentType<P>
): React.FC<P> {
    return function WithAuthenticationRequired(props: P): JSX.Element {
        const { isAuthenticated } = useAuth();

        return isAuthenticated ? (
            //@ts-ignore
            <Component {...props} />
        ) : (
            <Navigate to={ROUTER.LOGIN} />
        );
    };
}

export default withAuthenticationRequired;
