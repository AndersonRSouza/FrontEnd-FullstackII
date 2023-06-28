import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
// import { Link } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";

export default function Menu(props) {
  return (
    <Navbar bg="success" variant="dark" expand="lg">
      <Container>
      <LinkContainer to="/"><Navbar.Brand>Menu</Navbar.Brand></LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="">
            <NavDropdown title="Cadastro" id="basic-nav-dropdown">
              <LinkContainer to="/cadastroFornecedor"><NavDropdown.Item>Fornecedores</NavDropdown.Item></LinkContainer>
              <LinkContainer to="/cadastroPedidoCompra"><NavDropdown.Item>Pedido de Compra</NavDropdown.Item></LinkContainer>
              <LinkContainer to="/cadastroProduto"><NavDropdown.Item>Produtos</NavDropdown.Item></LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
