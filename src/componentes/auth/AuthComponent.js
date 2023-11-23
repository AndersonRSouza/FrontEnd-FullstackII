import React, { useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/Rotas';

function AuthComponent() {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [nivelAcesso, setNivelAcesso] = useState('user');
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleRegister = async () => {
    try {
      await axios.post(`${API_BASE_URL}/register`, { matricula, senha, nivelAcesso });
      alert('Cadastro bem-sucedido!');
    } catch (error) {
      console.error('Erro ao cadastrar usuário: ', error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { matricula, senha });
      setLoggedInUser(response.data);
    } catch (error) {
      console.error('Erro ao fazer login: ', error);
    }
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/register">Registrar</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/register">
          <div>
            <h2>Cadastro</h2>
            <input type="text" placeholder="Usuário" onChange={(e) => setMatricula(e.target.value)} />
            <input type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} />
            <select onChange={(e) => setNivelAcesso(e.target.value)}>
              <option value="user">Usuário</option>
              <option value="admin">Admin</option>
            </select>
            <button onClick={handleRegister}>Cadastrar</button>
          </div>
        </Route>
        <Route path="/login">
          {loggedInUser ? (
            <Navigate to="/" />
          ) : (
            <div>
              <h2>Login</h2>
              <input type="text" placeholder="Usuário" onChange={(e) => setMatricula(e.target.value)} />
              <input type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} />
              <button onClick={handleLogin}>Entrar</button>
            </div>
          )}
        </Route>
        <Route path="/">
          <h2>Home</h2>
          {loggedInUser && <p>Bem-vindo, {loggedInUser.matricula} ({loggedInUser.nivelacesso})!</p>}
        </Route>
      </Routes>
    </div>
  );
}

export default AuthComponent;