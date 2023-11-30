import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { IMaskInput } from "react-imask";
// import BarraBusca from "../../componentes/busca/BarraBusca"
// import TabelaItensUsuario from "../tabelas/TabelaItensUsuario";

export default function FormCadUsuario(props) {
  const [formValidado, setFormValidado] = useState(false);
  const [cadUsuario, setCadUsuario] = useState(props.usuario);
  // const [dataCadastroModificada, setDataCadastroModificada] = useState(false);

  // useEffect(() => {
  //   // Se a data de cadastro ainda não foi modificada, atualize para o dia atual
  //   if (!dataCadastroModificada) {
  //     const dataAtual = new Date().toISOString().split("T")[0];
  //     setCadUsuario((prevCadUsuario) => ({
  //       ...prevCadUsuario,
  //       datacadastro: dataAtual,
  //     }));
  //   }
  // }, [dataCadastroModificada]);

  function gravarUsuario() {
    if (!props.modoEdicao) {
      fetch("http://localhost:4000/usuarios", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({
          nome: cadUsuario.nome,
          perfil: cadUsuario.perfil,
          datacadastro: cadUsuario.datacadastro,
          senha: cadUsuario.senha,
        }),
      })
        .then((resposta) => {
          return resposta.json();
        })
        .then((dados) => {
          if (dados.status) {
            setCadUsuario({ ...cadUsuario, codUsuario: dados.codUsuario });
          }
          alert(dados.mensagem);
          window.location.reload();
        })
        .catch((erro) => {
          alert("Não foi possivel registrar o usuario: " + erro.message);
        });
    } else {
      fetch("http://localhost:4000/usuarios", {
        method: "PUT",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(cadUsuario),
      }).then((resposta) => {
        alert("Atualizado com sucesso!");
        window.location.reload();
      });
    }
  }

  function manipularMudanca(e) {
    const alvo = e.target.name;
    if (e.target.type === "checkbox") {
      setCadUsuario({ ...cadUsuario, [alvo]: e.target.checked });
    } else {
      setCadUsuario({ ...cadUsuario, [alvo]: e.target.value });
      console.log("Digitou " + e.target.value);
    }
  }

  const manipularSubmissao = (evento) => {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
      gravarUsuario();
    } else {
      setFormValidado(true);
    }
    evento.preventDefault();
    evento.stopPropagation();
  };

  return (
    <Container>
      <Row className="mb-3 border border-success d-flex text-center">
        <h3>Cadastro de Usuário</h3>
      </Row>
      <Row className="mt-2 p-2 border border-success">
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
          <Row className="mb-1">
            <Form.Group as={Col} md="1">
              <Form.Label>Código</Form.Label>
              <Form.Control
                id="codUsuario"
                name="codUsuario"
                required
                disabled
                type="int"
                value={cadUsuario.codUsuario}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe o código do usuário!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="5">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                id="nome"
                name="nome"
                required
                type="text"
                placeholder="nome"
                value={cadUsuario.nome}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe o nome do usuário!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="2">
              <Form.Label>Perfil</Form.Label>
              {/* <Form.Control id="uf" name="uf"/> */}
              <Form.Select
                id="perfil"
                name="perfil"
                defaultValue=""
                value={cadUsuario.perfil}
                onChange={manipularMudanca}
              >
                <option>Selecione o perfil</option>
                <option>Administrador</option>
                <option>Atendimento</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Por favor, informe o perfil do usuário!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Data do Cadastro</Form.Label>
              <Form.Control
                id="datacadastro"
                name="datacadastro"
                required
                type="date"
                value={cadUsuario.datacadastro}
                onChange={(e) => {
                  manipularMudanca(e);
                  // setDataCadastroModificada(true); // Marca a data de cadastro como modificada ao mudar a data manualmente
                }}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe a data de cadastro do usuário!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="2">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                id="senha"
                name="senha"
                required
                type="text"
                placeholder="Senha"
                value={cadUsuario.senha}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe a senha do usuário!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                required
                label="Ativo"
                feedback="Você deve informar se o usuario esta ativo!!"
                feedbackType="invalid"
              />
            </Form.Group>
          </Row>
          <Button
            className="btn btn-success border border-success"
            type="submit"
          >
            Cadastrar
          </Button>
          &nbsp;
          <Button
            className="btn btn-warning border border-warning text-white"
            type="button"
            onClick={props.chamarTabelaUsuarios}
          >
            Voltar
          </Button>
          &nbsp;
        </Form>
      </Row>
    </Container>
  );
  // } else if (status === STATUS.ocioso) {
  //   return <TelaCarregamento />;
  // } else {
  //   return (
  //     <TelaErro mensagem="Não foi possível recuperar os dados dos usuarioes, entre em contato com o administrador do sistema!" />
  //   );
  // }
}
