import React, { useRef, useState, useReducer } from 'react';
import { Container, Row, Form, Col, Button } from "react-bootstrap";
//import Button from 'react-bootstrap/Button';

export default function FormCadServico(props) {

  const [validado, setValidado] = useState(false);
  const [cadServico, setCadServico] = useState(props.servico);
  // const [cadServico, setCadServico] = useState({
  //     codServico: 0,
  //     descricao: "",
  //     valor: 0,
  //   });

  function gravarServico() {
      if(!props.modoEdicao){
      fetch('http://localhost:4000/servico', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codigo: cadServico.codServico,
          descricao: cadServico.descricao,
          valor: cadServico.valor,
        })
      })
        .then((resposta) => {
          return resposta.json();
        }).then((dados) => {
          if (dados.status) {
            setCadServico({ ...cadServico, codServico: dados.codServico });
          }
          alert(dados.mensagem);
          window.location.reload();
        }).catch((erro) => {
          alert("Não foi possível cadastrar o serviço: " + erro.message);
        });
    }
    else{
      fetch("http://localhost:4000/servico", {
      method: "PUT",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(cadServico),
    }).then((resposta) =>{
      alert("Atualizado com sucesso!")
      window.location.reload();
    });
    }
  }

    function manipularMudanca(e) {
      const alvo = e.target.name;
      if (e.target.type === "checkbox") {
        setCadServico({ ...cadServico, [alvo]: e.target.checked });
      } else {
        setCadServico({ ...cadServico, [alvo]: e.target.value });
        console.log("Digitou " + e.target.value);
      }
    }


  function manipularSubmissao(evento) {
    const formulario = evento.currentTarget;
    if (formulario.checkValidity()) {
        setValidado(false);
        gravarServico();
      } else {
        setValidado(true);
      }
      evento.preventDefault();
      evento.stopPropagation();
    
  };

  return (
      <Container>
        <Row className="mb-3 border d-flex text-center">
          <h2>Fomulário de Cadastro Serviços</h2>
        </Row>
        <Row className="mt-2 p-2 border border-success">
          <Form noValidate validated={validado} onSubmit={manipularSubmissao}>
            <Row className="mb-3">
              <Form.Group as={Col} md="2">
                <Form.Label >Código:</Form.Label>
                <Form.Control
                  aria-label="Example text with button addon"
                  aria-describedby="basic-addon1"
                  id="codServico"
                  name="codServico"
                  type="int"
                  placeholder="ID"
                  required
                  disable
                  value={cadServico.codServico}
                  onChange={manipularMudanca} 
                  />
                <Form.Control.Feedback type="invalid">
                  Por favor informe o código do serviço.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="7" >
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  id="descricao"
                  name="descricao"
                  required
                  type="text"
                  placeholder="Descrição"
                  value={cadServico.descricao}
                  onChange={manipularMudanca}
                  />
                <Form.Control.Feedback type="invalid">
                  Por favor informe a descrição do serviço.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="2" >
                <Form.Label>Valor</Form.Label>
                <Form.Control
                  id="valor"
                  required
                  type="number"
                  name="valor"
                  placeholder="Valor"
                  value={cadServico.valor}
                  onChange={manipularMudanca}/>
                <Form.Control.Feedback type="invalid">
                  Por favor informe o valor.
                </Form.Control.Feedback>
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
              onClick={props.chamarTabelaServicos}
            >
              Voltar
            </Button>
            &nbsp;
          </Form>
        </Row>
      </Container>
    );
  }