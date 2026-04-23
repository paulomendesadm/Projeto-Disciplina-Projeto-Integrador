const setupDatabase = require('../database/config');

const ProdutoController = {
    async criar(req, res) {
        const db = await setupDatabase();
        const { nome, descricao, preco, codigo_barras } = req.body;
        
        try {
            await db.run(
                'INSERT INTO produtos (nome, descricao, preco, codigo_barras) VALUES (?, ?, ?, ?)',
                [nome, descricao, preco, codigo_barras]
            );
            res.status(201).json({ mensagem: "Produto criado com sucesso!" });
        } catch (error) {
            res.status(500).json({ erro: "Erro ao cadastrar produto." });
        }
    },

    async listar(req, res) {
        const db = await setupDatabase();
        const produtos = await db.all('SELECT * FROM produtos');
        res.json(produtos);
    }
};

module.exports = ProdutoController;