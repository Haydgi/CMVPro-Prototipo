import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Produtos from './pages/Produtos/Produtos';
import Receitas from './pages/Receitas/Receitas';
import Sobre from './features/Auth/LoginUsuario/Login';
import Cadastro from './features/Auth/CadastroUsuarios/CadastroUsuarios'; // Importa o componente Cadastro

function App() {
  const [logado, setLogado] = useState(false);
  const navigate = useNavigate(); 

  const logout = () => {
    setLogado(false);
    navigate('/'); // Redireciona para a página inicial (Sobre)
  };

  return (
    <>
      {logado && <Navbar onLogout={logout} />}
      <Routes>
        <Route
          path="/"
          element={logado ? <Navigate to="/produtos" /> : <Sobre onLogin={() => setLogado(true)} />}
        />
        <Route
          path="/produtos"
          element={logado ? <Produtos /> : <Navigate to="/" />}
        />
        <Route
          path="/receitas"
          element={logado ? <Receitas /> : <Navigate to="/" />}
        />
        <Route 
          path="/cadastro" 
          element={<Cadastro />} // Rota para o componente Cadastro
        />
      </Routes>
    </>
  );
}

export default App;
