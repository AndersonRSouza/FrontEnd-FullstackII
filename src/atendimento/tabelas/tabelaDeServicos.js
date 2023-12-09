import React, { useState } from "react";
import { Container, Row, Col, Button, Table, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { IconeExcluir, IconeEditar } from "../../icones/icones";

export default function TabelaDeServicos(props) {
  const [colunasSelecionadas, setColunasSelecionadas] = useState({
    codServico: true,
    descricao: true,
    valor: true,
  });

  const [exibirConfirmacao, setExibirConfirmacao] = useState(false);
  const [servicoParaExcluir, setServicoParaExcluir] = useState(null);

  const todasColunasDesmarcadas = Object.values(colunasSelecionadas).every(
    (value) => !value
  );

  const buttonImprimir = () => {
    window.print();
  };

  const handleExcluirClick = (servico) => {
    setServicoParaExcluir(servico);
    setExibirConfirmacao(true);
  };

  const handleConfirmarExclusao = () => {
    props.excluirServico(servicoParaExcluir);
    setExibirConfirmacao(false);
  };

  const handleCancelarExclusao = () => {
    setServicoParaExcluir(null);
    setExibirConfirmacao(false);
  };

  return (
    <Container style={{ maxHeight: "100vh", overflowY: "auto" }}>
      <Row className="mb-3 border border-success d-flex text-center">
        <h3>Tabela de Serviços</h3>
      </Row>
      <Row>
        <Col>
          <Button variant="success" onClick={props.chamarTelaCadastro}>
            Cadastrar Serviço
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
      {/* Card de Confirmação */}
      <Card
        className={`mt-2 p-2  border border-danger ${
          exibirConfirmacao ? "" : "d-none"
        }`}
      >
        <Card.Title>Confirmar exclusão</Card.Title>
        <Card.Body>
          Deseja realmente excluir este serviço?
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
              {colunasSelecionadas.codServico && <th>Código</th>}
              {colunasSelecionadas.descricao && <th>Descrição</th>}
              {colunasSelecionadas.valor && <th>Valor</th>}
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {props.dados.map((servico) => (
              <tr key={`${servico.codServico}`}>
                {colunasSelecionadas.codServico && <td>{servico.codServico}</td>}
                {colunasSelecionadas.descricao && <td>{servico.descricao}</td>}
                {colunasSelecionadas.valor && <td>{servico.valor}</td>}
                <td>
                  <Button
                    className="btn btn-danger"
                    onClick={() => handleExcluirClick(servico)}
                  >
                    <IconeExcluir />
                  </Button>{" "}
                  <Button
                    className="btn btn-warning"
                    onClick={() => {
                      props.editarServico(servico);
                    }}
                  >
                    <IconeEditar />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
      
    </Container>
  );
}


// import { Container, Row, Col, Button, Table } from "react-bootstrap";
// import { IconeEditar, IconeExcluir } from "../../icones/icones";
// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPrint } from "@fortawesome/free-solid-svg-icons";

// export default function TabelaDeServicos(props) {
//   const [colunasSelecionadas, setColunasSelecionadas] = useState({
//     codServico: true,
//     descricao: true,
//     valor: true,
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
//         <h3>Tabela de Serviços</h3>
//       </Row>
//         <Col>
//           <Button variant="success" onClick={props.chamarTelaCadastro}>
//             Cadastrar Serviço
//           </Button>
//           {"  "}
//           <Button variant="warning" onClick={buttonImprimir}>
//             <FontAwesomeIcon icon={faPrint} /> Imprimir
//           </Button>
//         </Col>
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
//       <Row>
//       </Row>
//       <Row
//         className={`mt-2 p-2 border border-success ${
//           todasColunasDesmarcadas ? "d-none" : ""
//         }`}
//         style={{ overflowX: "auto" }}
//       >
//         <Table striped bordered hover variant="success">
//           <thead>
//             <tr>
//               {colunasSelecionadas.codServico && <th>Código</th>}
//               {colunasSelecionadas.descricao && <th>Descrição</th>}
//               {colunasSelecionadas.valor && <th>Valor</th>}
//               <th>Ações</th>
//             </tr>
//           </thead>
//           <tbody>
//             {props.dados.map((servico) => {
//               return (
//                 <tr key={`${servico.codServico}`}>
//                   {colunasSelecionadas.codServico && (
//                     <td>{servico.codServico}</td>
//                   )}
//                   {colunasSelecionadas.descricao && (
//                     <td>{servico.descricao}</td>
//                   )}
//                   {colunasSelecionadas.valor && <td>{servico.valor}</td>}
//                   <td>
//                     <Button
//                       className="btn btn-danger"
//                       onClick={() => {
//                         props.excluirServico(servico);
//                       }}
//                     >
//                       <IconeExcluir />
//                     </Button>{" "}
//                     <Button
//                       className="btn btn-warning"
//                       onClick={() => {
//                         props.editarServico(servico);
//                       }}
//                     >
//                       <IconeEditar />
//                     </Button>
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
