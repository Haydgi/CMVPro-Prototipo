import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Produtos from './pages/Produtos/Produtos';
import Receitas from './pages/Receitas/Receitas';
import Sobre from './features/Auth/LoginUsuario/Login';
import Cadastro from './features/Auth/CadastroUsuarios/CadastroUsuarios';
import AuthUser from './features/Auth/AuthUser/AuthUser';
import EsqueciSenha from './features/Auth/ForgotPassword/ForgotPswdEmail';

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
          path="/sign-in"
          element={logado ? <Navigate to="/produtos" /> : <Sobre onLogin={() => setLogado(true)} />}
        />
        <Route 
          path="/sign-up" 
          element={<Cadastro />} // Rota para o componente Cadastro
        />
        <Route
          path="/forgot-password"
          element={<EsqueciSenha/>}
        />
        <Route 
          path="/auth" 
          element={<AuthUser />} // Rota para o componente Cadastro
        />
        <Route
          path="/produtos"
          element={logado ? <Produtos /> : <Navigate to="/" />}
        />
        <Route
          path="/receitas"
          element={logado ? <Receitas /> : <Navigate to="/" />}
        />
        </Routes>
    </>
  );
}

export default App;
