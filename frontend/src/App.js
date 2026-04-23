import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CadastroFornecedor from './pages/CadastroFornecedor';
import CadastroProduto from './pages/CadastroProduto';
import Produtos from './pages/Produtos';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/cadastro-fornecedor" element={<CadastroFornecedor />} />
          <Route path="/cadastro-produto" element={<CadastroProduto />} />
          <Route path="/associar" element={<Produtos />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;