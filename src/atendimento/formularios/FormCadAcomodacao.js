import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { IMaskInput } from "react-imask";

export default function FormCadAcomodacao(props) {
  const [formValidado, setFormValidado] = useState(false);
  const [cadAcomodacao, setCadAcomodacao] = useState(props.acomodacao);

  function gravarAcomodacao() {
    if(!props.modoEdicao){
    fetch("http://localhost:4000/acomodacao", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        num_acom: cadAcomodacao.num_acom,
        capacidade: cadAcomodacao.capacidade,
        tamanho: cadAcomodacao.tamanho,
        localizacao: cadAcomodacao.localizacao,
        descricao: cadAcomodacao.descricao,
        valor: cadAcomodacao.valor,
      }),
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((dados) => {
        if (dados.status) {
          setCadAcomodacao({ ...cadAcomodacao, codigo: dados.codigo });
        }
        alert(dados.mensagem);
        window.location.reload();
      })
      .catch((erro) => {
        alert("Não foi possivel registrar Acomodação: " + erro.message);
      });
  }
  else{
    fetch("http://localhost:4000/acomodacao", {
      method: "PUT",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(cadAcomodacao),
    }).then((resposta) =>{
      alert("Atualizado com sucesso!")
      window.location.reload();
    });
  }
}

  function manipularMudanca(e) {
    const alvo = e.target.name;
    if (e.target.type === "checkbox") {
      setCadAcomodacao({ ...cadAcomodacao, [alvo]: e.target.checked });
    } else {
      setCadAcomodacao({ ...cadAcomodacao, [alvo]: e.target.value });
      console.log("Digitou " + e.target.value);
    }
  }

  const manipularSubmissao = (evento) => {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
      gravarAcomodacao();
    } else {
      setFormValidado(true);
    }
    evento.preventDefault();
    evento.stopPropagation();
  };
  
  return (
    <Container>
      <Row className="mb-3 border border-success d-flex text-center">
        <h3>Cadastro de Acomodação</h3>
      </Row>
      <Row className="mt-2 p-2 border border-success">
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
          <Row className="mb-1">
            <Form.Group as={Col} md="1">
              <Form.Label>Código</Form.Label>
              <Form.Control
                id="codigo"
                name="codigo"
                required
                disabled
                type="int"
                value={cadAcomodacao.codigo}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe o código da acomodação!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="5">
              <Form.Label>Número da Acomodação</Form.Label>
              <Form.Control
                id="num_acom"
                name="num_acom"
                required
                type="text"
                placeholder="Número da Acomodação"
                value={cadAcomodacao.num_acom}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe a número da Acomodação!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="5">
              <Form.Label>Capacidade do quarto</Form.Label>
              <Form.Control
                id="capacidade"
                name="capacidade"
                required
                type="text"
                placeholder="Capacidade"
                value={cadAcomodacao.capacidade}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe a capacidade da acomodação!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="7">
              <Form.Label>Tamanho do Quarto</Form.Label>
              <Form.Control
                id="tamanho"
                name="tamanho"
                required
                type="text"
                placeholder="Tamanho"
                value={cadAcomodacao.tamanho}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe o tamanho da acomodação!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>Localização do quarto</Form.Label>
              <Form.Control
                id="localizacao"
                name="localizacao"
                required
                type="text"
                value={cadAcomodacao.localizacao}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe a Localização da acomodação!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Descrição do Quarto:</Form.Label>
              <Form.Control
                id="descricao"
                name="descricao"
                required
                type="text"
                placeholder="Descrição"
                value={cadAcomodacao.descricao}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe a descrição da acomodação!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>Valor da diária:</Form.Label>
              <Form.Control
                id="valor"
                name="valor"
                required
                type="text"
                mask="R$:000,00"
                placeholder="R$:000,00"
                value={cadAcomodacao.valor}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe o valor da acomodação!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                required
                label="Ativo"
                feedback="Você deve informar se o hóspede está ativo!!"
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
            onClick={props.chamarTabelaAcomodacoes}
          >
            Voltar
          </Button>
          &nbsp;
        </Form>
      </Row>
    </Container>
  );
}
