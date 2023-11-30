import { Container, Table, Button, Row, Col } from "react-bootstrap";
import { IconeExcluir } from "../../icones/icones";
// import TelaDeCadastroPedidoCompra from "../TelasDeCadastro/TelaDeCadastroPedidoCompras";
// import  from "../TelasDeCadastro/TelaDeCadastroPedidoCompras";

export default function TabelaDeConsumoProduto(props) {
  console.log("props>>>", props.dados);

  return (
    <Container style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <Row className="mb-3 border border-success d-flex text-center">
        <h3>Tabela de Consumo de Produto</h3>
      </Row>
      <Row>
        <Col>
          <Button variant="success" onClick={props.chamarTelaCadastro}>
            Cadastrar Compra de Produto dos Hóspedes
          </Button>
        </Col>
      </Row>
      <Row className="mt-2 p-2 border border-success" style={{ overflowX: 'auto' }}>
        <Table striped bordered hover variant="sucess">
          <thead>
            <tr>
              <th>Código</th>
              <th>Cód Hospode</th>
              <th>Hospede</th>
              <th>Data da Compra</th>
              <th>Preço</th>
              <th>Total Compra</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {props.dados.map((consumoProduto) => {
              return (
                <tr key={`${consumoProduto.codConsumoProduto} `}>
                  <td>{consumoProduto.codConsumoProduto}</td>
                  <td>{consumoProduto.hospede.cod_hosp}</td>
                  <td>{consumoProduto.hospede.nome}</td>
                  <td>{consumoProduto.dataCompra}</td>
                  <td>{consumoProduto.preco}</td>
                  <td>{consumoProduto.total}</td>
                  <td>
                    <Button
                      className="btn btn-danger"
                      onClick={() => {
                        props.excluirConsumoProduto(consumoProduto);
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
