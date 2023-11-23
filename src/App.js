import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import TelaMenu from './TelasDeCadastro/TelaMenu';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TelaDeCadastroFornecedor from './admin/telasDeCadastro/TelaDeCadastroFornecedor';
import TelaDeCadastroHospede from './atendimento/telasDeCadastro/TelaDeCadastroHospede';
import TelaDeCadastroAcomodacao from './atendimento/telasDeCadastro/TelaDeCadastroAcomodacao';
import TelaDeCadastroPedidoCompra from './admin/telasDeCadastro/TelaDeCadastroPedidoCompras';
import TelaDeCadastroProduto from './admin/telasDeCadastro/TelaDeCadastroProdutos';
import TelaDeCadastroServico from './atendimento/telasDeCadastro/TelaDeCadastroServico';
import AuthComponent from './componentes/auth/AuthComponent';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Container>
      <BrowserRouter>
        <Routes>
          {/* Rota para o componente de autenticação */}
          <Route
            path="/auth/*"
            element={<AuthComponent isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}
          />

          {/* Rotas protegidas */}
          {isAuthenticated ? (
            <>
              <Route path="/cadastroPedidoCompra" element={<TelaDeCadastroPedidoCompra />} />
              <Route path="/cadastroHospede" element={<TelaDeCadastroHospede />} />
              <Route path="/cadastroAcomodacao" element={<TelaDeCadastroAcomodacao />} />
              <Route path="/cadastroFornecedor" element={<TelaDeCadastroFornecedor />} />
              <Route path="/cadastroProduto" element={<TelaDeCadastroProduto />} />
              <Route path="/cadastroServico" element={<TelaDeCadastroServico />} />
              <Route path="/" element={<TelaMenu />} />
            </>
          ) : (
            // Redirecionar para a página de autenticação se não estiver autenticado
            <Route
              path="/*"
              element={<Navigate to="/" />}
            />
          )}
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;