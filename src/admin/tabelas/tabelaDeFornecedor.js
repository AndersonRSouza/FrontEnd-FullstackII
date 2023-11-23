import { Container, Table, Button, Row, Col } from "react-bootstrap";
import { IconeEditar, IconeExcluir } from "../../icones/icones"


export default function TabelaDeFornecedores(props) {
  console.log("props>>>", props.dados);

  return (
    <Container>
      <Row className="mb-3 border border-success d-flex text-center">
        <h3>Tabela de Fornecedores</h3>
      </Row>
      <Row>
        <Col>
          <Button variant="success" onClick={props.chamarTelaCadastro}>
            Cadastrar Fornecedor
          </Button>
        </Col>
      </Row>
      <Row className="mt-2 p-2 border border-success">
        <Table striped bordered hover variant="success">
          <thead>
            <tr>
              <th>Código</th>
              <th>Razão Social</th>
              <th>Nome Fantasia</th>
              <th>Endereço</th>
              <th>Número</th>
              {/* <th>Complemento</th> */}
              <th>Bairro</th>
              <th>Cidade</th>
              <th>UF</th>
              {/* <th>CEP</th> */}
              {/* <th>Pessoa</th> */}
              <th>CNPJ</th>
              {/* <th>Estadual</th> */}
              {/* <th>Municipal</th> */}
              <th>Email</th>
              <th>Celular</th>
              <th>Telefone</th>
              <th>Contato</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {props.dados.map((fornecedor) => {
              return (
                <tr key={`${fornecedor.codigo}`}>
                  <td>{fornecedor.codigo}</td>
                  <td>{fornecedor.razaoSocial}</td>
                  <td>{fornecedor.nomeFantasia}</td>
                  <td>{fornecedor.endereco}</td>
                  <td>{fornecedor.numero}</td>
                  {/* <td>{fornecedor.complemento}</td> */}
                  <td>{fornecedor.bairro}</td>
                  <td>{fornecedor.cidade}</td>
                  <td>{fornecedor.uf}</td>
                  {/* <td>{fornecedor.cep}</td> */}
                  {/* <td>{fornecedor.pessoa}</td> */}
                  <td>{fornecedor.cnpj}</td>
                  {/* <td>{fornecedor.estadual}</td> */}
                  {/* <td>{fornecedor.municipal}</td> */}
                  <td>{fornecedor.email}</td>
                  <td>{fornecedor.celular}</td>
                  <td>{fornecedor.telefone}</td>
                  <td>{fornecedor.contato}</td>
                  <td>
                    <Button
                      className="btn btn-danger"
                      onClick={() => {
                        props.excluirFornecedor(fornecedor);
                        console.log(fornecedor);
                      }}
                    >
                      <IconeExcluir />
                    </Button>
                    <Button
                      className="btn btn-warning"
                      onClick={() => {
                        props.editarFornecedor(fornecedor);
                        console.log(fornecedor);
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
