import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import { Link } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";
import { useAuth } from "../componentes/auth/auth";
import "../estilos/menu.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";
import { useAuth } from "../componentes/auth/auth";
import '../estilos/menu.css'
>>>>>>> 4fde0d9acdb7cac585aba60af7c4bda4dc9fd1e5
import { IconeLogout } from "../icones/icones";

export default function Menu({ isAuthenticated }) {
  const { user } = useAuth();
  const auth = useAuth();
<<<<<<< HEAD
  let permiteAcessar = user.perfil === "Administrador";

=======
>>>>>>> 4fde0d9acdb7cac585aba60af7c4bda4dc9fd1e5
  // const navigate = useNavigate();
  // const redirectPath = "login";
  // console.log(JSON.parse(localStorage.getItem("dadosUsuario")));
  // navigate(redirectPath, { replace: true });
  return (
<<<<<<< HEAD
    <Navbar className="custom-navbar" variant="dark" expand="lg">
=======
    <Navbar
      className="custom-navbar"
      variant="dark"
      expand="lg"
    >
>>>>>>> 4fde0d9acdb7cac585aba60af7c4bda4dc9fd1e5
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Menu</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav fill variant="tabs" defaultActiveKey="/home">
            <LinkContainer to="/cadastroHospede">
              <Nav.Link eventKey="cadastroHospede">Hóspedes</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cadastroAcomodacao">
              <Nav.Link eventKey="cadastroAcomodacao">Acomodações</Nav.Link>
            </LinkContainer>
<<<<<<< HEAD
            {permiteAcessar && (
              <>
                <LinkContainer to="/cadastroFornecedor">
                  <Nav.Link eventKey="cadastroFornecedor">
                    Fornecedores
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
            {permiteAcessar && (
              <>
                <LinkContainer to="/cadastroPedidoCompra">
                  <Nav.Link eventKey="cadastroPedidoCompra">
                    Pedido de Compra
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
            <LinkContainer to="/cadastroPedidoReserva">
              <Nav.Link eventKey="cadastroPedidoReserva">
                Pedido de Reserva
=======
            <LinkContainer to="/cadastroFornecedor">
              <Nav.Link eventKey="cadastroFornecedor">Fornecedores</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cadastroPedidoCompra">
              <Nav.Link eventKey="cadastroPedidoCompra">
                Pedido de Compra
>>>>>>> 4fde0d9acdb7cac585aba60af7c4bda4dc9fd1e5
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cadastroProduto">
              <Nav.Link eventKey="cadastroProduto">Produtos</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cadastroServico">
              <Nav.Link eventKey="cadastroServico">Servicos</Nav.Link>
            </LinkContainer>
<<<<<<< HEAD
            {permiteAcessar && (
              <>
                <LinkContainer to="/cadastroUsuario">
                  <Nav.Link eventKey="cadastroUsuario">Usuários</Nav.Link>
                </LinkContainer>
              </>
            )}
=======
            <LinkContainer to="/cadastroUsuario">
              <Nav.Link eventKey="cadastroUsuario">Usuários</Nav.Link>
            </LinkContainer>
>>>>>>> 4fde0d9acdb7cac585aba60af7c4bda4dc9fd1e5
            <LinkContainer to="/consumoProduto">
              <Nav.Link eventKey="consumoProduto">Consumo Produto</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/consumoServico">
              <Nav.Link eventKey="consumoServico">Consumo Serviços</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            {!auth.user && (
              <LinkContainer to="/login">
                <Navbar.Brand>Login</Navbar.Brand>
              </LinkContainer>
            )}
            <LinkContainer to="/logout">
<<<<<<< HEAD
              <Navbar.Brand>
                <IconeLogout />
                Logout
              </Navbar.Brand>
=======
              <Navbar.Brand><IconeLogout/>Logout</Navbar.Brand>
            </LinkContainer>
            <LinkContainer to="/ajuda">
              <Navbar.Brand>Ajuda</Navbar.Brand>
>>>>>>> 4fde0d9acdb7cac585aba60af7c4bda4dc9fd1e5
            </LinkContainer>
            {/* <LinkContainer to="/ajuda">
              <Navbar.Brand>Ajuda</Navbar.Brand>
            </LinkContainer> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

{
  /* <Navbar
  style={{
    backgroundColor: "#0000CD",
    color: "#fff",
    textAlign: "center",
    padding: "1px",
    marginBottom: "10px",
  }}
  variant="dark"
  expand="lg"
> */
}
//   <Container>
//     <LinkContainer to="/">
//       <Navbar.Brand>Menu</Navbar.Brand>
//     </LinkContainer>
//     <Navbar.Toggle aria-controls="basic-navbar-nav" />
//     <Navbar.Collapse id="basic-navbar-nav">
//       <Nav className="mr-auto">
//         <NavDropdown title="Cadastro" id="basic-nav-dropdown">
//           <LinkContainer to="/cadastroHospede">
//             <NavDropdown.Item>Hóspedes</NavDropdown.Item>
//           </LinkContainer>
//           <LinkContainer to="/cadastroAcomodacao">
//             <NavDropdown.Item>Acomodações</NavDropdown.Item>
//           </LinkContainer>
//           <LinkContainer to="/cadastroFornecedor">
//             <NavDropdown.Item>Fornecedores</NavDropdown.Item>
//           </LinkContainer>
//           <LinkContainer to="/cadastroPedidoCompra">
//             <NavDropdown.Item>Pedido de Compra</NavDropdown.Item>
//           </LinkContainer>
//           <LinkContainer to="/cadastroProduto">
//             <NavDropdown.Item>Produtos</NavDropdown.Item>
//           </LinkContainer>
//           <LinkContainer to="/cadastroServico">
//             <NavDropdown.Item>Servicos</NavDropdown.Item>
//           </LinkContainer>
//           <LinkContainer to="/cadastroUsuario">
//             <NavDropdown.Item>Usuários</NavDropdown.Item>
//           </LinkContainer>
//           <LinkContainer to="/consumoProduto">
//             <NavDropdown.Item>Consumo Produto</NavDropdown.Item>
//           </LinkContainer>
//           <LinkContainer to="/consumoServico">
//             <NavDropdown.Item>Consumo Serviços</NavDropdown.Item>
//           </LinkContainer>
//         </NavDropdown>
//       </Nav>
