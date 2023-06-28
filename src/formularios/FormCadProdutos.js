import { useState } from "react";
import { Container, Row, Form, Col, Button } from "react-bootstrap";

export default function FormCadProduto(props) {
    const [validado, setValidado] = useState(false);
    const [cadProduto, setCadProduto] = useState({
      codProduto: 0,
      nome: "",
      preco: 0,
    });
  
    function gravarProduto() {
      fetch("http://localhost:4000/produto", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({
          codigo: cadProduto.codProduto,
          nome: cadProduto.nome,
          preco: cadProduto.preco,
        }),
      })
        .then((resposta) => {
          return resposta.json();
        })
        .then((dados) => {
          if (dados.status) {
            setCadProduto({ ...cadProduto, codProduto: dados.codProduto });
          }
          alert(dados.mensagem);
        })
        .catch((erro) => {
          alert("Não foi possível cadastrar o produto: " + erro.message);
        });
    }
  
    function manipularMudanca(e) {
      const alvo = e.target.name;
      if (e.target.type === "checkbox") {
        setCadProduto({ ...cadProduto, [alvo]: e.target.checked });
      } else {
        setCadProduto({ ...cadProduto, [alvo]: e.target.value });
        console.log("Digitou " + e.target.value);
      }
    }
  
    const manipularSubmissao = (evento) => {
      const form = evento.currentTarget;
      if (form.checkValidity()) {
        setValidado(false);
        gravarProduto();
      } else {
        setValidado(true);
      }
      evento.preventDefault();
      evento.stopPropagation();
    };
  
    return (
      <Container>
        <Row className="mb-3 border border-success d-flex text-center">
          <h3>Cadastro de Produto</h3>
        </Row>
        <Row className="mt-2 p-2 border border-success">
          <Form noValidate validated={validado} onSubmit={manipularSubmissao}>
            <Row className="mb-1">
              <Form.Group as={Col} md="2">
                <Form.Label>Código</Form.Label>
                <Form.Control
                  id="codProduto"
                  name="codProduto"
                  required
                  type="int"
                  disabled
                  value={cadProduto.codProduto}
                  onChange={manipularMudanca}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, informe o código do produto!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="8">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  id="nome"
                  name="nome"
                  required
                  type="text"
                  placeholder="Nome"
                  value={cadProduto.nome}
                  onChange={manipularMudanca}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, informe o nome do produto!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="2">
                <Form.Label>Preço</Form.Label>
                <Form.Control
                  id="preco"
                  name="preco"
                  required
                  type="number"
                  placeholder="Preço"
                  value={cadProduto.preco}
                  onChange={manipularMudanca}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, informe o preço do produto!
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
              onClick={props.chamarTabelaProdutos}
            >
              Voltar
            </Button>
            &nbsp;
          </Form>
        </Row>
      </Container>
    );
  }
  
