import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify'; // Importando o ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Estilos do Toastify
import Navbar from './components/Navbar/Navbar';
import Ingredientes from './pages/CadastroSistema/Ingredientes/Ingredientes';
import Home from './pages/Home/Home';
import Receitas from './pages/CadastroSistema/Receitas/Receitas';
import Despesas from './pages/CadastroSistema/Despesas/Despesas';
import Sobre from './features/Auth/LoginUsuario/Login';
import Cadastro from './features/Auth/CadastroUsuarios/CadastroUsuarios';
import AuthUser from './features/Auth/AuthUser/AuthUser';
import EsqueciSenha from './features/Auth/ForgotPasswordEmail/ForgotPswdEmail';
import RedefinirSenha from './features/Auth/ForgotPassword/ForgotPswd';
import NavegacaoTemporaria from './pages/NavegacaoTemporaria/NavegacaoTemp';

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
      <ToastContainer
        position="bottom-right" // Define a posição no canto inferior direito
        autoClose={5000} // Fecha automaticamente após 5 segundos
        hideProgressBar={false} // Exibe a barra de progresso
        newestOnTop={false} // Notificações mais recentes no topo
        closeOnClick // Fecha ao clicar
        rtl={false} // Direção do texto (esquerda para direita)
        pauseOnFocusLoss // Pausa ao perder o foco
        draggable // Permite arrastar a notificação
        pauseOnHover // Pausa ao passar o mouse
        theme="colored" // Tema colorido
      />
      <Routes>
        <Route
          path="/home"
          element={<Home />}
        />
        <Route
          path="/sign-in"
          element={logado ? <Navigate to="/produtos" /> : <Sobre onLogin={() => setLogado(true)} />}
        />
        <Route 
          path="/sign-up" 
          element={<Cadastro />} // Rota para o componente Cadastro
        />
        <Route 
          path="/" 
          element={<NavegacaoTemporaria />}
        />
        <Route
          path="/forgot-password-email"
          element={<EsqueciSenha/>}
        />
        <Route
          path="/forgot-password"
          element={<RedefinirSenha/>}
        />
        <Route 
          path="/auth" 
          element={<AuthUser />} // Rota para o componente Cadastro
        />
        <Route
          path="/ingredientes"
          element={<Ingredientes />}
        />
        <Route
          path="/receitas"
          element={<Receitas />}
        />
        <Route
          path="/despesas"
          element={<Despesas />}
        />
      </Routes>
    </>
  );
}

export default App;
