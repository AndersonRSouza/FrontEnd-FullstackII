// import FormCadFornecedor from "../formularios/FormCadFornecedor"
// import FormCadPedidoCompras from "../formularios/FormCadPedidoCompras";
import FormCadPedidoCompras from "../formularios/FormCadPedidoCompras";
// import Pagina from "../templates/Pagina";
// import Pagina from "../templates/Pagina";
import Pagina from "../templates/Pagina";

export default function TelaDeCadastroPedidoCompra(props){

    // const [exibirTabela, setExibirTabela] = useState(true);

    return(
        <Pagina>
            <FormCadPedidoCompras/>
        </Pagina>
    );
}