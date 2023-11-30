import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
// import { Link } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";
import { useAuth } from "../componentes/auth/auth";

export default function Menu({ isAuthenticated }) {
  const auth = useAuth();
  return (
    <Navbar style={{
      backgroundColor: "#0000CD",
      color: "#fff",
      textAlign: "center",
      padding: "1px",
      marginBottom: "10px"
    }}  variant="dark" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Menu</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Cadastro" id="basic-nav-dropdown">
              <LinkContainer to="/cadastroHospede">
                <NavDropdown.Item>Hóspedes</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/cadastroAcomodacao">
                <NavDropdown.Item>Acomodações</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/cadastroFornecedor">
                <NavDropdown.Item>Fornecedores</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/cadastroPedidoCompra">
                <NavDropdown.Item>Pedido de Compra</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/cadastroProduto">
                <NavDropdown.Item>Produtos</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/cadastroServico">
                <NavDropdown.Item>Servicos</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/cadastroUsuario">
                <NavDropdown.Item>Usuários</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/consumoProduto"><NavDropdown.Item>Consumo Produto</NavDropdown.Item></LinkContainer>
              <LinkContainer to="/consumoServico"><NavDropdown.Item>Consumo Serviços</NavDropdown.Item></LinkContainer>
              {/* ... Outros itens do menu ... */}
              {/* {!auth.user && <LinkContainer to="/login">Login</LinkContainer>} */}
            </NavDropdown>
            {!auth.user && (
              <LinkContainer to="/login">
                <Navbar.Brand>Login</Navbar.Brand>
              </LinkContainer>
            )}
            <LinkContainer to="/logout">
              <Navbar.Brand>Logout</Navbar.Brand>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
