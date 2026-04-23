import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CadastroFornecedor() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: '20px' }}>
      <h1>Cadastro de Fornecedor</h1>
      <button onClick={() => navigate('/')}>Voltar</button>
      {/* Aqui você vai montar o formulário conforme o seu protótipo */}
    </div>
  );
}