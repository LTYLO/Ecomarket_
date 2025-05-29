import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Invitado");
  const [isLoading, setIsLoading] = useState(true); // NUEVO: Estado de carga

  // Función para verificar el estado de autenticación
  const checkAuthStatus = () => {
    console.log('AuthContext: Verificando estado de autenticación...');
    
    const token = localStorage.getItem('authToken');
    const storedUserName = localStorage.getItem('userName');
    
    console.log('AuthContext: Token encontrado:', !!token);
    console.log('AuthContext: UserName almacenado:', storedUserName);
    
    if (token) {
      setIsLoggedIn(true);
      setUserName(storedUserName || "Usuario");
      console.log('AuthContext: Usuario autenticado');
    } else {
      setIsLoggedIn(false);
      setUserName("Invitado");
      console.log('AuthContext: Usuario no autenticado');
    }
    
    setIsLoading(false); // NUEVO: Marcar como terminado
  };

  // Verificar al cargar el componente
  useEffect(() => {
    console.log('AuthContext: Inicializando...');
    checkAuthStatus();
  }, []);

  // Función para hacer login
  const login = (token, name) => {
    console.log('AuthContext: Haciendo login...', { token: !!token, name });
    localStorage.setItem('authToken', token);
    localStorage.setItem('userName', name);
    setIsLoggedIn(true);
    setUserName(name);
    setIsLoading(false);
  };

  // Función para hacer logout
  const logout = () => {
    console.log('AuthContext: Haciendo logout...');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    // Limpiar tokens antiguos también
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUserName("Invitado");
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      userName,
      isLoading, // NUEVO: Exponer el estado de carga
      login,
      logout,
      checkAuthStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};