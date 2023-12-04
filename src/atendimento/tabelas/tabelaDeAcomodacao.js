import React, { useState } from "react";
import { Container, Table, Button, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { IconeExcluir, IconeEditar } from "../../icones/icones";

export default function TabelaDeAcomodacao(props) {
  const [colunasSelecionadas, setColunasSelecionadas] = useState({
    codigo: true,
    numAcomodacao: true,
    capacidade: true,
    tamanho: true,
    localizacao: true,
    descricao: true,
    valor: true,
  });

  const [exibirConfirmacao, setExibirConfirmacao] = useState(false);
  const [acomodacaoParaExcluir, setAcomodacaoParaExcluir] = useState(null);

  const todasColunasDesmarcadas = Object.values(colunasSelecionadas).every(
    (value) => !value
  );

  const buttonImprimir = () => {
    window.print();
  };

  const handleExcluirClick = (acomodacao) => {
    setAcomodacaoParaExcluir(acomodacao);
    setExibirConfirmacao(true);
  };

  const handleConfirmarExclusao = () => {
    props.excluirAcomodacao(acomodacaoParaExcluir);
    setExibirConfirmacao(false);
  };

  const handleCancelarExclusao = () => {
    setAcomodacaoParaExcluir(null);
    setExibirConfirmacao(false);
  };

  return (
    <Container style={{ maxHeight: "100vh", overflowY: "auto" }}>
      <Row className="mb-3 border border-success d-flex text-center">
        <h3>Tabela de Acomodação</h3>
      </Row>
      <Row>
        <Col>
          <Button variant="success" onClick={props.chamarTelaCadastro}>
            Cadastrar Acomodação
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
        className={`mt-2 p-2 border border-danger ${
          exibirConfirmacao ? "" : "d-none"
        }`}
      >
        <Card.Title>Confirmar exclusão</Card.Title>
        <Card.Body>
          Deseja realmente excluir esta acomodação?
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
              {colunasSelecionadas.numAcomodacao && <th>Número Acomodação</th>}
              {colunasSelecionadas.capacidade && <th>Capacidade do Quarto</th>}
              {colunasSelecionadas.tamanho && <th>Tamanho</th>}
              {colunasSelecionadas.localizacao && <th>Localização</th>}
              {colunasSelecionadas.descricao && <th>Descrição</th>}
              {colunasSelecionadas.valor && <th>Valor</th>}
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {props.dados.map((acomodacao) => {
              return (
                <tr key={`${acomodacao.codigo}`}>
                  {colunasSelecionadas.codigo && <td>{acomodacao.codigo}</td>}
                  {colunasSelecionadas.numAcomodacao && (
                    <td>{acomodacao.num_acom}</td>
                  )}
                  {colunasSelecionadas.capacidade && (
                    <td>{acomodacao.capacidade}</td>
                  )}
                  {colunasSelecionadas.tamanho && <td>{acomodacao.tamanho}</td>}
                  {colunasSelecionadas.localizacao && (
                    <td>{acomodacao.localizacao}</td>
                  )}
                  {colunasSelecionadas.descricao && (
                    <td>{acomodacao.descricao}</td>
                  )}
                  {colunasSelecionadas.valor && <td>{acomodacao.valor}</td>}
                  <td>
                    <Button
                      className="btn btn-danger"
                      onClick={() => handleExcluirClick(acomodacao)}
                    >
                      <IconeExcluir />
                    </Button>{" "}
                    <Button
                      className="btn btn-warning"
                      onClick={() => {
                        props.editarAcomodacao(acomodacao);
                        console.log(acomodacao);
                      }}
                    >
                      <IconeEditar />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
      
    </Container>
  );
}


// import { Container, Table, Button, Row, Col } from "react-bootstrap";
// import { IconeEditar, IconeExcluir } from "../../icones/icones";
// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPrint } from "@fortawesome/free-solid-svg-icons";

// export default function TabelaDeAcomodacao(props) {
//   console.log("props>>>", props.dados);
//   const [colunasSelecionadas, setColunasSelecionadas] = useState({
//     codigo: true,
//     numAcomodacao: true,
//     capacidade: true,
//     tamanho: true,
//     localizacao: true,
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
//         <h3>Tabela de Acomodação</h3>
//       </Row>
//       <Row>
//         <Col>
//           <Button variant="success" onClick={props.chamarTelaCadastro}>
//             Cadastrar Acomodação
//           </Button>
//           {"  "}
//           <Button variant="warning" onClick={buttonImprimir}>
//             <FontAwesomeIcon icon={faPrint} />{' '}
//             Imprimir
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
//         <Table striped bordered hover variant="success">
//           <thead>
//             <tr>
//               {colunasSelecionadas.codigo && <th>Código</th>}
//               {colunasSelecionadas.numAcomodacao && <th>Número Acomodação</th>}
//               {colunasSelecionadas.capacidade && <th>Capacidade do Quarto</th>}
//               {colunasSelecionadas.tamanho && <th>Tamanho</th>}
//               {colunasSelecionadas.localizacao && <th>Localização</th>}
//               {colunasSelecionadas.descricao && <th>Descrição</th>}
//               {colunasSelecionadas.valor && <th>Valor</th>}
//               <th>Ações</th>
//             </tr>
//           </thead>
//           <tbody>
//             {props.dados.map((acomodacao) => {
//               return (
//                 <tr key={`${acomodacao.codigo}`}>
//                   {colunasSelecionadas.codigo && <td>{acomodacao.codigo}</td>}
//                   {colunasSelecionadas.numAcomodacao && (
//                     <td>{acomodacao.num_acom}</td>
//                   )}
//                   {colunasSelecionadas.capacidade && (
//                     <td>{acomodacao.capacidade}</td>
//                   )}
//                   {colunasSelecionadas.tamanho && <td>{acomodacao.tamanho}</td>}
//                   {colunasSelecionadas.localizacao && (
//                     <td>{acomodacao.localizacao}</td>
//                   )}
//                   {colunasSelecionadas.descricao && (
//                     <td>{acomodacao.descricao}</td>
//                   )}
//                   {colunasSelecionadas.valor && <td>{acomodacao.valor}</td>}
//                   <td>
//                     <Button
//                       className="btn btn-danger"
//                       onClick={() => {
//                         props.excluirAcomodacao(acomodacao);
//                         console.log(acomodacao);
//                       }}
//                     >
//                       <IconeExcluir />
//                     </Button>{" "}
//                     <Button
//                       className="btn btn-warning"
//                       onClick={() => {
//                         props.editarAcomodacao(acomodacao);
//                         console.log(acomodacao);
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
