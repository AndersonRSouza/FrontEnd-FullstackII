import React from "react";
import { Routes, Route } from "react-router-dom";
import TelaMenu from "./TelasDeCadastro/TelaMenu";
import TelaDeCadastroFornecedor from "./admin/telasDeCadastro/TelaDeCadastroFornecedor";
import TelaDeCadastroHospede from "./atendimento/telasDeCadastro/TelaDeCadastroHospede";
import TelaDeCadastroAcomodacao from "./atendimento/telasDeCadastro/TelaDeCadastroAcomodacao";
import TelaDeCadastroPedidoCompra from "./admin/telasDeCadastro/TelaDeCadastroPedidoCompras";
import TelaDeCadastroPedidoReserva from "./atendimento/telasDeCadastro/TelaDeCadastroPedidoReservas";
import TelaDeCadastroProduto from "./admin/telasDeCadastro/TelaDeCadastroProdutos";
import TelaDeCadastroServico from "./atendimento/telasDeCadastro/TelaDeCadastroServico";
import TelaDeCadastroUsuario from "./admin/telasDeCadastro/TelaDeCadastroUsuario";
import Login from "./login/login";
import Logout from "./logout/logout";
import { AuthProvider } from "./componentes/auth/auth";
// import { RequireAuth } from "./componentes/privateRoute/RequireAuth";
import TelaDeCadastroConsumoProduto from "./atendimento/telasDeCadastro/TelaDeCadastroConsumoProduto";
import TelaDeCadastroConsumoServico from "./atendimento/telasDeCadastro/TelaDeCadastroConsumoServico";

export default function App() {  
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={<TelaMenu />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/cadastroPedidoCompra"
          element={
          <TelaDeCadastroPedidoCompra />
        }
        />
        <Route
          path="/cadastroPedidoReserva"
          element={
          <TelaDeCadastroPedidoReserva />
        }

        />
        <Route
          path="/cadastroUsuario"
          element={
            <TelaDeCadastroUsuario />
          }
        />
        <Route
          path="/cadastroHospede"
          element={
            <TelaDeCadastroHospede />
          }
        />
        <Route
          path="/cadastroAcomodacao"
          element={
            <TelaDeCadastroAcomodacao />
          }
        />
        <Route
          path="/cadastroFornecedor"
          element={
            <TelaDeCadastroFornecedor />
          }
        />
        <Route
          path="/cadastroProduto"
          element={
            <TelaDeCadastroProduto />
          }
        />
        <Route
          path="/cadastroServico"
          element={
            <TelaDeCadastroServico />
          }
        />
        <Route
          path="/consumoProduto"
          element={
            
              <TelaDeCadastroConsumoProduto />
          }
        />
        <Route
          path="/consumoServico"
          element={
            
              <TelaDeCadastroConsumoServico />
            
          }
        />
      </Routes>
    </AuthProvider>
  );
}