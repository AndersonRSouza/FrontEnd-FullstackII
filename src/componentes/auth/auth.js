import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Tenta recuperar o usuário do localStorage no início
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (user) => {
    setUser(user);
    // Salva o usuário no localStorage
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    // Remove o usuário do localStorage
    localStorage.removeItem('user');
  };

  useEffect(() => {
    // Pode ser usado para realizar ações adicionais quando o estado de autenticação muda
    // Por exemplo, pode ser útil para redirecionar o usuário após o login ou logout
    console.log("Acionou o useEffect", user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};