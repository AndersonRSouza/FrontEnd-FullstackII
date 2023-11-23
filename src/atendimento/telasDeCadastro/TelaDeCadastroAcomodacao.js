import { useState, useEffect } from "react";
import FormCadAcomodacao from "../formularios/FormCadAcomodacao";
import TabelaDeAcomodacao from "../tabelas/tabelaDeAcomodacao";
import Pagina from "../../templates/Pagina";
import { Spinner } from "react-bootstrap";

export default function TelaDeCadastroAcomodacao(props) {
  console.log("teste tela 2x");
  const localRecursos = "http://localhost:4000/acomodacao";
  const [exibirTabela, setExibirTabela] = useState(true);
  const [listaAcomodacoes, setListaAcomodacoes] = useState([]);
  const [erro, setErro] = useState(null);
  const [processado, setProcessado] = useState(false);
  const [atualizando, setAtualizando] = useState(false);
  const [acomodacaoEmEdicao, setAcomodacaoEmEdicao] = useState(
    {
        codigo: 0,
        num_acom:"",
        capacidade:"",
        tamanho:"",
        localizacao:"",
        descricao: "",
        valor: ""
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
      
      function buscarAcomodacoes() {
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
            setListaAcomodacoes(dados);
          },
          (error) => {
            setProcessado(true);
            setErro(error);
          }
          );
        }
        function prepararAcomodacaoParaEdicao(acomodacao){
          setAtualizando(true);
          setAcomodacaoEmEdicao(acomodacao);
          setExibirTabela(false);
        }

        function apagarAcomodacao(acomodacao) {
          fetch("http://localhost:4000/acomodacao", {
            method: "DELETE",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify({
              codigo: acomodacao.codigo,
            }),
          })
            .then((resposta) => {
              if (resposta.ok) {
                alert("Acomodação excluída com sucesso");
                buscarAcomodacoes();
              } else {
                console.error("Erro ao excluir acomodação");
              }
            })
            .catch((error) => {
              console.error("Erro ao enviar solicitação DELETE:", error);
            });
        }

  useEffect(() => {
    buscarAcomodacoes();
  }, []);

  if (erro) {
    return (
      <div>
        <p>Erro ao obter as acomodações do Backend: {erro.message}</p>
      </div>
    );
  } else if (!processado) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Carregando Acomodações...</span>
      </Spinner>
    );
  } else {
    if (exibirTabela) {
      return (
        <Pagina>
          <TabelaDeAcomodacao
            dados={listaAcomodacoes}
            chamarTelaCadastro={alternarTelas}
            excluirAcomodacao={apagarAcomodacao}
            editarAcomodacao={prepararAcomodacaoParaEdicao}
          />
        </Pagina>
      );
    } else {
      return (
        <Pagina>
          <FormCadAcomodacao chamarTabelaAcomodacoes={alternarTelas} modoEdicao={atualizando} acomodacao={acomodacaoEmEdicao}/>
        </Pagina>
      );
    }
  }
}
