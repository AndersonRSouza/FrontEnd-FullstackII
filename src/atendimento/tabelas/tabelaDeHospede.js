import React, { useState } from "react";
import { Container, Table, Button, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { IconeExcluir, IconeEditar } from "../../icones/icones";

export default function TabelaDeHospede(props) {
  const [colunasSelecionadas, setColunasSelecionadas] = useState({
    cod_hosp: true,
    nome: true,
    cpf: true,
    endereco: true,
    rg: true,
    telefone: true,
    email: true,
    datanasc: true,
    sexo: true,
    cep: true,
  });

  const [exibirConfirmacao, setExibirConfirmacao] = useState(false);
  const [hospedeParaExcluir, setHospedeParaExcluir] = useState(null);

  const todasColunasDesmarcadas = Object.values(colunasSelecionadas).every(
    (value) => !value
  );

  const buttonImprimir = () => {
    window.print();
  };

  const handleExcluirClick = (hospede) => {
    setHospedeParaExcluir(hospede);
    setExibirConfirmacao(true);
  };

  const handleConfirmarExclusao = () => {
    props.excluirHospede(hospedeParaExcluir);
    setExibirConfirmacao(false);
  };

  const handleCancelarExclusao = () => {
    setHospedeParaExcluir(null);
    setExibirConfirmacao(false);
  };

  return (
    <Container style={{ maxHeight: "100vh", overflowY: "auto" }}>
      <Row className="mb-3 border border-success d-flex text-center">
        <h3>Tabela de Hóspedes</h3>
      </Row>
      <Row>
        <Col>
          <Button variant="success" onClick={props.chamarTelaCadastro}>
            Cadastrar Hóspede
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
          Deseja realmente excluir este hóspede?
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
              {colunasSelecionadas.cod_hosp && <th>Código</th>}
              {colunasSelecionadas.nome && <th>Nome Completo</th>}
              {colunasSelecionadas.cpf && <th>CPF</th>}
              {colunasSelecionadas.endereco && <th>Endereço</th>}
              {colunasSelecionadas.rg && <th>RG</th>}
              {colunasSelecionadas.telefone && <th>Telefone</th>}
              {colunasSelecionadas.email && <th>E-mail</th>}
              {colunasSelecionadas.datanasc && <th>Data de Nascimento</th>}
              {colunasSelecionadas.sexo && <th>Sexo</th>}
              {colunasSelecionadas.cep && <th>Cep</th>}
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {props.dados.map((hospede) => {
              return (
                <tr key={`${hospede.cod_hosp}`}>
                  {colunasSelecionadas.cod_hosp && <td>{hospede.cod_hosp}</td>}
                  {colunasSelecionadas.nome && <td>{hospede.nome}</td>}
                  {colunasSelecionadas.cpf && <td>{hospede.cpf}</td>}
                  {colunasSelecionadas.endereco && <td>{hospede.endereco}</td>}
                  {colunasSelecionadas.rg && <td>{hospede.rg}</td>}
                  {colunasSelecionadas.telefone && <td>{hospede.telefone}</td>}
                  {colunasSelecionadas.email && <td>{hospede.email}</td>}
                  {colunasSelecionadas.datanasc && <td>{hospede.datanasc}</td>}
                  {colunasSelecionadas.sexo && <td>{hospede.sexo}</td>}
                  {colunasSelecionadas.cep && <td>{hospede.cep}</td>}
                  <td>
                    <Button
                      className="btn btn-danger"
                      onClick={() => handleExcluirClick(hospede)}
                    >
                      <IconeExcluir />
                    </Button>{" "}
                    <Button
                      className="btn btn-warning"
                      onClick={() => {
                        props.editarHospede(hospede);
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



// import { Container, Table, Button, Row, Col } from "react-bootstrap";
// import { IconeEditar, IconeExcluir } from "../../icones/icones";
// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPrint } from "@fortawesome/free-solid-svg-icons";

// export default function TabelaDeHospede(props) {
//   console.log("props>>>", props.dados);
//   const [colunasSelecionadas, setColunasSelecionadas] = useState({
//     cod_hosp: true,
//     nome: true,
//     cpf: true,
//     endereco: true,
//     rg: true,
//     telefone: true,
//     email: true,
//     datanasc: true,
//     sexo: true,
//     cep: true,
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
//         <h3>Tabela de Hóspedes</h3>
//       </Row>
//       <Row>
//         <Col>
//           <Button variant="success" onClick={props.chamarTelaCadastro}>
//             Cadastrar Hóspede
//           </Button>
//           {"  "}
//           <Button variant="warning" onClick={buttonImprimir}>
//             <FontAwesomeIcon icon={faPrint} /> Imprimir
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
//               {colunasSelecionadas.cod_hosp && <th>Código</th>}
//               {colunasSelecionadas.nome && <th>Nome Completo</th>}
//               {colunasSelecionadas.cpf && <th>CPF</th>}
//               {colunasSelecionadas.endereco && <th>Endereço</th>}
//               {colunasSelecionadas.rg && <th>RG</th>}
//               {colunasSelecionadas.telefone && <th>Telefone</th>}
//               {colunasSelecionadas.email && <th>E-mail</th>}
//               {colunasSelecionadas.datanasc && <th>Data de Nascimento</th>}
//               {colunasSelecionadas.sexo && <th>Sexo</th>}
//               {colunasSelecionadas.cep && <th>Cep</th>}
//               <th>Ações</th>
//             </tr>
//           </thead>
//           <tbody>
//             {props.dados.map((hospede) => {
//               return (
//                 <tr key={`${hospede.cod_hosp}`}>
//                   {colunasSelecionadas.cod_hosp && <td>{hospede.cod_hosp}</td>}
//                   {colunasSelecionadas.nome && <td>{hospede.nome}</td>}
//                   {colunasSelecionadas.cpf && <td>{hospede.cpf}</td>}
//                   {colunasSelecionadas.endereco && <td>{hospede.endereco}</td>}
//                   {colunasSelecionadas.rg && <td>{hospede.rg}</td>}
//                   {colunasSelecionadas.telefone && <td>{hospede.telefone}</td>}
//                   {colunasSelecionadas.email && <td>{hospede.email}</td>}
//                   {colunasSelecionadas.datanasc && <td>{hospede.datanasc}</td>}
//                   {colunasSelecionadas.sexo && <td>{hospede.sexo}</td>}
//                   {colunasSelecionadas.cep && <td>{hospede.cep}</td>}
//                   <td>
//                     <Button
//                       className="btn btn-danger"
//                       onClick={() => {
//                         props.excluirHospede(hospede);
//                       }}
//                     >
//                       <IconeExcluir />
//                     </Button>{" "}
//                     <Button
//                       className="btn btn-warning"
//                       onClick={() => {
//                         props.editarHospede(hospede);
//                       }}
//                     >
//                       <IconeEditar />
//                     </Button>
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
