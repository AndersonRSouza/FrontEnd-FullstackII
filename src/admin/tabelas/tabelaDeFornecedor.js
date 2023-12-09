import { Container, Table, Button, Row, Col, Card } from "react-bootstrap";
import { IconeEditar, IconeExcluir } from "../../icones/icones";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

export default function TabelaDeFornecedores(props) {
  console.log("props>>>", props.dados);
  const [colunasSelecionadas, setColunasSelecionadas] = useState({
    codigo: true,
    razaoSocial: true,
    nomeFantasia: true,
    endereco: true,
    numero: true,
    complemento: true,
    bairro: true,
    cidade: true,
    uf: true,
    cep: true,
    pessoa: true,
    cnpj: true,
    estadual: true,
    municipal: true,
    email: true,
    celular: true,
    telefone: true,
    contato: true,
  });
  const todasColunasDesmarcadas = Object.values(colunasSelecionadas).every(
    (value) => !value
  );
  const [exibirConfirmacao, setExibirConfirmacao] = useState(false);
  const [fornecedorParaExcluir, setFornecedorParaExcluir] = useState(null);
  const handleExcluirClick = (fornecedor) => {
    setFornecedorParaExcluir(fornecedor);
    setExibirConfirmacao(true);
  };

  const handleConfirmarExclusao = () => {
    props.excluirFornecedor(fornecedorParaExcluir);
    setExibirConfirmacao(false);
  };

  const handleCancelarExclusao = () => {
    setFornecedorParaExcluir(null);
    setExibirConfirmacao(false);
  };
  const buttonImprimir = () => {
    window.print();
  };

  return (
    <Container Container style={{ maxHeight: "100vh", overflowY: "auto" }}>
      <Row className="mb-3 border border-success d-flex text-center">
        <h3>Tabela de Fornecedores</h3>
      </Row>
      <Row>
        <Col>
          <Button variant="success" onClick={props.chamarTelaCadastro}>
            Cadastrar Fornecedor
          </Button>
          {"  "}
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
        className={`mt-3 p-3 border border-danger ${
          exibirConfirmacao ? "" : "d-none"
        }`}
      >
        <Card.Title>Confirmar exclusão</Card.Title>
        <Card.Body>
          Deseja realmente excluir este fornecedor?
          {' '}<Button
            className="ml-2"
            variant="danger"
            onClick={handleConfirmarExclusao}
          >
            Sim
          </Button>{' '}
          <Button
            className="ml-2"
            variant="secondary"
            onClick={handleCancelarExclusao}
          >
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
              {colunasSelecionadas.razaoSocial && <th>Razão Social</th>}
              {colunasSelecionadas.nomeFantasia && <th>Nome Fantasia</th>}
              {colunasSelecionadas.endereco && <th>Endereço</th>}
              {colunasSelecionadas.numero && <th>Número</th>}
              {colunasSelecionadas.complemento && <th>Complemento</th>}
              {colunasSelecionadas.bairro && <th>Bairro</th>}
              {colunasSelecionadas.cidade && <th>Cidade</th>}
              {colunasSelecionadas.uf && <th>UF</th>}
              {colunasSelecionadas.cep && <th>CEP</th>}
              {colunasSelecionadas.pessoa && <th>Pessoa</th>}
              {colunasSelecionadas.cnpj && <th>CNPJ</th>}
              {colunasSelecionadas.estadual && <th>Estadual</th>}
              {colunasSelecionadas.municipal && <th>Municipal</th>}
              {colunasSelecionadas.email && <th>Email</th>}
              {colunasSelecionadas.celular && <th>Celular</th>}
              {colunasSelecionadas.telefone && <th>Telefone</th>}
              {colunasSelecionadas.contato && <th>Contato</th>}
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {props.dados.map((fornecedor) => {
              return (
                <tr key={`${fornecedor.codigo}`}>
                  {colunasSelecionadas.codigo && <td>{fornecedor.codigo}</td>}
                  {colunasSelecionadas.razaoSocial && (
                    <td>{fornecedor.razaoSocial}</td>
                  )}
                  {colunasSelecionadas.nomeFantasia && (
                    <td>{fornecedor.nomeFantasia}</td>
                  )}
                  {colunasSelecionadas.endereco && (
                    <td>{fornecedor.endereco}</td>
                  )}
                  {colunasSelecionadas.numero && <td>{fornecedor.numero}</td>}
                  {colunasSelecionadas.complemento && (
                    <td>{fornecedor.complemento}</td>
                  )}
                  {colunasSelecionadas.bairro && <td>{fornecedor.bairro}</td>}
                  {colunasSelecionadas.cidade && <td>{fornecedor.cidade}</td>}
                  {colunasSelecionadas.uf && <td>{fornecedor.uf}</td>}
                  {colunasSelecionadas.cep && <td>{fornecedor.cep}</td>}
                  {colunasSelecionadas.pessoa && <td>{fornecedor.pessoa}</td>}
                  {colunasSelecionadas.cnpj && <td>{fornecedor.cnpj}</td>}
                  {colunasSelecionadas.estadual && (
                    <td>{fornecedor.estadual}</td>
                  )}
                  {colunasSelecionadas.municipal && (
                    <td>{fornecedor.municipal}</td>
                  )}
                  {colunasSelecionadas.email && <td>{fornecedor.email}</td>}
                  {colunasSelecionadas.celular && <td>{fornecedor.celular}</td>}
                  {colunasSelecionadas.telefone && (
                    <td>{fornecedor.telefone}</td>
                  )}
                  {colunasSelecionadas.contato && <td>{fornecedor.contato}</td>}
                  <td>
                    <Button
                      className="btn btn-danger"
                      onClick={() => handleExcluirClick(fornecedor)}
                    >
                      <IconeExcluir />
                    </Button>
                    {/* <Button
                      className="btn btn-danger"
                      onClick={() => {
                        props.excluirFornecedor(fornecedor);
                        console.log(fornecedor);
                      }}
                    >
                      <IconeExcluir />
                    </Button> */}
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
