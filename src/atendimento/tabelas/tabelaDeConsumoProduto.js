import React, { useState } from "react";
import { Container, Table, Button, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { IconeExcluir } from "../../icones/icones";

export default function TabelaDeConsumoProduto(props) {
  const [colunasSelecionadas, setColunasSelecionadas] = useState({
    codConsumoProduto: true,
    codHospede: true,
    nomeHospede: true,
    dataCompra: true,
    preco: true,
    totalCompra: true,
  });

  const [exibirConfirmacao, setExibirConfirmacao] = useState(false);
  const [consumoProdutoParaExcluir, setConsumoProdutoParaExcluir] = useState(null);

  const todasColunasDesmarcadas = Object.values(colunasSelecionadas).every(
    (value) => !value
  );

  const buttonImprimir = () => {
    window.print();
  };

  const handleExcluirClick = (consumoProduto) => {
    setConsumoProdutoParaExcluir(consumoProduto);
    setExibirConfirmacao(true);
  };

  const handleConfirmarExclusao = () => {
    props.excluirConsumoProduto(consumoProdutoParaExcluir);
    setExibirConfirmacao(false);
  };

  const handleCancelarExclusao = () => {
    setConsumoProdutoParaExcluir(null);
    setExibirConfirmacao(false);
  };

  return (
    <Container style={{ maxHeight: "100vh", overflowY: "auto" }}>
      <Row className="mb-3 border border-success d-flex text-center">
        <h3>Tabela de Consumo de Produto</h3>
      </Row>
      <Row>
        <Col>
          <Button variant="success" onClick={props.chamarTelaCadastro}>
            Cadastrar Compra de Produto dos Hóspedes
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
          Deseja realmente excluir este consumo de produto?
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
              {colunasSelecionadas.codConsumoProduto && <th>Código</th>}
              {colunasSelecionadas.codHospede && <th>Cód Hospede</th>}
              {colunasSelecionadas.nomeHospede && <th>Hospede</th>}
              {colunasSelecionadas.dataCompra && <th>Data da Compra</th>}
              {colunasSelecionadas.preco && <th>Preço</th>}
              {colunasSelecionadas.totalCompra && <th>Total Compra</th>}
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {props.dados.map((consumoProduto) => {
              return (
                <tr key={`${consumoProduto.codConsumoProduto}`}>
                  {colunasSelecionadas.codConsumoProduto && (
                    <td>{consumoProduto.codConsumoProduto}</td>
                  )}
                  {colunasSelecionadas.codHospede && (
                    <td>{consumoProduto.hospede.cod_hosp}</td>
                  )}
                  {colunasSelecionadas.nomeHospede && (
                    <td>{consumoProduto.hospede.nome}</td>
                  )}
                  {colunasSelecionadas.dataCompra && (
                    <td>{consumoProduto.dataCompra}</td>
                  )}
                  {colunasSelecionadas.preco && <td>{consumoProduto.preco}</td>}
                  {colunasSelecionadas.totalCompra && (
                    <td>{consumoProduto.total}</td>
                  )}
                  <td>
                    <Button
                      className="btn btn-danger"
                      onClick={() => handleExcluirClick(consumoProduto)}
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
      
    </Container>
  );
}



// import { Container, Table, Button, Row, Col } from "react-bootstrap";
// import { IconeExcluir } from "../../icones/icones";
// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPrint } from "@fortawesome/free-solid-svg-icons";
// // import TelaDeCadastroPedidoCompra from "../TelasDeCadastro/TelaDeCadastroPedidoCompras";
// // import  from "../TelasDeCadastro/TelaDeCadastroPedidoCompras";

// export default function TabelaDeConsumoProduto(props) {
//   console.log("props>>>", props.dados);
//   const [colunasSelecionadas, setColunasSelecionadas] = useState({
//     codConsumoProduto: true,
//     codHospede: true,
//     nomeHospede: true,
//     dataCompra: true,
//     preco: true,
//     totalCompra: true,
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
//         <h3>Tabela de Consumo de Produto</h3>
//       </Row>
//       <Row>
//         <Col>
//           <Button variant="success" onClick={props.chamarTelaCadastro}>
//             Cadastrar Compra de Produto dos Hóspedes
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
//         <Table striped bordered hover variant="sucess">
//           <thead>
//             <tr>
//               {colunasSelecionadas.codConsumoProduto && <th>Código</th>}
//               {colunasSelecionadas.codHospede && <th>Cód Hospede</th>}
//               {colunasSelecionadas.nomeHospede && <th>Hospede</th>}
//               {colunasSelecionadas.dataCompra && <th>Data da Compra</th>}
//               {colunasSelecionadas.preco && <th>Preço</th>}
//               {colunasSelecionadas.totalCompra && <th>Total Compra</th>}
//               <th>Ações</th>
//             </tr>
//           </thead>
//           <tbody>
//             {props.dados.map((consumoProduto) => {
//               return (
//                 <tr key={`${consumoProduto.codConsumoProduto}`}>
//                   {colunasSelecionadas.codConsumoProduto && (
//                     <td>{consumoProduto.codConsumoProduto}</td>
//                   )}
//                   {colunasSelecionadas.codHospede && (
//                     <td>{consumoProduto.hospede.cod_hosp}</td>
//                   )}
//                   {colunasSelecionadas.nomeHospede && (
//                     <td>{consumoProduto.hospede.nome}</td>
//                   )}
//                   {colunasSelecionadas.dataCompra && (
//                     <td>{consumoProduto.dataCompra}</td>
//                   )}
//                   {colunasSelecionadas.preco && <td>{consumoProduto.preco}</td>}
//                   {colunasSelecionadas.totalCompra && (
//                     <td>{consumoProduto.total}</td>
//                   )}
//                   <td>
//                     <Button
//                       className="btn btn-danger"
//                       onClick={() => {
//                         props.excluirConsumoProduto(consumoProduto);
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
