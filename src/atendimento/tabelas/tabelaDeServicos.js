import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { IconeEditar, IconeExcluir } from "../../icones/icones"


export default function TabelaDeServicos(props) {
    return (
      <Container Container style={{ maxHeight: '100vh', overflowY: 'auto' }}>
        <Row className="mb-3 border border-success d-flex text-center">
          <h3>Tabela de Servicos</h3>
        </Row>
        <Row>
          <Col>
            <Button variant="success" onClick={props.chamarTelaCadastro}>Cadastrar Servico</Button>
          </Col>
        </Row>
        <Row className="mt-2 p-2 border border-success" style={{ overflowX: 'auto' }}>
          <Table striped bordered hover variant="success">
            <thead>
              <tr>
                <th>Código</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {props.dados.map((servico) => {
                return (
                  <tr key={`${servico.codServico}`}>
                    <td>{servico.codServico}</td>
                    <td>{servico.descricao}</td>
                    <td>{servico.valor}</td>
                    <td>
                      <Button className="btn btn-danger"
                      onClick={() => {
                        props.excluirServico(servico);
                        console.log(servico);
                      }}>
                        <IconeExcluir />
                      </Button>
                      <Button
                        className="btn btn-warning"
                        onClick={() => {
                          props.editarServico(servico);
                          console.log(servico);
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