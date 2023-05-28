// import { useState } from "react";
import FormCadFornecedor from "../formularios/FormCadFornecedor"
import Pagina from "../templates/Pagina";

export default function TelaDeCadastroFornecedor(props){

    // const [exibirTabela, setExibirTabela] = useState(true);

    return(
        <Pagina>
            <FormCadFornecedor/>
        </Pagina>
    );
}