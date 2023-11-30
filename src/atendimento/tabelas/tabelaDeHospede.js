import { Container, Table, Button, Row, Col } from "react-bootstrap";
import { IconeEditar, IconeExcluir } from "../../icones/icones";

export default function TabelaDeHospede(props) {
  console.log("props>>>", props.dados);

  return (
    <Container style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <Row className="mb-3 border border-success d-flex text-center">
        <h3>Tabela de Hóspedes</h3>
      </Row>
      <Row>
        <Col>
          <Button variant="success" onClick={props.chamarTelaCadastro}>
            Cadastrar Hóspede
          </Button>
        </Col>
      </Row>
      <Row className="mt-2 p-2 border border-success" style={{ overflowX: 'auto' }}>
        <Table striped bordered hover variant="success">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome Completo</th>
              <th>CPF</th>
              <th>Endereço</th>
              <th>RG</th>
              <th>Telefone</th>
              <th>E-mail</th>
              <th>Data de Nascimento</th>
              <th>Sexo</th>
              <th>Cep</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {props.dados.map((hospede) => {
              return (
                <tr key={`${hospede.cod_hosp}`}>
                  <td>{hospede.cod_hosp}</td>
                  <td>{hospede.nome}</td>
                  <td>{hospede.cpf}</td>
                  <td>{hospede.endereco}</td>
                  <td>{hospede.rg}</td>
                  <td>{hospede.telefone}</td>
                  <td>{hospede.email}</td>
                  <td>{hospede.datanasc}</td>
                  <td>{hospede.sexo}</td>
                  <td>{hospede.cep}</td>
                  <td>
                    <Button
                      className="btn btn-danger"
                      onClick={() => {
                        props.excluirHospede(hospede);
                        console.log(hospede);
                      }}
                    >
                      <IconeExcluir />
                    </Button>
                    <Button
                      className="btn btn-warning"
                      onClick={() => {
                        props.editarHospede(hospede);
                        console.log(hospede);
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
