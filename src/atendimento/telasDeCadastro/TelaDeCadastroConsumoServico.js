import FormCadConsumoServicos from "../formularios/FormCadConsumoServicos";
import TabelaDeConsumoServico from "../tabelas/tabelaDeConsumoServico";
import { useState, useEffect } from "react";
import Pagina from "../../templates/Pagina";
import { Spinner } from "react-bootstrap";


export default function TelaDeCadastroConsumoServico(props) {
  console.log("teste tela 2x")
  const localRecursos = "http://localhost:4000/consumoservico";
  const [exibirTabela, setExibirTabela] = useState(true);
  const [listaConsumoServicos, setListaConsumoServicos] = useState([]);
  const [erro, setErro] = useState(null);
  const [processado, setProcessado] = useState(false);

 
  function alternarTelas() {
    setExibirTabela(!exibirTabela);
  }
  // const [status, setStatus] = useState(STATUS.ocioso);

  function apagarConsumoServico(consumoServico) {

    fetch("http://localhost:4000/consumoservico", {
      method: "DELETE",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        codConsumoServico: consumoServico.codConsumoServico
      }),
    }).then(
      (dados) => {   
        console.log("dados", dados)      
        buscarConsumoServicos();
      },
      (error) => {
       
      }
    );
  }

  function buscarConsumoServicos() {
    console.log("buscar")
    fetch(localRecursos, { method: "GET" })
      .then((resposta) => {       
        if (resposta.ok) {
          return resposta.json();
        }
      })
      .then(
        (dados) => {         
          setProcessado(true);
          setListaConsumoServicos(() => [
            ...dados,

          ]);
          
        },
        (error) => {
          setProcessado(true);
          setErro(error);
        }
      );
    // .catch((erro) => {
    //   // setStatus(STATUS.erro);
    // });
  }

  useEffect(() => {
    console.log("useeffect")
    buscarConsumoServicos();
  }, []);
  // console.log(listaConsumoServicos)

  if (erro) {
    return (
      <div>
        <p>Erro ao obter os servicos do Backend : {erro.message}</p>
      </div>
    );
  } else if (!processado) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">
          Carregando Pedidos de Compras...
        </span>
      </Spinner>
    );
  } else {
    if (exibirTabela) {
      return (
        <Pagina>
          <TabelaDeConsumoServico
            dados={listaConsumoServicos}
            chamarTelaCadastro={alternarTelas}
            excluirConsumoServico={apagarConsumoServico}
          />
        </Pagina>
      );
    } else {
      return (
        <Pagina>
          <FormCadConsumoServicos chamarTabelaConsumoServicos={alternarTelas} />
        </Pagina>
      );
    }
  }
}
