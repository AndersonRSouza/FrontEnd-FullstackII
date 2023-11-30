import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../componentes/auth/auth";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

export default function Login() {
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";

  const handleLogin = async () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await fetch("http://localhost:4000/autenticar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const userDetails = await response.json();

        // Faça algo com os detalhes do usuário, por exemplo, armazenar no contexto de autenticação
        auth.login(userDetails);

        // Navegue para a rota de redirecionamento
        navigate(redirectPath, { replace: true });
      } else {
        // Lidar com falha na autenticação (credenciais inválidas)
        console.error("Falha na autenticação:", response.statusText);
      }
    } catch (error) {
      // Lidar com erros de rede ou outros erros
      console.error("Erro ao fazer login:", error.message);
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <Row>
        <Col>
          <Card
            style={{
              boxShadow: "2px 5px 7px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#66CDAA",
              maxWidth: "400px",
            }}
            className="mx-auto"
          >
            <Card.Body>
              <Form style={{ maxWidth: "300px", margin: "0 auto" }}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label className="font-weight-bold">Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Sua Matricula"
                    ref={usernameRef}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="font-weight-bold">Senha</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Sua Senha"
                    ref={passwordRef}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  style={{ backgroundColor: "#0000FF" }}
                  onClick={handleLogin}
                  block
                >
                  <span className="font-weight-bold">Login</span>
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

// import { useRef, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../componentes/auth/auth";
// // import "bootstrap/dist/css/bootstrap.min.css";
// import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

// export default function Login() {
//   const [user, setUser] = useState("");
//   const senha = useRef("");

//   const navigate = useNavigate();
//   const auth = useAuth();
//   const location = useLocation();
//   const redirectPath = location.state?.path || "/";

//   const handleLogin = () => {
//     auth.login(user);
//     navigate(redirectPath, { replace: true });
//   };

//   return (
//     <Container className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
//   <Row>
//     <Col>
//       <Card style={{ boxShadow: "2px 5px 7px rgba(0, 0, 0, 0.1)", backgroundColor: "#66CDAA", maxWidth: "400px" }} className="mx-auto">
//         <Card.Body>
//           <Form style={{ maxWidth: "300px", margin: "0 auto" }}>
//             <Form.Group className="mb-3" controlId="formBasicUsername">
//               <Form.Label className="font-weight-bold">Usuario</Form.Label>
//               <Form.Control type="text" placeholder="Sua Matricula" onChange={(e) => setUser(e.target.value)}/>
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formBasicPassword">
//               <Form.Label className="font-weight-bold">Senha</Form.Label>
//               <Form.Control type="password" placeholder="Sua Senha" />
//             </Form.Group>

//             <Button variant="primary" type="submit" style={{ backgroundColor: "#0000FF" }} onClick={handleLogin} block>
//               <span className="font-weight-bold">Login</span>
//             </Button>
//           </Form>
//         </Card.Body>
//       </Card>
//     </Col>
//   </Row>
// </Container>
//   );
// }
// <div className="container">
//   <div className="row justify-content-center">
//     <div className="col-xl-10 col-lg-12 col-md-9">
//       <div className="card o-hidden border-0 shadow-lg my-5">
//         <div className="card-body p-0">
//           <div className="row">
//             <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
//             <div className="col-lg-6">
//               <div className="p-5">
//                 <div className="text-center">
//                   <h1 className="h4 text-gray-900 mb-4">Bem vindo!</h1>
//                 </div>
//                 <form className="user">
//                   <div className="form-group">
//                     <input
//                       type="text"
//                       className="form-control form-control-user"
//                       id="exampleInputEmail"
//                       aria-describedby="emailHelp"
//                       onChange={(e) => setUser(e.target.value)}
//                       placeholder="Insira seu usuario..."
//                     />
//                   </div>
//                   <div className="form-group">
//                     <input
//                       ref={senha}
//                       type="password"
//                       className="form-control form-control-user"
//                       id="exampleInputPassword"
//                       placeholder="Senha"
//                     />
//                   </div>
//                   <button
//                     type="button"
//                     onClick={handleLogin}
//                     className="btn btn-primary btn-user btn-block"
//                   >Login</button>
//                   <hr />
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
