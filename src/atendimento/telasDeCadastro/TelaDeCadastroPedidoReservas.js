// import FormCadFornecedor from "../formularios/FormCadFornecedor"
// import FormCadPedidoCompras from "../formularios/FormCadPedidoCompras";
import FormCadPedidoReservas from "../formularios/FormCadPedidoReservas";
import TabelaDePedidoReserva from "../tabelas/tabelaDePedidoReserva";
import { useState, useEffect } from "react";
// import Pagina from "../templates/Pagina";
// import Pagina from "../templates/Pagina";
import Pagina from "../../templates/Pagina";
import { Spinner } from "react-bootstrap";


export default function TelaDeCadastroPedidoReserva(props) {
  console.log("teste tela 2x")
  const localRecursos = "http://localhost:4000/pedidoreservas";
  const [exibirTabela, setExibirTabela] = useState(true);
  const [listaPedidoReservas, setListaPedidoReservas] = useState([]);
  const [erro, setErro] = useState(null);
  const [processado, setProcessado] = useState(false);

  // function apagarPedidoCompra(pedidoCompra){
  //   fetch(localRecursos,{
  //     method:"DELETE",
  //     headers: {'Content-Type':'application/json'},
  //     body: JSON.stringify(pedidoCompra)
  //   }).then((resposta) => {
  //     return resposta.json()
  //   }).then((retorno) =>{
  //     if (retorno.resultado){
  //       // buscarPedidoCompras();
  //     }
  //     else {
  //       alert("Não foi possivel excluir o produto");
  //     }
  //   });
  // }

  function alternarTelas() {
    setExibirTabela(!exibirTabela);
  }
  // const [status, setStatus] = useState(STATUS.ocioso);

  function apagarPedidoReserva(pedidoReserva) {

    fetch("http://localhost:4000/pedidoreservas", {
      method: "DELETE",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        codPedido: pedidoReserva.codPedido
      }),
    }).then(
      (dados) => {   
        console.log("dados", dados)      
        buscarPedidoReservas();
      },
      (error) => {
       
      }
    );
  }

  function buscarPedidoReservas() {
    console.log("buscar")
    fetch(localRecursos, { method: "GET" })
      .then((resposta) => {       
        if (resposta.ok) {
          return resposta.json();
        }
      })
      .then(
        (dados) => {         
          setProcessado(true);
          setListaPedidoReservas(() => [
            // ...prevListaPedidoCompras,
            ...dados,
          ]);
          // setStatus(STATUS.sucesso);
        },
        (error) => {
          setProcessado(true);
          setErro(error);
        }
      );
    // .catch((erro) => {
    //   // setStatus(STATUS.erro);
    // });
  }

  useEffect(() => {
    console.log("useeffect")
    buscarPedidoReservas();
  }, []);
  // console.log(listaPedidoCompras)

  if (erro) {
    return (
      <div>
        <p>Erro ao obter as acomodações do Backend : {erro.message}</p>
      </div>
    );
  } else if (!processado) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">
          Carregando Pedidos de Reservas...
        </span>
      </Spinner>
    );
  } else {
    if (exibirTabela) {
      return (
        <Pagina>
          <TabelaDePedidoReserva
            dados={listaPedidoReservas}
            chamarTelaCadastro={alternarTelas}
            excluirPedidoReserva={apagarPedidoReserva}
          />
        </Pagina>
      );
    } else {
      return (
        <Pagina>
          <FormCadPedidoReservas chamarTabelaPedidos={alternarTelas} />
        </Pagina>
      );
    }
  }
}
