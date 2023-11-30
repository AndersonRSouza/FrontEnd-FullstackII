import React from "react";
import { Routes, Route } from "react-router-dom";
import TelaMenu from "./TelasDeCadastro/TelaMenu";
import TelaDeCadastroFornecedor from "./admin/telasDeCadastro/TelaDeCadastroFornecedor";
import TelaDeCadastroHospede from "./atendimento/telasDeCadastro/TelaDeCadastroHospede";
import TelaDeCadastroAcomodacao from "./atendimento/telasDeCadastro/TelaDeCadastroAcomodacao";
import TelaDeCadastroPedidoCompra from "./admin/telasDeCadastro/TelaDeCadastroPedidoCompras";
import TelaDeCadastroProduto from "./admin/telasDeCadastro/TelaDeCadastroProdutos";
import TelaDeCadastroServico from "./atendimento/telasDeCadastro/TelaDeCadastroServico";
import TelaDeCadastroUsuario from "./admin/telasDeCadastro/TelaDeCadastroUsuario";
import Login from "./login/login";
import { AuthProvider, useAuth } from "./componentes/auth/auth";
import { Logout } from "./logout/logout";
// import { RequireAuth } from "./componentes/privateRoute/RequireAuth";
import { PrivateRoute } from "./componentes/privateRoute/PrivateRoute";
import TelaDeCadastroConsumoProduto from "./atendimento/telasDeCadastro/TelaDeCadastroConsumoProduto";
import TelaDeCadastroConsumoServico from "./atendimento/telasDeCadastro/TelaDeCadastroConsumoServico";

export default function App() {
  const auth = useAuth();
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<TelaMenu />} />
        <Route path="/login" element={<Login />} />
        {/* <Route
          path="/logout"
          element={
            <RequireAuth>
              <Logout />
            </RequireAuth>
          }
        /> */}
        <Route
          path="/cadastroPedidoCompra"
          element={<TelaDeCadastroPedidoCompra />}
        />
        <Route
          path="/cadastroUsuario"
          element={<PrivateRoute element={<TelaDeCadastroUsuario />} allowedProfiles={['administrador']}/>}
        />
        <Route path="/cadastroHospede" element={<TelaDeCadastroHospede />} />
        <Route
          path="/cadastroAcomodacao"
          element={<TelaDeCadastroAcomodacao />}
        />
        <Route
          path="/cadastroFornecedor"
          element={<TelaDeCadastroFornecedor />}
        />
        <Route path="/cadastroProduto" element={<TelaDeCadastroProduto />} />
        <Route path="/cadastroServico" element={<TelaDeCadastroServico />} />
        <Route path="/consumoProduto" element={<TelaDeCadastroConsumoProduto/>}/>
        <Route path="/consumoServico" element={<TelaDeCadastroConsumoServico/>}/>
      </Routes>
    </AuthProvider>
  );
}
