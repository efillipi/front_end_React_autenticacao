import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {

    const [data, setData] = useState(() => {

        const token = localStorage.getItem('@restToken: token');
        const user = localStorage.getItem('@restToken: User');

        if (token && user) {
            return { token, user: JSON.parse(user) };
        }
        return {}
    });

    const signIn = useCallback(async ({ email, senha }) => {
        
        try {
            const response = await api.post('login', { email, senha }); //chamada do banco
            const { token, user } = response.data;
            localStorage.setItem('@restToken: token', token)
            localStorage.setItem('@restToken: User', JSON.stringify(user))
            setData({ token, user })
        } catch (err) {
            alert('Erro no Login, tente novamente... ' + err);
        }

    }, [])

    const signOut = useCallback(() => {
        localStorage.removeItem('@restToken: token')
        localStorage.removeItem('@restToken: User')
    }, [])

    return (
        <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth deve estar dentro de um AuthProvide');
    }
    return context
}

export { AuthProvider, useAuth }



