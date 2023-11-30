import FormCadConsumoProdutos from "../../atendimento/formularios/FormCadConsumoProdutos";
import TabelaDeConsumoProduto from "../tabelas/tabelaDeConsumoProduto";
import { useState, useEffect } from "react";
import Pagina from "../../templates/Pagina";
import { Spinner } from "react-bootstrap";


export default function TelaDeCadastroConsumoProduto(props) {
  console.log("teste tela 2x")
  const localRecursos = "http://localhost:4000/consumoproduto";
  const [exibirTabela, setExibirTabela] = useState(true);
  const [listaConsumoProdutos, setListaConsumoProdutos] = useState([]);
  const [erro, setErro] = useState(null);
  const [processado, setProcessado] = useState(false);

 
  function alternarTelas() {
    setExibirTabela(!exibirTabela);
  }
  // const [status, setStatus] = useState(STATUS.ocioso);

  function apagarConsumoProduto(consumoProduto) {

    fetch("http://localhost:4000/consumoproduto", {
      method: "DELETE",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        codConsumoProduto: consumoProduto.codConsumoProduto
      }),
    }).then(
      (dados) => {   
        console.log("dados", dados)      
        buscarConsumoProdutos();
      },
      (error) => {
       
      }
    );
  }

  function buscarConsumoProdutos() {
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
          setListaConsumoProdutos(() => [
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
    buscarConsumoProdutos();
  }, []);
  // console.log(listaConsumoProdutos)

  if (erro) {
    return (
      <div>
        <p>Erro ao obter os produtos do Backend : {erro.message}</p>
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
          <TabelaDeConsumoProduto
            dados={listaConsumoProdutos}
            chamarTelaCadastro={alternarTelas}
            excluirConsumoProduto={apagarConsumoProduto}
          />
        </Pagina>
      );
    } else {
      return (
        <Pagina>
          <FormCadConsumoProdutos chamarTabelaConsumoProdutos={alternarTelas} />
        </Pagina>
      );
    }
  }
}
