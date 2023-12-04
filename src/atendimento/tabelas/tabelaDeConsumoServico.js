import React, { useState } from "react";
import { Container, Table, Button, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { IconeExcluir } from "../../icones/icones";

export default function TabelaDeConsumoServico(props) {
  const [colunasSelecionadas, setColunasSelecionadas] = useState({
    codConsumoServico: true,
    codHospede: true,
    nomeHospede: true,
    total: true,
  });

  const [exibirConfirmacao, setExibirConfirmacao] = useState(false);
  const [consumoServicoParaExcluir, setConsumoServicoParaExcluir] = useState(null);

  const todasColunasDesmarcadas = Object.values(colunasSelecionadas).every(
    (value) => !value
  );

  const buttonImprimir = () => {
    window.print();
  };

  const handleExcluirClick = (consumoServico) => {
    setConsumoServicoParaExcluir(consumoServico);
    setExibirConfirmacao(true);
  };

  const handleConfirmarExclusao = () => {
    props.excluirConsumoServico(consumoServicoParaExcluir);
    setExibirConfirmacao(false);
  };

  const handleCancelarExclusao = () => {
    setConsumoServicoParaExcluir(null);
    setExibirConfirmacao(false);
  };

  return (
    <Container style={{ maxHeight: "100vh", overflowY: "auto" }}>
      <Row className="mb-3 border border-success d-flex text-center">
        <h3>Tabela de Consumo de Serviço</h3>
      </Row>
      <Row>
        <Col>
          <Button variant="success" onClick={props.chamarTelaCadastro}>
            Cadastrar Consumo de Serviço
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
          Deseja realmente excluir este consumo de serviço?
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
              {colunasSelecionadas.codConsumoServico && <th>Código</th>}
              {colunasSelecionadas.codHospede && <th>Cód Hospede</th>}
              {colunasSelecionadas.nomeHospede && <th>Hospede</th>}
              {colunasSelecionadas.total && <th>Total Compra</th>}
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {props.dados.map((consumoServico) => {
              return (
                <tr key={`${consumoServico.codConsumoServico}`}>
                  {colunasSelecionadas.codConsumoServico && (
                    <td>{consumoServico.codConsumoServico}</td>
                  )}
                  {colunasSelecionadas.codHospede && (
                    <td>{consumoServico.hospede.cod_hosp}</td>
                  )}
                  {colunasSelecionadas.nomeHospede && (
                    <td>{consumoServico.hospede.nome}</td>
                  )}
                  {colunasSelecionadas.total && <td>{consumoServico.total}</td>}
                  <td>
                    <Button
                      className="btn btn-danger"
                      onClick={() => handleExcluirClick(consumoServico)}
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



// import { Container, Table, Button, Row, Col } from "react-bootstrap";
// import { IconeExcluir } from "../../icones/icones";
// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPrint } from "@fortawesome/free-solid-svg-icons";

// export default function TabelaDeConsumoServico(props) {
//   console.log("props>>>", props.dados);
//   const [colunasSelecionadas, setColunasSelecionadas] = useState({
//     codConsumoServico: true,
//     codHospede: true,
//     nomeHospede: true,
//     total: true,
//   });

//   const todasColunasDesmarcadas = Object.values(colunasSelecionadas).every(
//     (value) => !value
//   );
//   const buttonImprimir = () => {
//     window.print();
//   };

//   return (
//     <Container style={{ maxHeight: "100vh", overflowY: "auto" }}>
//       <Row className="mb-3 border border-success d-flex text-center">
//         <h3>Tabela de Consumo de Serviço</h3>
//       </Row>
//       <Row>
//         <Col>
//           <Button variant="success" onClick={props.chamarTelaCadastro}>
//             Cadastrar Consumo de Serviço
//           </Button>
//           {"  "}
//           <Button variant="warning" onClick={buttonImprimir}>
//             <FontAwesomeIcon icon={faPrint} /> Imprimir
//           </Button>
//         </Col>
//       </Row>
//       <Row>
//         <Col className="text-center">
//           {Object.entries(colunasSelecionadas).map(([coluna, selecionada]) => (
//             <span key={coluna} className="mr-3 m-1">
//               <input
//                 type="checkbox"
//                 checked={selecionada}
//                 onChange={() =>
//                   setColunasSelecionadas({
//                     ...colunasSelecionadas,
//                     [coluna]: !selecionada,
//                   })
//                 }
//               />
//               {coluna}
//             </span>
//           ))}
//         </Col>
//       </Row>
//       <Row
//         className={`mt-2 p-2 border border-success ${
//           todasColunasDesmarcadas ? "d-none" : ""
//         }`}
//         style={{ overflowX: "auto" }}
//       >
//         <Table striped bordered hover variant="sucess">
//           <thead>
//             <tr>
//               {colunasSelecionadas.codConsumoServico && <th>Código</th>}
//               {colunasSelecionadas.codHospede && <th>Cód Hospede</th>}
//               {colunasSelecionadas.nomeHospede && <th>Hospede</th>}
//               {colunasSelecionadas.total && <th>Total Compra</th>}
//               <th>Ações</th>
//             </tr>
//           </thead>
//           <tbody>
//             {props.dados.map((consumoServico) => {
//               return (
//                 <tr key={`${consumoServico.codConsumoServico}`}>
//                   {colunasSelecionadas.codConsumoServico && (
//                     <td>{consumoServico.codConsumoServico}</td>
//                   )}
//                   {colunasSelecionadas.codHospede && (
//                     <td>{consumoServico.hospede.cod_hosp}</td>
//                   )}
//                   {colunasSelecionadas.nomeHospede && (
//                     <td>{consumoServico.hospede.nome}</td>
//                   )}
//                   {colunasSelecionadas.total && <td>{consumoServico.total}</td>}
//                   <td>
//                     <Button
//                       className="btn btn-danger"
//                       onClick={() => {
//                         props.excluirConsumoServico(consumoServico);
//                       }}
//                     >
//                       <IconeExcluir />
//                     </Button>{" "}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </Table>
//       </Row>
//     </Container>
//   );
// }
