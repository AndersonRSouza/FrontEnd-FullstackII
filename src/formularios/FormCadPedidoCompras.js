import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import BarraBusca from "../componentes/busca/BarraBusca";

export default function FormCadPedidoCompras(props) {
  // if (!props.)colocar validação do modo de edição para puxar os dados do formulário
  const [validado, setValidado] = useState(false);
  const [listaFornecedores, setListaFornecedores] = useState([]);
  // const [status, setStatus] = useState(STATUS.sucesso);
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState({});
  const [cadPedido, setCadPedido] = useState({
    codPedido: 0,
    produto: "",
    quantidade: 0,
    dataCompra: "",
  });

  useEffect(() => {
    fetch("http://localhost:4000/fornecedor", { method: "GET" })
      .then((resposta) => {
        return resposta.json();
      })
      .then((listaFornecedores) => {
        setListaFornecedores(listaFornecedores);
      })
      .catch((erro) => {
        alert("Não foi possivel recuperar os fornecedores do backend.");
      });
  });
  function gravarPedidoCompras() {
      fetch("http://localhost:4000/pedidocompras", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({
          produto: cadPedido.produto,
          quantidade: cadPedido.quantidade,
          dataCompra: cadPedido.dataCompra,
          fornecedor: {
            codigo: fornecedorSelecionado.codigo,
          },
        }),
      })
        .then((resposta) => {
          return resposta.json();
        })
        .then((dados) => {
          if (dados.status) {
            setCadPedido({ ...cadPedido, codPedido: dados.codPedido });
          }
          alert(dados.mensagem);
        })
        .catch((erro) => {
          alert("Não foi possivel registrar a venda: " + erro.message);
        });
  }

  function manipularMudanca(e) {
    const alvo = e.target.name;
    if (e.target.type === "checkbox") {
      setCadPedido({ ...cadPedido, [alvo]: e.target.checked });
    } else {
      setCadPedido({ ...cadPedido, [alvo]: e.target.value });
      console.log("Digitou " + e.target.value);
    }
  }

  const manipularSubmissao = (evento) => {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
      setValidado(false);
      gravarPedidoCompras();
    }
    else {
      setValidado(true);

    }
    evento.preventDefault();
    evento.stopPropagation();
  };
  return (
    <Container>
      <Row className="mb-3 border border-success d-flex text-center">
        <h3>Cadastro de Pedido Compras</h3>
      </Row>
      <Row className="mt-2 p-2 border border-success">
        <Form noValidate validated={validado} onSubmit={manipularSubmissao}>
          <Row className="mb-1">
            <Form.Group as={Col} md="1">
              <Form.Label>Código</Form.Label>
              <Form.Control
                id="codPedido"
                name="codPedido"
                required
                type="int"
                disabled
                value={cadPedido.codPedido}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe o código do pedido!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="5">
              <Form.Label>Produto</Form.Label>
              <Form.Control
                id="produto"
                name="produto"
                required
                type="text"
                placeholder="Produto"
                value={cadPedido.produto}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe a descrição do item!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="5">
              <Form.Label>Quantidade</Form.Label>
              <Form.Control
                id="quantidade"
                name="quantidade"
                required
                type="text"
                placeholder="Quantidade"
                value={cadPedido.quantidade}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe a quantidade para o pedido compra!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="7">
              <Form.Label>Data da Compra</Form.Label>
              <Form.Control
                id="dataCompra"
                name="dataCompra"
                required
                type="date"
                placeholder="00/00/0000"
                value={cadPedido.dataCompra}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe a data para compra!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>Selecione um Fornecedor:</Form.Label>
              <BarraBusca
                placeHolder={"Informe o nome do Fornecedor"}
                dados={listaFornecedores}
                campoChave={"codigo"}
                campoBusca={"razaoSocial"}
                funcaoSelecao={setFornecedorSelecionado}
                valor={""}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                required
                label="Ativo"
                feedback="Você deve informar se o pedidocompra esta ativo!!"
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
            onClick={() => {
              props.onTabela(true);
            }}
          >
            Voltar
          </Button>
          &nbsp;
        </Form>
      </Row>
    </Container>
  );
}
