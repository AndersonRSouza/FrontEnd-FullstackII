import { Container } from "react-bootstrap";

export default function Cabecalho(props){
    return(
        <Container className="bg-success text-light border d-flex justify-content-center align-content-center">
            <h3>{props.titulo ||"Sistema Gerencial..."}</h3>
        </Container>

    );
}