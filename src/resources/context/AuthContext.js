import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [tunnus, setTunnus] = useState(null);
    const [id, setId] = useState(null);

    return (
        <AuthContext.Provider value={{ token, setToken, tunnus, setTunnus, id, setId }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);