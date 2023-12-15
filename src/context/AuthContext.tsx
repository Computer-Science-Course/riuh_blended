import { createContext, useEffect, useState } from 'react';

interface AuthContextProps {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    isAuthenticated: false,
    login: () => { },
    logout: () => { },
});


const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    };

    return (
        isLoading ? <h1>Loading...</h1> :
            <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
                {children}
            </AuthContext.Provider>
    );
};

export default AuthContextProvider;
