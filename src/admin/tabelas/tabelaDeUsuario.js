import { Container, Table, Button, Row, Col } from "react-bootstrap";
import { IconeEditar, IconeExcluir } from "../../icones/icones"


export default function TabelaDeUsuarios(props) {
  console.log("props>>>", props.dados);

  return (
    <Container Container style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <Row className="mb-3 border border-success d-flex text-center">
        <h3>Tabela de Usuários</h3>
      </Row>
      <Row>
        <Col>
          <Button variant="success" onClick={props.chamarTelaCadastro}>
            Cadastrar Usuário
          </Button>
        </Col>
      </Row>
      <Row className="mt-2 p-2 border border-success" style={{ overflowX: 'auto' }}>
        <Table striped bordered hover variant="success">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>Perfil</th>
              <th>Data do Cadastro</th>
              <th>Senha</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {props.dados.map((usuario) => {
              return (
                <tr key={`${usuario.codUsuario}`}>
                  <td>{usuario.codUsuario}</td>
                  <td>{usuario.nome}</td>
                  <td>{usuario.perfil}</td>
                  <td>{usuario.datacadastro}</td>
                  <td>{usuario.senha}</td>
                  <td>
                    <Button
                      className="btn btn-danger"
                      onClick={() => {
                        props.excluirUsuario(usuario);
                        console.log(usuario);
                      }}
                    >
                      <IconeExcluir />
                    </Button>
                    <Button
                      className="btn btn-warning"
                      onClick={() => {
                        props.editarUsuario(usuario);
                        console.log(usuario);
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