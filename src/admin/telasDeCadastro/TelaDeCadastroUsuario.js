import { useState, useEffect } from "react";
import FormCadUsuarios from "../formularios/FormCadUsuarios";
// import FormCadUsuario from "../formularios/FormCadUsuario";
import TabelaDeUsuarios from "../tabelas/tabelaDeUsuario";
// import TabelaDeUsuarioes from "../tabelas/tabelaDeUsuario";
import Pagina from "../../templates/Pagina";
import { Card, Spinner } from "react-bootstrap";
import { useAuth } from "../../componentes/auth/auth";
import { useNavigate } from "react-router-dom";
import { IconeCadeado } from "../../icones/icones";

export default function TelaDeCadastroUsuario(props) {
  console.log("teste tela 2x");
  const localRecursos = "http://localhost:4000/usuarios";
  const [exibirTabela, setExibirTabela] = useState(true);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [erro, setErro] = useState(null);
  const [processado, setProcessado] = useState(false);
  const [atualizando, setAtualizando] = useState(false);
  const { user } = useAuth();
  //const navigate = useNavigate();
  const navigate = useNavigate();
  let permiteAcessar = user.perfil === "Administrador";
  const [usuarioEmEdicao, setUsuarioEmEdicao] = useState(
    {
      codUsuario: 0,
      nome: "",
      perfil: "",
      datacadastro: "",
      senha: "" 
    }
  );

  function alternarTelas() {
    setExibirTabela(!exibirTabela);
  }

  
  // function apagarUsuario(usuario) {
    //   fetch("http://localhost:4000/usuario", {
      //     method: "DELETE",
      //     headers: { "content-Type": "application/json" },
      //     body: JSON.stringify({
        //       codigo: usuario.codigo,
  //     }),
  //   }).then(
    //     (dados) => {
      //       console.log("dados", dados);
      //       buscarUsuarioes();
      //     },
      //     (error) => {}
      //   );
      // }
      
      function buscarUsuarios() {
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
            setListaUsuarios(dados);
          },
          (error) => {
            setProcessado(true);
            setErro(error);
          }
          );
        }
        function prepararUsuarioParaEdicao(usuario){
          setAtualizando(true);
          setUsuarioEmEdicao(usuario);
          setExibirTabela(false);
        }

        function apagarUsuario(usuario) {
          fetch("http://localhost:4000/usuarios", {
            method: "DELETE",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify({
              codUsuario: usuario.codUsuario,
            }),
          })
            .then((resposta) => {
              if (resposta.ok) {
                alert("Usuário excluído com sucesso");
                buscarUsuarios();
              } else {
                console.error("Erro ao excluir usuário");
              }
            })
            .catch((error) => {
              console.error("Erro ao enviar solicitação DELETE:", error);
            });
        }

  useEffect(() => {
    buscarUsuarios();
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
        <p>Erro ao obter os usuarios do Backend: {erro.message}</p>
      </div>
    );
  } else if (!processado) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Carregando Usuarios...</span>
      </Spinner>
    );
  } else {
    if (exibirTabela) {
      return (
        <Pagina>
          <TabelaDeUsuarios
            dados={listaUsuarios}
            chamarTelaCadastro={alternarTelas}
            excluirUsuario={apagarUsuario}
            editarUsuario={prepararUsuarioParaEdicao}
          />
        </Pagina>
      );
    } else {
      return (
        <Pagina>
          <FormCadUsuarios chamarTabelaUsuario={alternarTelas} modoEdicao={atualizando} usuario={usuarioEmEdicao}/>
        </Pagina>
      );
    }
  }
}