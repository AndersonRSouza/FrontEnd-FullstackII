import React, { useState } from "react";
import { Container, Table, Button, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { IconeExcluir } from "../../icones/icones";

export default function TabelaDeProdutos(props) {
  const [colunasSelecionadas, setColunasSelecionadas] = useState({
    codProduto: true,
    nome: true,
    preco: true,
  });

  const [exibirConfirmacao, setExibirConfirmacao] = useState(false);
  const [produtoParaExcluir, setProdutoParaExcluir] = useState(null);

  const todasColunasDesmarcadas = Object.values(colunasSelecionadas).every(
    (value) => !value
  );

  const buttonImprimir = () => {
    window.print();
  };

  const handleExcluirClick = (produto) => {
    setProdutoParaExcluir(produto);
    setExibirConfirmacao(true);
  };

  const handleConfirmarExclusao = () => {
    props.excluirProduto(produtoParaExcluir);
    setExibirConfirmacao(false);
  };

  const handleCancelarExclusao = () => {
    setProdutoParaExcluir(null);
    setExibirConfirmacao(false);
  };

  return (
    <Container style={{ maxHeight: "100vh", overflowY: "auto" }}>
      <Row className="mb-3 border border-success d-flex text-center">
        <h3>Tabela de Produtos</h3>
      </Row>
      <Row>
        <Col>
          <Button variant="success" onClick={props.chamarTelaCadastro}>
            Cadastrar Produto
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
          Deseja realmente excluir este produto?
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
              {colunasSelecionadas.codProduto && <th>Código</th>}
              {colunasSelecionadas.nome && <th>Nome</th>}
              {colunasSelecionadas.preco && <th>Preço</th>}
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {props.dados.map((produto) => {
              return (
                <tr key={produto.codProduto}>
                  {colunasSelecionadas.codProduto && (
                    <td>{produto.codProduto}</td>
                  )}
                  {colunasSelecionadas.nome && <td>{produto.nome}</td>}
                  {colunasSelecionadas.preco && <td>{produto.preco}</td>}
                  <td>
                    <Button
                      className="btn btn-danger"
                      onClick={() => handleExcluirClick(produto)}
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



// import { Container, Row, Col, Button, Table } from "react-bootstrap";
// import { IconeExcluir } from "../../icones/icones";
// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPrint } from "@fortawesome/free-solid-svg-icons";

// export default function TabelaDeProdutos(props) {
//   const [colunasSelecionadas, setColunasSelecionadas] = useState({
//     codProduto: true,
//     nome: true,
//     preco: true,
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
//         <h3>Tabela de Produtos</h3>
//       </Row>
//       <Row>
//         <Col>
//           <Button variant="success" onClick={props.chamarTelaCadastro}>
//             Cadastrar Produto
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
//               {colunasSelecionadas.codProduto && <th>Código</th>}
//               {colunasSelecionadas.nome && <th>Nome</th>}
//               {colunasSelecionadas.preco && <th>Preço</th>}
//               <th>Ações</th>
//             </tr>
//           </thead>
//           <tbody>
//             {props.dados.map((produto) => {
//               return (
//                 <tr key={produto.codProduto}>
//                   {colunasSelecionadas.codProduto && (
//                     <td>{produto.codProduto}</td>
//                   )}
//                   {colunasSelecionadas.nome && <td>{produto.nome}</td>}
//                   {colunasSelecionadas.preco && <td>{produto.preco}</td>}
//                   <td>
//                     <Button className="btn btn-danger">
//                       <IconeExcluir />
//                     </Button>{" "}
//                     {/* <Button className="btn btn-warning">
//                       <IconeEditar />
//                     </Button> */}
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
