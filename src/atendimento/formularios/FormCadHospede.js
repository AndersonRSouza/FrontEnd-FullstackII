import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { IMaskInput } from "react-imask";

export default function FormCadHospede(props) {
  const [formValidado, setFormValidado] = useState(false);
  const [cadHospede, setCadHospede] = useState(props.hospede);

  function gravarHospede() {
    if(!props.modoEdicao){
    fetch("http://localhost:4000/hospede", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        nome: cadHospede.nome,
        cpf: cadHospede.cpf,
        endereco: cadHospede.endereco,
        rg: cadHospede.rg,
        telefone: cadHospede.telefone,
        email: cadHospede.email,
        datanasc: cadHospede.datanasc,
        sexo: cadHospede.sexo,
        cep: cadHospede.cep,
      }),
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((dados) => {
        if (dados.status) {
          setCadHospede({ ...cadHospede, codigo: dados.codigo });
        }
        alert(dados.mensagem);
        window.location.reload();
      })
      .catch((erro) => {
        alert("Não foi possivel registrar o hóspede: " + erro.message);
      });
  }
  else{
    fetch("http://localhost:4000/hospede", {
      method: "PUT",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(cadHospede),
    }).then((resposta) =>{
      alert("Atualizado com sucesso!")
      window.location.reload();
    });
  }
}

  function manipularMudanca(e) {
    const alvo = e.target.name;
    if (e.target.type === "checkbox") {
      setCadHospede({ ...cadHospede, [alvo]: e.target.checked });
    } else {
      setCadHospede({ ...cadHospede, [alvo]: e.target.value });
      console.log("Digitou " + e.target.value);
    }
  }

  const manipularSubmissao = (evento) => {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
      gravarHospede();
    } else {
      setFormValidado(true);
    }
    evento.preventDefault();
    evento.stopPropagation();
  };
  

  return (
    <Container>
      <Row className="mb-3 border border-success d-flex text-center">
        <h3>Cadastro de Hóspedes</h3>
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
                value={cadHospede.codigo}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe o código do hóspede!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="5">
              <Form.Label>Nome completo</Form.Label>
              <Form.Control
                id="nome"
                name="nome"
                required
                type="text"
                placeholder="Nome Completo"
                value={cadHospede.nome}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe a nome completo do hóspede!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="5">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                id="cpf"
                name="cpf"
                required
                type="text"
                placeholder="CPF"
                value={cadHospede.cpf}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe o cpf do hóspede!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="7">
              <Form.Label>Endereço</Form.Label>
              <Form.Control
                id="endereco"
                name="endereco"
                required
                type="text"
                placeholder="Endereço"
                value={cadHospede.endereco}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe o endereço do hóspede!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>RG</Form.Label>
              <Form.Control
                id="rg"
                name="rg"
                required
                type="text"
                value={cadHospede.rg}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe o rg do hóspede!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Telefone:</Form.Label>
              <Form.Control
                id="telefone"
                name="telefone"
                required
                type="text"
                as={IMaskInput}
                mask="(00)0000-0000"
                placeholder="(00)0000-0000"
                value={cadHospede.telefone}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe a telfone do hóspede!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>E-Mail</Form.Label>
              <Form.Control
                id="email"
                name="email"
                required
                type="text"
                placeholder="E-Mail"
                value={cadHospede.email}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe a E-Mail do hóspede!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control
                id="datanasc"
                name="datanasc"
                required
                type="text"
                placeholder="00-00-0000"
                value={cadHospede.datanasc}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe a data de nascimento do hóspede!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>Sexo</Form.Label>
              <Form.Control
                id="sexo"
                name="sexo"
                required
                type="text"
                placeholder="Sexo"
                value={cadHospede.sexo}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe o sexo do hóspede!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>Cep</Form.Label>
              <Form.Control
                id="cep"
                name="cep"
                required
                type="text"
                placeholder="Cep"
                value={cadHospede.cep}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe o cep do hóspede!
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
            onClick={props.chamarTabelaHospedes}
          >
            Voltar
          </Button>
          &nbsp;
        </Form>
      </Row>
    </Container>
  );
}
