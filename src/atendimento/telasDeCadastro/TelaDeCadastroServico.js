import { useState,useEffect } from "react";
import { Spinner } from "react-bootstrap";
import Pagina from "../../templates/Pagina";
import FormCadServico from "../formularios/FormCadServico";
import TabelaDeServicos from "../tabelas/tabelaDeServicos";



export default function TelaDeCadastroServico(props) {
  console.log("teste tela 4x");
    const localRecursos = "http://localhost:4000/servico";
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaServicos, setListaServicos] = useState([]);
    const [erro, setErro] = useState(null);
    const [processado, setProcessado] = useState(false);
    const [atualizando, setAtualizando] = useState(false);
    const [servicoEmEdicao, setServicoEmEdicao] = useState(
      {
        codServico: 0,
        descricao: "",
        valor:"",
      }
    );
    function alternarTelas() {
      setExibirTabela(!exibirTabela);
    }
  
    function buscarServicos() {
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
            setListaServicos(dados);
          },
          (error) => {
            setProcessado(true);
            setErro(error);
          }
        );
    }
    
    function prepararServicoParaEdicao(servico){
      setAtualizando(true);
      setServicoEmEdicao(servico);
      setExibirTabela(false);
    }

    function apagarServico(servico) {
      fetch("http://localhost:4000/servico", {
        method: "DELETE",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({
          codServico: servico.codServico,
        }),
      })
        .then((resposta) => {
          if (resposta.ok) {
            alert("Servico excluído com sucesso");
            buscarServicos();
          } else {
            console.error("Erro ao excluir Servico");
          }
        })
        .catch((error) => {
          console.error("Erro ao enviar solicitação DELETE:", error);
        });
    }

    useEffect(() => {
      buscarServicos();
    }, []);

    if (erro) {
        return (
          <div>
            <p>Erro ao obter os servicos do Backend: {erro.message}</p>
          </div>
        );
      } else if (!processado) {
        return (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Carregando Servicos...</span>
          </Spinner>
        );
      } else {
        if (exibirTabela) {
          return (
            <Pagina>
              <TabelaDeServicos
                dados={listaServicos}
                chamarTelaCadastro={alternarTelas}
                excluirServico={apagarServico}
                editarServico={prepararServicoParaEdicao}
              />
            </Pagina>
          );
        } else {
          return (
            <Pagina>
              <FormCadServico chamarTabelaServicos={alternarTelas} modoEdicao={atualizando} servico={servicoEmEdicao}/>
            </Pagina>
          );
        }
      }
    }
  