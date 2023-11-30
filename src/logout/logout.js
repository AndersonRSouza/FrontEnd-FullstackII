import { useNavigate } from "react-router-dom";
import { useAuth } from "../componentes/auth/auth";
// import { useAuth } from "./auth";

export const Logout = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };
  return (
    <div className="container">
      Welcome {auth.user}.<button onClick={handleLogout}>Logout</button>
    </div>
  );
};
