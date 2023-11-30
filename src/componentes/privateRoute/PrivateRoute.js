import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../auth/auth";

export function PrivateRoute({ element, allowedProfiles }) {
  const auth = useAuth();

  if (!auth.user || !allowedProfiles.includes(auth.user.profile)) {
    // Se o usuário não estiver autenticado ou não tiver o perfil adequado, redirecione para a página de login
    return <Navigate to="/login" replace />;
  }

  // Se o usuário estiver autenticado e tiver o perfil adequado, renderize a rota
  return <Route element={element} />;
}
// import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "../auth/auth";

// export const RequireAuth = ({ children }) => {
//   const location = useLocation();
//   const auth = useAuth();
//   if (!auth.user) {
//     return <Navigate to="/login" state={{ path: location.pathname }} />;
//   }
//   return children;
// };
