import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Invitado");
  const [userEmail, setUserEmail] = useState("");
  // Función para verificar el estado de autenticación
  const checkAuthStatus = () => {
    const token = localStorage.getItem('authToken');
    const storedUserName = localStorage.getItem('userName');
    
    if (token) {
      setIsLoggedIn(true);
      setUserName(storedUserName || "Usuario");
    } else {
      setIsLoggedIn(false);
      setUserName("Invitado");
    }
  };

  // Verificar al cargar el componente
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Función para hacer login
  const login = (token, name, email) => {
  localStorage.setItem('authToken', token);
  localStorage.setItem('userName', name);
  localStorage.setItem('userEmail', email); // Agregar esta línea
  setIsLoggedIn(true);
  setUserName(name);
  setUserEmail(email); // Agregar esta línea
};

  // Función para hacer logout
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    // Limpiar tokens antiguos también
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUserName("Invitado");
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      userName,
      userEmail,
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