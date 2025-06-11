import React, { createContext, useState, useEffect } from "react";

interface User {
    id: number;
    correo: string;
    usuario: string;
    nombre_completo: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (userData: { token: string; user: User }) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const login = (userData: { token: string; user: User }) => {
    setToken(userData.token);
    setUser(userData.user);
    localStorage.setItem("auth", JSON.stringify(userData));
};

const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("auth");
    window.location.href = "/login";
};

useEffect(() => {
    const savedAuth = localStorage.getItem("auth");
    if (savedAuth) {
        const { token, user } = JSON.parse(savedAuth);
        setToken(token);
        setUser(user);
    }
}, []);

return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
        {children}
    </AuthContext.Provider>
);
};