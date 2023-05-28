// import FormCadPedidoCompras from './formularios/FormCadPedidoCompras';
// import './App.js';
// import FormCadFornecedor from './formularios/FormCadFornecedor';
// import { Container } from 'react-bootstrap';

// function App() {
//   return (
//     <div className="App">
//       <Container>
//         <FormCadFornecedor/>
//       </Container>
//       <Container>
//         <FormCadPedidoCompras/>
//       </Container>
//     </div>
    
//   );
// }
// export default App;
import { Container } from "react-bootstrap";
import TelaMenu from "./TelasDeCadastro/TelaMenu";
// import Tela404 from "./TelasDeCadastro/Tela404";
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrowserRouter,Route, Routes } from "react-router-dom";
import TelaDeCadastroFornecedor from "./TelasDeCadastro/TelaDeCadastroFornecedor";
// import TelaDeRelatorioFornecedor from "./relatorios/TelaDeRelatorioFornecedor";
// import TelaDeCadastroCamareira from "./TelasDeCadastro/TelaDeCadastroCamareira";
import TelaDeCadastroPedidoCompra from "./TelasDeCadastro/TelaDeCadastroPedidoCompras";
// import TelaDeRelatorioPedidoCompra from "./relatorios/telaDeRelatorioPedidoCompra";
// import BarraBusca from "./componentes/busca/BarraBusca";
// import { useState } from "react";

// const listaFornecedores = [
//   {
//     cnpj:"11.111.111/0001-11",
//     razaoSocial:"DELL"
//   },
//   {
//     cnpj:"22.222.222/0002-22",
//     razaoSocial:"Knup"
//   }
// ]
function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/cadastroPedidoCompra" element={<TelaDeCadastroPedidoCompra/>}/>
          <Route path="/cadastroFornecedor" element={<TelaDeCadastroFornecedor/>}/>
          {/* <Route path="/relatorioFornecedor" element={<TelaDeRelatorioFornecedor/>}/> */}
          {/* <Route path="/relatorioPedidoCompra" element={<TelaDeRelatorioPedidoCompra/>}/> */}
          {/* <Route path="/cadastroCamareira" element={<TelaDeCadastroCamareira/>}/> */}
          <Route path="/" element={<TelaMenu/>}/>
          {/* <Route path="*" element={<Tela404/>}/> */}
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;