import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import BarraBusca from "../../componentes/busca/BarraBusca";
import CaixaSelecao from "../../componentes/busca/CaixaSelecao";
import TabelaServicoHospede from "../tabelas/TabelaServicoHospede";

export default function FormCadConsumoServicos(props) {
  // if (!props.)colocar validação do modo de edição para puxar os dados do formulário
  const [validado, setValidado] = useState(false);
  const [listaHospedes, setListaHospedes] = useState([]);
  const [servicoSelecionado, setServicoSelecionado] = useState({});
  const [qtdItem, setQtdItem] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [hospedeSelecionado, setHospedeSelecionado] = useState({});
  const [cadConsumoServico, setCadConsumoServico] = useState({
    codConsumoServico: 0,
    quantidade: 0,
    listaServicos: [],
  });

  // useEffect(() => {
  //   fetch("http://localhost:4000/servico", { method: "GET" })
  //     .then((resposta) => {
  //       return resposta.json();
  //     })
  //     .then((listaServicos) => {
  //       setListaServicos(listaServicos);
  //     })
  //     .catch((erro) => {
  //       alert("Não foi possivel recuperar os fornecedores do backend.");
  //     });
  // });
  useEffect(() => {
    fetch("http://localhost:4000/hospede", { method: "GET" })
      .then((resposta) => {
        return resposta.json();
      })
      .then((listaHospedes) => {
        setListaHospedes(listaHospedes);
      })
      .catch((erro) => {
        alert("Não foi possivel recuperar os fornecedores do backend.");
      });
  },[]);
  function gravarConsumoServicos() {
    console.log("gravar teste")
    fetch("http://localhost:4000/consumoservico", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        quantidade: cadConsumoServico.quantidade,
        dataServico: cadConsumoServico.dataServico,
        hospede: {
          cod_hosp: hospedeSelecionado.cod_hosp,
        },
        servicos: cadConsumoServico.listaServicos
      }),
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((dados) => {
        if (dados.status) {
          setCadConsumoServico({ ...cadConsumoServico, codConsumoServico: dados.codConsumoServico });
        }
        alert(dados.mensagem);
        window.location.reload();
      })
      .catch((erro) => {
        alert("Não foi possivel registrar a venda: " + erro.message);
      });
  }

  function manipularMudanca(e) {
    const alvo = e.target.name;
    if (e.target.type === "checkbox") {
      setCadConsumoServico({ ...cadConsumoServico, [alvo]: e.target.checked });
    } else {
      setCadConsumoServico({ ...cadConsumoServico, [alvo]: e.target.value });
      console.log("Digitou " + e.target.value);
    }
  }

  const manipularSubmissao = (evento) => {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
      setValidado(false);
      gravarConsumoServicos();
    } else {
      setValidado(true);
    }
    evento.preventDefault();
    evento.stopPropagation();
  };
  return (
    <Container>
      <Row className="mb-3 border border-success d-flex text-center">
        <h3>Cadastro de Consumo de Servicos</h3>
      </Row>
      <Row className="mt-2 p-2 border border-success">
        <Form noValidate validated={validado} onSubmit={manipularSubmissao}>
          <Row className="mb-1">
            <Form.Group as={Col} md="1">
              <Form.Label>Código</Form.Label>
              <Form.Control
                id="codConsumoServico"
                name="codConsumoServico"
                required
                type="int"
                disabled
                value={cadConsumoServico.codConsumoServico}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe o código do Consumo!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="5">
              <Form.Label>Data do Servico</Form.Label>
              <Form.Control
                id="dataServico"
                name="dataServico"
                required
                type="date"
                placeholder="00/00/0000"
                value={cadConsumoServico.dataServico}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe a data para compra!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>Selecione um Hospede:</Form.Label>
              <BarraBusca
                id="codHospedeConsumo"
                name="codHospedeConsumo"
                placeHolder={"Informe o nome do Hospede"}
                dados={listaHospedes}
                campoChave={"cod_hosp"}
                campoBusca={"nome"}
                funcaoSelecao={setHospedeSelecionado}
                valor={""}
              />
            </Form.Group>
            <Container className="m-1 border">
              <Form.Group>
                <Form.Label>Selecione um servico:</Form.Label>
                <CaixaSelecao
                  enderecoFonteDados="http://localhost:4000/servico"
                  campoChave={"codServico"}
                  campoExibicao={"descricao"}
                  funcaoSelecao={setServicoSelecionado}
                />
              </Form.Group>
              <Row>
                <Col md={10}>
                  <Row>
                    <Col md={1}>
                      <Form.Group>
                        <Form.Label>Codigo:</Form.Label>
                        <Form.Control
                          type="text"
                          value={servicoSelecionado.codServico}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={5}>
                      <Form.Group>
                        <Form.Label>Descrição do servico:</Form.Label>
                        <Form.Control
                          type="text"
                          value={servicoSelecionado.descricao}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={2}>
                      <Form.Group>
                        <Form.Label>Preço R$:</Form.Label>
                        <Form.Control
                          type="text"
                          value={servicoSelecionado.valor}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={1}>
                      <Form.Group>
                        <Form.Label>Qtd:</Form.Label>
                        <Form.Control 
                          type="number" 
                          min={1} 
                          value={qtdItem}
                          onChange={(e)=>{
                            const qtd = e.currentTarget.value;
                            if (qtd > 0){
                              setQtdItem(qtd);
                              setSubTotal(qtd * parseFloat(servicoSelecionado.valor));
                            }
                          }}/>
                      </Form.Group>
                    </Col>
                    <Col md={1}>
                      <Form.Group>
                        <Form.Label>SubTotal:</Form.Label>
                        <Form.Control type="text" value={subTotal.toFixed(2)} disabled />
                      </Form.Group>
                    </Col>
                    <Col md={1} className="middle">
                      <Form.Group>
                        <Form.Label>Adicionar</Form.Label>
                        <Button onClick={()=>{
                          let listaServicoPrestados = cadConsumoServico.listaServicos;
                          listaServicoPrestados.push({
                            codServico:servicoSelecionado.codServico,
                            nome:servicoSelecionado.nome,
                            valor:servicoSelecionado.valor,
                            qtd: qtdItem,
                            subTotal: subTotal
                          });
                          setCadConsumoServico({...cadConsumoServico,listaServicos:listaServicoPrestados});
                        }}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="bi bi-plus-circle"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                          </svg>
                        </Button>
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="mt-3">
                <p>
                  <strong>Lista de servicos selecionados</strong>
                </p>
                <TabelaServicoHospede 
                  listaItens={cadConsumoServico.listaServicos}
                  setcadConsumoServico={setCadConsumoServico}
                  dadosConsumoServico={cadConsumoServico}/>
              </Row>
            </Container>

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
            // onClick={props.chamarTabelaPedidos}
          >
            Cadastrar
          </Button>
          &nbsp;
          <Button
            className="btn btn-warning border border-warning text-white"
            type="button"
            onClick={props.chamarTabelaConsumoServicos}
          >
            Voltar
          </Button>
          &nbsp;
        </Form>
      </Row>
    </Container>
  );
}
