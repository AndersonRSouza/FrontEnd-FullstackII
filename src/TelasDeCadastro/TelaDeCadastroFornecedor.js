import { useState, useEffect } from "react";
import FormCadFornecedor from "../formularios/FormCadFornecedor";
import TabelaDeFornecedores from "../tabelas/tabelaDeFornecedor";
import Pagina from "../templates/Pagina";
import { Spinner } from "react-bootstrap";

export default function TelaDeCadastroFornecedor(props) {
  console.log("teste tela 2x");
  const localRecursos = "http://localhost:4000/fornecedor";
  const [exibirTabela, setExibirTabela] = useState(true);
  const [listaFornecedores, setListaFornecedores] = useState([]);
  const [erro, setErro] = useState(null);
  const [processado, setProcessado] = useState(false);
  const [atualizando, setAtualizando] = useState(false);
  const [fornecedorEmEdicao, setFornecedorEmEdicao] = useState(
    {
      codigo: 0,
      razaoSocial: "",
      nomeFantasia: "",
      endereco: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      uf: "",
      cep: "",
      pessoa: "",
      cnpj: "",
      estadual: "",
      municipal: "",
      email: "",
      celular: "",
      telefone: "",
      contato: "" 
    }
  );

  function alternarTelas() {
    setExibirTabela(!exibirTabela);
  }

  
  // function apagarFornecedor(fornecedor) {
    //   fetch("http://localhost:4000/fornecedor", {
      //     method: "DELETE",
      //     headers: { "content-Type": "application/json" },
      //     body: JSON.stringify({
        //       codigo: fornecedor.codigo,
  //     }),
  //   }).then(
    //     (dados) => {
      //       console.log("dados", dados);
      //       buscarFornecedores();
      //     },
      //     (error) => {}
      //   );
      // }
      
      function buscarFornecedores() {
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
            setListaFornecedores(dados);
          },
          (error) => {
            setProcessado(true);
            setErro(error);
          }
          );
        }
        function prepararFornecedorParaEdicao(fornecedor){
          setAtualizando(true);
          setFornecedorEmEdicao(fornecedor);
          setExibirTabela(false);
        }

        function apagarFornecedor(fornecedor) {
          fetch("http://localhost:4000/fornecedor", {
            method: "DELETE",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify({
              codigo: fornecedor.codigo,
            }),
          })
            .then((resposta) => {
              if (resposta.ok) {
                console.log("Fornecedor excluído com sucesso");
                buscarFornecedores();
              } else {
                console.error("Erro ao excluir fornecedor");
              }
            })
            .catch((error) => {
              console.error("Erro ao enviar solicitação DELETE:", error);
            });
        }

  useEffect(() => {
    buscarFornecedores();
  }, []);

  if (erro) {
    return (
      <div>
        <p>Erro ao obter os fornecedores do Backend: {erro.message}</p>
      </div>
    );
  } else if (!processado) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Carregando Fornecedores...</span>
      </Spinner>
    );
  } else {
    if (exibirTabela) {
      return (
        <Pagina>
          <TabelaDeFornecedores
            dados={listaFornecedores}
            chamarTelaCadastro={alternarTelas}
            excluirFornecedor={apagarFornecedor}
            editarFornecedor={prepararFornecedorParaEdicao}
          />
        </Pagina>
      );
    } else {
      return (
        <Pagina>
          <FormCadFornecedor chamarTabelaFornecedores={alternarTelas} modoEdicao={atualizando} fornecedor={fornecedorEmEdicao}/>
        </Pagina>
      );
    }
  }
}
