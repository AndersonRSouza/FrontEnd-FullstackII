import { useState, useEffect } from "react";
import FormCadFornecedor from "../formularios/FormCadFornecedor";
import TabelaDeFornecedores from "../tabelas/tabelaDeFornecedor";
import Pagina from "../../templates/Pagina";
import { Card, Spinner } from "react-bootstrap";
import { useAuth } from "../../componentes/auth/auth";
import { useNavigate } from "react-router-dom";
import { IconeCadeado } from "../../icones/icones";

export default function TelaDeCadastroFornecedor(props) {
  console.log("teste tela 2x");
  const localRecursos = "http://localhost:4000/fornecedor";
  const [exibirTabela, setExibirTabela] = useState(true);
  const [listaFornecedores, setListaFornecedores] = useState([]);
  const [erro, setErro] = useState(null);
  const [processado, setProcessado] = useState(false);
  const [atualizando, setAtualizando] = useState(false);
  const { user } = useAuth();
  //const navigate = useNavigate();
  const navigate = useNavigate();
  let permiteAcessar = user.perfil === "Administrador";
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
                alert("Fornecedor excluído com sucesso");
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

  if (!permiteAcessar) {
    setTimeout(() => {
      navigate("/");
    }, 2000);
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Card
          className="p-4 text-center"
          style={{ backgroundColor: "lightgray" }}
        >
          <IconeCadeado/>
          <h3>Você não tem permissão para visualizar essa tela.</h3>
        </Card>
      </div>
    );
  }

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
