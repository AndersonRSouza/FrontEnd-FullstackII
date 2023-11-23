import { Container, Table, Button, Row, Col } from "react-bootstrap";
import { IconeExcluir } from "../../icones/icones"

// import TelaDeCadastroPedidoCompra from "../TelasDeCadastro/TelaDeCadastroPedidoCompras";
// import  from "../TelasDeCadastro/TelaDeCadastroPedidoCompras";

export default function TabelaDePedidoCompra(props) {
  console.log("props>>>", props.dados);

  return (
    <Container>
      <Row className="mb-3 border border-success d-flex text-center">
        <h3>Tabela de Pedido Compras</h3>
      </Row>
      <Row>
        <Col>
          <Button variant="success" onClick={props.chamarTelaCadastro}>
            Cadastrar Pedido Compra
          </Button>
        </Col>
      </Row>
      <Row className="mt-2 p-2 border border-success">
        <Table striped bordered hover variant="sucess">
          <thead>
            <tr>
              <th>Código</th>
              <th>Cód Fornecedor</th>
              <th>Fornecedor</th>
              <th>Data da Compra</th>
              <th>Total Compra</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {props.dados.map((pedidoCompra) => {
              return (
                <tr key={`${pedidoCompra.codPedido} `}>
                  <td>{pedidoCompra.codPedido}</td>
                  <td>{pedidoCompra.fornecedor.codigo}</td>
                  <td>{pedidoCompra.fornecedor.razaoSocial}</td>
                  <td>{pedidoCompra.dataCompra}</td>
                  <td>{pedidoCompra.total}</td>
                  <td>
                    <Button
                      className="btn btn-danger"
                      onClick={() => {
                        props.excluirPedidoCompra(pedidoCompra);
                      }}
                      // onClick={()=>excluirPedidoCompra(pedidoCompra)}
                    >
                      <IconeExcluir />
                    </Button>{" "}
                    {/* <Button
                      className="btn btn-warning"
                      // onClick={()=> editarFornecedor(fornecedor)}
                      // onClick={()=> setFornecedorEmEdicao(fornecedor)}
                      // onClick={()=>console.log(fornecedor)}
                      //   onClick={()=> editarPedidoCompra(pedidoCompra)}
                    >
                      <IconeEditar/>
                    </Button> */}
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
