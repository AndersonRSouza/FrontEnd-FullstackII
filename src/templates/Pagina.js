import Cabecalho from "./Cabecalho";
import Menu from "./Menu";
import Rodape from "./Rodape";

export default function Pagina(props) {
  return (
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
}
