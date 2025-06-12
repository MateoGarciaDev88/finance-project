import { createContext, FC, useContext, useEffect, useState } from 'react'
import type { AuthResponse } from '../types/types';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: () => {},
  saveUser: (userData: AuthResponse) => {},
  getRefreshToken: () => {},
});


const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    
  }, []);

  const getAccessToken = () => {
    return accessToken;
  }

  const getRefreshToken = ():string|null => {
    const token = localStorage.getItem("token");
    if ( token ) {
      const { refreshToken } = JSON.parse(token);
      return refreshToken;
    }
    return null;
  }

  const saveUser = (userData: AuthResponse) => {
    setAccessToken(userData.body.accessToken);
    localStorage.setItem("token", JSON.stringify(userData.body.refreshToken));
    setIsAuthenticated(true);
  }

  const requestNewAccessToken = async () => {
    try {
      const response = await fetch()
    } catch (error) {
      
    }
  }

  const checkAuth = () => {
    if ( accessToken ) {
      
    } else {
      const token = getRefreshToken();
      if ( token ) {
        
      }
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, getAccessToken, saveUser, getRefreshToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;