import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import Pagina from "../templates/Pagina";
import TabelaDeProdutos from "../tabelas/tabelaDeprodutos.js";
import FormCadProduto from "../formularios/FormCadProdutos.js";


export default function TelaDeCadastroProduto(props) {
    const localRecursos = "http://localhost:4000/produto";
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaProdutos, setListaProdutos] = useState([]);
    const [erro, setErro] = useState(null);
    const [processado, setProcessado] = useState(false);
  
    function alternarTelas() {
      setExibirTabela(!exibirTabela);
    }
  
    function buscarProdutos() {
      fetch(localRecursos, { method: "GET" })
        .then((resposta) => {
          if (resposta.ok) {
            return resposta.json();
          }
        })
        .then(
          (dados) => {
            console.log("Dados recebidos:", dados);
            setProcessado(true);
            setListaProdutos(dados);
          },
          (error) => {
            setProcessado(true);
            setErro(error);
          }
        );
    }
  
    useEffect(() => {
      buscarProdutos();
    }, []);
  
    if (erro) {
      return (
        <div>
          <p>Erro ao obter os produtos do Backend: {erro.message}</p>
        </div>
      );
    } else if (!processado) {
      return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Carregando Produtos...</span>
        </Spinner>
      );
    } else {
      if (exibirTabela) {
        return (
          <Pagina>
            <TabelaDeProdutos
              dados={listaProdutos}
              chamarTelaCadastro={alternarTelas}
            />
          </Pagina>
        );
      } else {
        return (
          <Pagina>
            <FormCadProduto chamarTabelaProdutos={alternarTelas} />
          </Pagina>
        );
      }
    }
  }
  