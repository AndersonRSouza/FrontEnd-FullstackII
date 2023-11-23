import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
// import { Link } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";

export default function Menu({ isAuthenticated }) {
  return (
    <Navbar bg="success" variant="dark" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Menu</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {isAuthenticated ? (
              // Links para usuários autenticados
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
                {/* ... Outros itens do menu ... */}
              </NavDropdown>
            ) : (
              // Links para usuários não autenticados
              <LinkContainer to="/auth">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
