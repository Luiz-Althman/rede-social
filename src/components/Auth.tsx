import { ReactNode } from 'react';

interface IAuth {
    children: ReactNode;
}

export function Auth({ children }: IAuth) {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
            }}
        >
            {children}
        </div>
    );
}
