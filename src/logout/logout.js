import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../componentes/auth/auth";
import '../estilos/mensagemLogout.css'
import { Card } from 'react-bootstrap';

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Quando o componente é montado, chama a função de logout
    logout();
    // Pode ser útil redirecionar o usuário para a página de login ou para a página inicial após o logout
    // Isso dependerá da lógica específica do seu aplicativo
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }, [logout]);

  return (
    <div className="center-container">
      <Card className="logout-card bg-info">
        <Card.Body>
          <Card.Title className="logout-title">Logout</Card.Title>
          <Card.Text className="logout-message">
            Você foi desconectado. Até logo!
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
