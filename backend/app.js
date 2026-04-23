const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const ProdutoController = require('./controllers/ProdutoController');
const FornecedorController = require('./controllers/FornecedorController');

// --- ROTAS DE PRODUTO ---
app.get('/produtos', ProdutoController.listar);
app.post('/produtos', ProdutoController.criar);

// --- ROTAS DE FORNECEDOR ---
app.get('/fornecedores', FornecedorController.listar);
app.post('/fornecedores', FornecedorController.criar);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});