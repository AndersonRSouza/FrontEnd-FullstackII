import { Container } from "react-bootstrap";

export default function Cabecalho(props){
    return(
        <Container style={{
            backgroundColor: "#0000CD",
            color: "#fff",
            textAlign: "center",
            padding: "1px",
          }} className="">
            <h3>{props.titulo ||"Sistema Gerencial..."}</h3>
        </Container>

    );
}