import React, { useState } from "react";
import { Container, Table, Button, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { IconeExcluir } from "../../icones/icones";

export default function TabelaDePedidoReserva(props) {
  const [colunasSelecionadas, setColunasSelecionadas] = useState({
    codigo: true,
    codHospede: true,
    nomee: true,
    cpff: true,
    dataReserva: true,
    totalReserva: true,
  });

  const [exibirConfirmacao, setExibirConfirmacao] = useState(false);
  const [pedidoReservaParaExcluir, setPedidoReservaParaExcluir] = useState(null);

  const todasColunasDesmarcadas = Object.values(colunasSelecionadas).every(
    (value) => !value
  );

  const buttonImprimir = () => {
    window.print();
  };

  const handleExcluirClick = (pedidoReserva) => {
    setPedidoReservaParaExcluir(pedidoReserva);
    setExibirConfirmacao(true);
  };

  const handleConfirmarExclusao = () => {
    props.excluirPedidoReserva(pedidoReservaParaExcluir);
    setExibirConfirmacao(false);
  };

  const handleCancelarExclusao = () => {
    setPedidoReservaParaExcluir(null);
    setExibirConfirmacao(false);
  };

  return (
    <Container style={{ maxHeight: "100vh", overflowY: "auto" }}>
      <Row className="mb-3 border border-success d-flex text-center">
        <h3>Tabela de Pedido Reservas</h3>
      </Row>
      <Row>
        <Col>
          <Button variant="success" onClick={props.chamarTelaCadastro}>
            Cadastrar Pedido Reserva
          </Button>{"  "}
          <Button variant="warning" onClick={buttonImprimir}>
            <FontAwesomeIcon icon={faPrint} /> Imprimir
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          {Object.entries(colunasSelecionadas).map(([coluna, selecionada]) => (
            <span key={coluna} className="mr-3 m-1">
              <input
                type="checkbox"
                checked={selecionada}
                onChange={() =>
                  setColunasSelecionadas({
                    ...colunasSelecionadas,
                    [coluna]: !selecionada,
                  })
                }
              />
              {coluna}
            </span>
          ))}
        </Col>
      </Row>
      <Card
        className={`mt-2 p-2 border border-danger ${
          exibirConfirmacao ? "" : "d-none"
        }`}
      >
        <Card.Title>Confirmar exclusão</Card.Title>
        <Card.Body>
          Deseja realmente excluir este pedido de reserva?
          {' '}<Button className="ml-2" variant="danger" onClick={handleConfirmarExclusao}>
            Sim
          </Button>{' '}
          <Button className="ml-2" variant="secondary" onClick={handleCancelarExclusao}>
            Não
          </Button>
        </Card.Body>
      </Card>
      <Row
        className={`mt-2 p-2 border border-success ${
          todasColunasDesmarcadas ? "d-none" : ""
        }`}
        style={{ overflowX: "auto" }}
      >
        <Table striped bordered hover variant="success">
          <thead>
            <tr>
              {colunasSelecionadas.codigo && <th>Código</th>}
              {colunasSelecionadas.codHospede && <th>Cód do Hóspede</th>}
              {colunasSelecionadas.nomee && <th>Hóspede</th>}
              {colunasSelecionadas.cpff && <th>CPF</th>}
              {colunasSelecionadas.dataReserva && <th>Data da Reserva</th>}
              {colunasSelecionadas.totalReserva && <th>Total da Reserva</th>}
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {props.dados.map((pedidoReserva) => {
              return (
                <tr key={`${pedidoReserva.codPedido} `}>
                  {colunasSelecionadas.codigo && (
                    <td>{pedidoReserva.codPedido}</td>
                  )}
                  {colunasSelecionadas.codHospede && (
                    <td>{pedidoReserva.hospede.cod_hosp}</td>
                  )}
                   {colunasSelecionadas.nomee && (
                    <td>{pedidoReserva.hospede.nome}</td>
                  )}
                  {colunasSelecionadas.cpff && (
                    <td>{pedidoReserva.hospede.cpf}</td>
                  )}
                  {colunasSelecionadas.dataReserva && (
                    <td>{pedidoReserva.dataReserva}</td>
                  )}
                  {colunasSelecionadas.totalReserva && (
                    <td>{pedidoReserva.total}</td>
                  )}
                  <td>
                    <Button
                      className="btn btn-danger"
                      onClick={() => handleExcluirClick(pedidoReserva)}
                    >
                      <IconeExcluir />
                    </Button>{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
      {/* Card de Confirmação */}
      
    </Container>
  );
}
