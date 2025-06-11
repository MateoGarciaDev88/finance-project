import { createContext, FC, useContext, useEffect, useState } from 'react'
import { AuthResponse } from '../types/types';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: () => "",
  saveUser: (userData: AuthResponse) => {},
});


const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [accessToken, setAccessToken] = useState<string>("");

  const getAccessToken = () => {
    console.log('🚀 ~ accessToken:', accessToken);
    return accessToken;
  }

  const saveUserData = (userData: AuthResponse) => {
    setAccessToken(userData.body.accessToken)
    setIsAuthenticated(true);
  }


  return (
    <AuthContext.Provider value={{ isAuthenticated, getAccessToken, saveUserData }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;