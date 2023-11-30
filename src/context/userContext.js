// const { createContext, useState } = require("react");


// const UserContext = createContext();


// export const UserProvider = ({children}) => {

//     let usuarioLogado = null;
    
//     if(typeof localStorage != "undefined") {
//         usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
//     }
//     const [user, setUser] = useState(usuarioLogado);

//     return (
//         <UserContext.Provider value={{user, setUser}}>
//             {children}
//         </UserContext.Provider>
//     )
// }

// export default UserContext;

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    // Lógica para autenticação do usuário
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Lógica para desautenticação do usuário
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};