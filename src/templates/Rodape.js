import { Container } from "react-bootstrap";

export default function Rodape(props) {
  return (
    <div
      style={{
        position: "sticky",
        left: "0",
        bottom: "0",
        width: "100%",
        backgroundColor: "#0000CD",
        color: "#fff",
        textAlign: "center",
        padding: "1px",
        marginTop: "10px",
      }}
    >
      <h5>{props.texto || "Sistema AEH - Hotel Recanto Feliz"}</h5>
    </div>
  );
}

