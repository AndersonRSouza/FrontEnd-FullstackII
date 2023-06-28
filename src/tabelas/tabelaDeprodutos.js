import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { IconeEditar, IconeExcluir } from "../icones/icones";


export default function TabelaDeProdutos(props) {
    return (
      <Container>
        <Row className="mb-3 border border-success d-flex text-center">
          <h3>Tabela de Produtos</h3>
        </Row>
        <Row>
          <Col>
            <Button variant="success" onClick={props.chamarTelaCadastro}>Cadastrar Produto</Button>
          </Col>
        </Row>
        <Row className="mt-2 p-2 border border-success">
          <Table striped bordered hover variant="success">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Preço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {props.dados.map((produto) => {
                return (
                  <tr key={produto.codProduto}>
                    <td>{produto.codProduto}</td>
                    <td>{produto.nome}</td>
                    <td>{produto.preco}</td>
                    <td>
                      <Button className="btn btn-danger">
                        <IconeExcluir />
                      </Button>
                      {" "}
                      {/* <Button className="btn btn-warning">
                        <IconeEditar />
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
  