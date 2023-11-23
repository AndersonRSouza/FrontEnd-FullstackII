import { Container, Table, Button, Row, Col } from "react-bootstrap";
import { IconeEditar, IconeExcluir } from "../../icones/icones"

export default function TabelaDeAcomodacao(props) {
  console.log("props>>>", props.dados);

  return (
    <Container>
      <Row className="mb-3 border border-success d-flex text-center">
        <h3>Tabela de Acomodação</h3>
      </Row>
      <Row>
        <Col>
          <Button variant="success" onClick={props.chamarTelaCadastro}>
            Cadastrar Acomodação
          </Button>
        </Col>
      </Row>
      <Row className="mt-2 p-2 border border-success">
        <Table striped bordered hover variant="success">
          <thead>
            <tr>
              <th>Código</th>
              <th>Número Acomodação</th>
              <th>Capacidade do Quarto</th>
              <th>Tamanho</th>
              <th>Localização</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {props.dados.map((acomodacao) => {
              return (
                <tr key={`${acomodacao.codigo}`}>
                  <td>{acomodacao.codigo}</td>
                  <td>{acomodacao.num_acom}</td>
                  <td>{acomodacao.capacidade}</td>
                  <td>{acomodacao.tamanho}</td>
                  <td>{acomodacao.localizacao}</td>
                  <td>{acomodacao.descricao}</td>
                  <td>{acomodacao.valor}</td>
                  <td>
                    <Button
                      className="btn btn-danger"
                      onClick={() => {
                        props.excluirAcomodacao(acomodacao);
                        console.log(acomodacao);
                      }}
                    >
                      <IconeExcluir />
                    </Button>
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
