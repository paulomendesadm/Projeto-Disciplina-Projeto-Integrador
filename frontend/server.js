const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // LIBERA A CONVERSA COM O REACT
app.use(express.json());

// Rota para o React não dar erro de "Network Error"
app.get('/produtos', (req, res) => {
    res.json([{ id: 1, nome: 'Produto Teste', preco: 10.0, codigo_barras: '123' }]);
});

app.post('/produtos', (req, res) => {
    console.log("Recebi do React:", req.body);
    res.status(201).json({ mensagem: "Sucesso!" });
});

app.listen(3000, () => console.log("Servidor Backend rodando na porta 3000"));