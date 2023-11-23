import { useState, useEffect } from "react";
import FormCadHospede from "../formularios/FormCadHospede";
import TabelaDeHospedes from "../tabelas/tabelaDeHospede";
import Pagina from "../../templates/Pagina";
import { Spinner } from "react-bootstrap";

export default function TelaDeCadastroHospede(props) {
  console.log("teste tela 2x");
  const localRecursos = "http://localhost:4000/hospede";
  const [exibirTabela, setExibirTabela] = useState(true);
  const [listaHospedes, setListaHospedes] = useState([]);
  const [erro, setErro] = useState(null);
  const [processado, setProcessado] = useState(false);
  const [atualizando, setAtualizando] = useState(false);
  const [hospedeEmEdicao, setHospedeEmEdicao] = useState(
    {
      codigo: 0,
      nome: "",
      cpf: "",
      endereco: "",
      rg: "",
      telefone: "",
      email: "",
      datanasc: "",
      sexo: "",
      cep: ""
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
      
      function buscarHospedes() {
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
            setListaHospedes(dados);
          },
          (error) => {
            setProcessado(true);
            setErro(error);
          }
          );
        }
        function prepararHospedeParaEdicao(hospede){
          setAtualizando(true);
          setHospedeEmEdicao(hospede);
          setExibirTabela(false);
        }

        function apagarHospede(hospede) {
          fetch("http://localhost:4000/hospede", {
            method: "DELETE",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify({
              codigo: hospede.codigo,
            }),
          })
            .then((resposta) => {
              if (resposta.ok) {
                alert("Hospede excluído com sucesso");
                buscarHospedes();
              } else {
                console.error("Erro ao excluir hóspede");
              }
            })
            .catch((error) => {
              console.error("Erro ao enviar solicitação DELETE:", error);
            });
        }

  useEffect(() => {
    buscarHospedes();
  }, []);

  if (erro) {
    return (
      <div>
        <p>Erro ao obter os hóspedes do Backend: {erro.message}</p>
      </div>
    );
  } else if (!processado) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Carregando Hóspedes...</span>
      </Spinner>
    );
  } else {
    if (exibirTabela) {
      return (
        <Pagina>
          <TabelaDeHospedes
            dados={listaHospedes}
            chamarTelaCadastro={alternarTelas}
            excluirHospede={apagarHospede}
            editarHospede={prepararHospedeParaEdicao}
          />
        </Pagina>
      );
    } else {
      return (
        <Pagina>
          <FormCadHospede chamarTabelaHospedes={alternarTelas} modoEdicao={atualizando} hospede={hospedeEmEdicao}/>
        </Pagina>
      );
    }
  }
}
