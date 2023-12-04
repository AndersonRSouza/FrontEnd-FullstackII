import React, { useState } from "react";
import { Container, Table, Button, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { IconeExcluir } from "../../icones/icones";

export default function TabelaDePedidoCompra(props) {
  const [colunasSelecionadas, setColunasSelecionadas] = useState({
    codigo: true,
    codFornecedor: true,
    fornecedor: true,
    dataCompra: true,
    totalCompra: true,
  });

  const [exibirConfirmacao, setExibirConfirmacao] = useState(false);
  const [pedidoCompraParaExcluir, setPedidoCompraParaExcluir] = useState(null);

  const todasColunasDesmarcadas = Object.values(colunasSelecionadas).every(
    (value) => !value
  );

  const buttonImprimir = () => {
    window.print();
  };

  const handleExcluirClick = (pedidoCompra) => {
    setPedidoCompraParaExcluir(pedidoCompra);
    setExibirConfirmacao(true);
  };

  const handleConfirmarExclusao = () => {
    props.excluirPedidoCompra(pedidoCompraParaExcluir);
    setExibirConfirmacao(false);
  };

  const handleCancelarExclusao = () => {
    setPedidoCompraParaExcluir(null);
    setExibirConfirmacao(false);
  };

  return (
    <Container style={{ maxHeight: "100vh", overflowY: "auto" }}>
      <Row className="mb-3 border border-success d-flex text-center">
        <h3>Tabela de Pedido Compras</h3>
      </Row>
      <Row>
        <Col>
          <Button variant="success" onClick={props.chamarTelaCadastro}>
            Cadastrar Pedido Compra
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
          Deseja realmente excluir este pedido de compra?
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
              {colunasSelecionadas.codFornecedor && <th>Cód Fornecedor</th>}
              {colunasSelecionadas.fornecedor && <th>Fornecedor</th>}
              {colunasSelecionadas.dataCompra && <th>Data da Compra</th>}
              {colunasSelecionadas.totalCompra && <th>Total Compra</th>}
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {props.dados.map((pedidoCompra) => {
              return (
                <tr key={`${pedidoCompra.codPedido} `}>
                  {colunasSelecionadas.codigo && (
                    <td>{pedidoCompra.codPedido}</td>
                  )}
                  {colunasSelecionadas.codFornecedor && (
                    <td>{pedidoCompra.fornecedor.codigo}</td>
                  )}
                  {colunasSelecionadas.fornecedor && (
                    <td>{pedidoCompra.fornecedor.razaoSocial}</td>
                  )}
                  {colunasSelecionadas.dataCompra && (
                    <td>{pedidoCompra.dataCompra}</td>
                  )}
                  {colunasSelecionadas.totalCompra && (
                    <td>{pedidoCompra.total}</td>
                  )}
                  <td>
                    <Button
                      className="btn btn-danger"
                      onClick={() => handleExcluirClick(pedidoCompra)}
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

// // import TelaDeCadastroPedidoCompra from "../TelasDeCadastro/TelaDeCadastroPedidoCompras";
// // import  from "../TelasDeCadastro/TelaDeCadastroPedidoCompras";

// export default function TabelaDePedidoCompra(props) {
//   console.log("props>>>", props.dados);
//   const [colunasSelecionadas, setColunasSelecionadas] = useState({
//     codigo: true,
//     codFornecedor: true,
//     fornecedor: true,
//     dataCompra: true,
//     totalCompra: true,
//   });

//   const todasColunasDesmarcadas = Object.values(colunasSelecionadas).every(
//     (value) => !value
//   );

//   const buttonImprimir = () => {
//     window.print();
//   };

//   return (
//     <Container Container style={{ maxHeight: "100vh", overflowY: "auto" }}>
//       <Row className="mb-3 border border-success d-flex text-center">
//         <h3>Tabela de Pedido Compras</h3>
//       </Row>
//       <Row>
//         <Col>
//           <Button variant="success" onClick={props.chamarTelaCadastro}>
//             Cadastrar Pedido Compra
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
//               {colunasSelecionadas.codigo && <th>Código</th>}
//               {colunasSelecionadas.codFornecedor && <th>Cód Fornecedor</th>}
//               {colunasSelecionadas.fornecedor && <th>Fornecedor</th>}
//               {colunasSelecionadas.dataCompra && <th>Data da Compra</th>}
//               {colunasSelecionadas.totalCompra && <th>Total Compra</th>}
//               <th>Ações</th>
//             </tr>
//           </thead>
//           <tbody>
//             {props.dados.map((pedidoCompra) => {
//               return (
//                 <tr key={`${pedidoCompra.codPedido} `}>
//                   {colunasSelecionadas.codigo && (
//                     <td>{pedidoCompra.codPedido}</td>
//                   )}
//                   {colunasSelecionadas.codFornecedor && (
//                     <td>{pedidoCompra.fornecedor.codigo}</td>
//                   )}
//                   {colunasSelecionadas.fornecedor && (
//                     <td>{pedidoCompra.fornecedor.razaoSocial}</td>
//                   )}
//                   {colunasSelecionadas.dataCompra && (
//                     <td>{pedidoCompra.dataCompra}</td>
//                   )}
//                   {colunasSelecionadas.totalCompra && (
//                     <td>{pedidoCompra.total}</td>
//                   )}
//                   <td>
//                     <Button
//                       className="btn btn-danger"
//                       onClick={() => {
//                         props.excluirPedidoCompra(pedidoCompra);
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
