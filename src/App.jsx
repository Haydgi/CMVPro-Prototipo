import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Produtos from './pages/Produtos';
import Receitas from './pages/Receitas';
import Sobre from './pages/Login';

function App() {
  const [logado, setLogado] = useState(false);
  const navigate = useNavigate(); // ✅ IMPORTANTE

  const logout = () => {
    setLogado(false);
    navigate('/'); // ✅ Redireciona para a página inicial (Sobre)
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
      </Routes>
    </>
  );
}

export default App;
