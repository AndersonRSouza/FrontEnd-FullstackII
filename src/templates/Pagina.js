import Cabecalho from "./Cabecalho";
import Menu from "./Menu";
import Rodape from "./Rodape";
import { useAuth } from '../componentes/auth/auth';
import { useNavigate } from "react-router-dom";
import logoRecanto from "../img/logoRecanto.png"

export default function Pagina(props) {
  console.log("Vamos exibir a página!", props);
  const navigate = useNavigate();
  const { user } = useAuth();
  
  console.log("user", user);
  let retorno;
  if (user){
    retorno = (
      <div className="">
        <Cabecalho titulo="Sistema de Gerenciamento do Hotel Recanto Feliz" />
        <br />
        <Menu />
        <div
          style={{ width: '100%', height: '100vh' }} 
        >
          {props.children}
        </div>
        <div>
          <Rodape texto="Sistema AEHI - Hotel Recanto Feliz &copy; 2023" />
        </div>
      </div>
    );
  } else {
    //alert("Faça o LOGIN!");
    
    setTimeout(() => {
      navigate("/login");
    }, 2000);
    retorno = (
      <p>Faça login para acessar essa página.</p>
    );
  }
  

  return retorno;
}
