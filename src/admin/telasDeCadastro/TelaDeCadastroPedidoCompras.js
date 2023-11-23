// import FormCadFornecedor from "../formularios/FormCadFornecedor"
// import FormCadPedidoCompras from "../formularios/FormCadPedidoCompras";
import FormCadPedidoCompras from "../formularios/FormCadPedidoCompras";
import TabelaDePedidoCompra from "../tabelas/tabelaDePedidoCompra";
import { useState, useEffect } from "react";
// import Pagina from "../templates/Pagina";
// import Pagina from "../templates/Pagina";
import Pagina from "../../templates/Pagina";
import { Spinner } from "react-bootstrap";


export default function TelaDeCadastroPedidoCompra(props) {
  console.log("teste tela 2x")
  const localRecursos = "http://localhost:4000/pedidocompras";
  const [exibirTabela, setExibirTabela] = useState(true);
  const [listaPedidoCompras, setListaPedidoCompras] = useState([]);
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

  function apagarPedidoCompra(pedidoCompra) {

    fetch("http://localhost:4000/pedidocompras", {
      method: "DELETE",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        codPedido: pedidoCompra.codPedido
      }),
    }).then(
      (dados) => {   
        console.log("dados", dados)      
        buscarPedidoCompras();
      },
      (error) => {
       
      }
    );
  }

  function buscarPedidoCompras() {
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
          setListaPedidoCompras(() => [
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
    buscarPedidoCompras();
  }, []);
  // console.log(listaPedidoCompras)

  if (erro) {
    return (
      <div>
        <p>Erro ao obter os produtos do Backend : {erro.message}</p>
      </div>
    );
  } else if (!processado) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">
          Carregando Pedidos de Compras...
        </span>
      </Spinner>
    );
  } else {
    if (exibirTabela) {
      return (
        <Pagina>
          <TabelaDePedidoCompra
            dados={listaPedidoCompras}
            chamarTelaCadastro={alternarTelas}
            excluirPedidoCompra={apagarPedidoCompra}
          />
        </Pagina>
      );
    } else {
      return (
        <Pagina>
          <FormCadPedidoCompras chamarTabelaPedidos={alternarTelas} />
        </Pagina>
      );
    }
  }
}
