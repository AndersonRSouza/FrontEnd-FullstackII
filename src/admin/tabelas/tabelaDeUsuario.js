import React, { useState } from "react";
import { Container, Table, Button, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { IconeExcluir, IconeEditar } from "../../icones/icones";

export default function TabelaDeUsuarios(props) {
  const [colunasSelecionadas, setColunasSelecionadas] = useState({
    codUsuario: true,
    nome: true,
    perfil: true,
    dataCadastro: true,
    senha: true,
  });

  const [exibirConfirmacao, setExibirConfirmacao] = useState(false);
  const [usuarioParaExcluir, setUsuarioParaExcluir] = useState(null);

  const todasColunasDesmarcadas = Object.values(colunasSelecionadas).every(
    (value) => !value
  );

  const buttonImprimir = () => {
    window.print();
  };

  const handleExcluirClick = (usuario) => {
    setUsuarioParaExcluir(usuario);
    setExibirConfirmacao(true);
  };

  const handleConfirmarExclusao = () => {
    props.excluirUsuario(usuarioParaExcluir);
    setExibirConfirmacao(false);
  };

  const handleCancelarExclusao = () => {
    setUsuarioParaExcluir(null);
    setExibirConfirmacao(false);
  };

  return (
    <Container style={{ maxHeight: "100vh", overflowY: "auto" }}>
      <Row className="mb-3 border border-success d-flex text-center">
        <h3>Tabela de Usuários</h3>
      </Row>
      <Row>
        <Col>
          <Button variant="success" onClick={props.chamarTelaCadastro}>
            Cadastrar Usuário
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
          Deseja realmente excluir este usuário?
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
              {colunasSelecionadas.codUsuario && <th>Código</th>}
              {colunasSelecionadas.nome && <th>Nome</th>}
              {colunasSelecionadas.perfil && <th>Perfil</th>}
              {colunasSelecionadas.dataCadastro && <th>Data do Cadastro</th>}
              {colunasSelecionadas.senha && <th>Senha</th>}
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {props.dados.map((usuario) => {
              return (
                <tr key={`${usuario.codUsuario}`}>
                  {colunasSelecionadas.codUsuario && (
                    <td>{usuario.codUsuario}</td>
                  )}
                  {colunasSelecionadas.nome && <td>{usuario.nome}</td>}
                  {colunasSelecionadas.perfil && <td>{usuario.perfil}</td>}
                  {colunasSelecionadas.dataCadastro && (
                    <td>{usuario.datacadastro}</td>
                  )}
                  {colunasSelecionadas.senha && <td>{usuario.senha}</td>}
                  <td>
                    <Button
                      className="btn btn-danger"
                      onClick={() => handleExcluirClick(usuario)}
                    >
                      <IconeExcluir />
                    </Button>{" "}
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




// import { Container, Table, Button, Row, Col } from "react-bootstrap";
// import { IconeEditar, IconeExcluir } from "../../icones/icones";
// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPrint } from "@fortawesome/free-solid-svg-icons";

// export default function TabelaDeUsuarios(props) {
//   console.log("props>>>", props.dados);
//   const [colunasSelecionadas, setColunasSelecionadas] = useState({
//     codUsuario: true,
//     nome: true,
//     perfil: true,
//     dataCadastro: true,
//     senha: true,
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
//         <h3>Tabela de Usuários</h3>
//       </Row>
//       <Row>
//         <Col>
//           <Button variant="success" onClick={props.chamarTelaCadastro}>
//             Cadastrar Usuário
//           </Button>
//           {"  "}
//           <Button variant="warning" onClick={buttonImprimir}>
//             <FontAwesomeIcon icon={faPrint} />{' '}
//             Imprimir
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
//               {colunasSelecionadas.codUsuario && <th>Código</th>}
//               {colunasSelecionadas.nome && <th>Nome</th>}
//               {colunasSelecionadas.perfil && <th>Perfil</th>}
//               {colunasSelecionadas.dataCadastro && <th>Data do Cadastro</th>}
//               {colunasSelecionadas.senha && <th>Senha</th>}
//               <th>Ações</th>
//             </tr>
//           </thead>
//           <tbody>
//             {props.dados.map((usuario) => {
//               return (
//                 <tr key={`${usuario.codUsuario}`}>
//                   {colunasSelecionadas.codUsuario && (
//                     <td>{usuario.codUsuario}</td>
//                   )}
//                   {colunasSelecionadas.nome && <td>{usuario.nome}</td>}
//                   {colunasSelecionadas.perfil && <td>{usuario.perfil}</td>}
//                   {colunasSelecionadas.dataCadastro && (
//                     <td>{usuario.datacadastro}</td>
//                   )}
//                   {colunasSelecionadas.senha && <td>{usuario.senha}</td>}
//                   <td>
//                     <Button
//                       className="btn btn-danger"
//                       onClick={() => {
//                         props.excluirUsuario(usuario);
//                         console.log(usuario);
//                       }}
//                     >
//                       <IconeExcluir />
//                     </Button>{" "}
//                     <Button
//                       className="btn btn-warning"
//                       onClick={() => {
//                         props.editarUsuario(usuario);
//                         console.log(usuario);
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
