import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function Produtos() {
  const navigate = useNavigate();

  // 1. DETALHES DO PRODUTO (Somente Leitura conforme exigência)
  const [produto] = useState({
    nome: 'Smartphone Galaxy S23',
    codigo_barras: '789123456001',
    descricao: 'Aparelho celular de última geração com 256GB.',
    url_imagem: 'https://via.placeholder.com/100'
  });

  const [fornecedoresDisponiveis, setFornecedoresDisponiveis] = useState([]);
  const [fornecedorSelecionadoId, setFornecedorSelecionadoId] = useState('');
  const [fornecedoresAssociados, setFornecedoresAssociados] = useState([]);

  // Carregar fornecedores da API ao montar o componente
  useEffect(() => {
    async function carregarFornecedores() {
      try {
        const response = await api.get('/fornecedores');
        setFornecedoresDisponiveis(response.data);
      } catch (error) {
        console.error("Erro ao carregar fornecedores", error);
      }
    }
    carregarFornecedores();
  }, []);

  // Regra de Negócio: Associar
  const handleAssociar = () => {
    if (!fornecedorSelecionadoId) return alert("Selecione um fornecedor");

    const jaExiste = fornecedoresAssociados.find(f => f.id === parseInt(fornecedorSelecionadoId));
    if (jaExiste) return alert("Fornecedor já associado!");

    const fornecedor = fornecedoresDisponiveis.find(f => f.id === parseInt(fornecedorSelecionadoId));
    if (fornecedor) {
      setFornecedoresAssociados([...fornecedoresAssociados, fornecedor]);
      setFornecedorSelecionadoId('');
    }
  };

  // Regra de Negócio: Desassociar
  const handleDesassociar = (id) => {
    setFornecedoresAssociados(fornecedoresAssociados.filter(f => f.id !== id));
  };

  // Estilos padronizados
  const labelStyle = { fontWeight: 'bold', fontSize: '12px', color: '#666', marginBottom: '5px', display: 'block' };
  const readOnlyStyle = { 
    width: '100%', 
    padding: '10px', 
    backgroundColor: '#f9f9f9', 
    border: '1px solid #ddd', 
    borderRadius: '4px', 
    color: '#333', 
    marginBottom: '15px',
    boxSizing: 'border-box'
  };

  return (
    <div style={{ maxWidth: '900px', margin: '30px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      
      {/* CABEÇALHO */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #2c3e50', paddingBottom: '10px', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Associação de Fornecedor a Produto</h2>
        <button 
          onClick={() => navigate('/')} 
          style={{ cursor: 'pointer', padding: '8px 15px', backgroundColor: '#95a5a6', color: '#fff', border: 'none', borderRadius: '4px' }}
        >
          Voltar
        </button>
      </header>

      {/* DETALHES DO PRODUTO (Somente Leitura) */}
      <section style={{ display: 'flex', gap: '20px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #eee', marginBottom: '30px' }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Nome do Produto</label>
          <div style={readOnlyStyle}>{produto.nome}</div>
          
          <label style={labelStyle}>Código de Barras</label>
          <div style={readOnlyStyle}>{produto.codigo_barras}</div>
          
          <label style={labelStyle}>Descrição</label>
          <div style={{ ...readOnlyStyle, minHeight: '50px' }}>{produto.descricao}</div>
        </div>
        
        <div style={{ width: '120px', textAlign: 'center' }}>
          <label style={labelStyle}>Imagem</label>
          <img 
            src={produto.url_imagem} 
            alt="Produto" 
            style={{ width: '100px', height: '100px', objectFit: 'cover', border: '1px solid #ddd', borderRadius: '4px' }} 
          />
        </div>
      </section>

      {/* SEÇÃO DE ASSOCIAÇÃO */}
      <section style={{ padding: '20px', backgroundColor: '#eef2f3', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0, color: '#2c3e50' }}>Associação de Fornecedor</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Seleção de Fornecedor</label>
            <select 
              value={fornecedorSelecionadoId} 
              onChange={e => setFornecedorSelecionadoId(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="">Selecione um fornecedor</option>
              {fornecedoresDisponiveis.map(f => (
                <option key={f.id} value={f.id}>{f.nome} - {f.cnpj}</option>
              ))}
            </select>
          </div>
          <button 
            onClick={handleAssociar} 
            style={{ padding: '10px 20px', backgroundColor: '#2980b9', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Associar Fornecedor
          </button>
        </div>
      </section>

      {/* TABELA DE FORNECEDORES ASSOCIADOS */}
      <section style={{ marginTop: '30px' }}>
        <h4 style={{ borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>Fornecedores Associados</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: '#2c3e50', color: 'white' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Nome do Fornecedor</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>CNPJ</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {fornecedoresAssociados.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ padding: '30px', textAlign: 'center', color: '#999', fontStyle: 'italic' }}>
                  Nenhum fornecedor associado a este produto.
                </td>
              </tr>
            ) : (
              fornecedoresAssociados.map(f => (
                <tr key={f.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}>{f.nome}</td>
                  <td style={{ padding: '12px' }}>{f.cnpj}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <button 
                      onClick={() => handleDesassociar(f.id)} 
                      style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Desassociar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

    </div>
  );
}