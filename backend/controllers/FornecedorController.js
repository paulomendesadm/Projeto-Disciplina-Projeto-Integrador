const fornecedores = [
    { id: 1, nome: 'Fornecedor Padrão A', cnpj: '11.111.111/0001-01', endereco: 'Rua A, 123', telefone: '(11) 1111-1111', email: 'contatoA@fornecedor.com', contato: 'João Silva' },
    { id: 2, nome: 'Fornecedor Padrão B', cnpj: '22.222.222/0002-02', endereco: 'Av. B, 456', telefone: '(22) 2222-2222', email: 'contatoB@fornecedor.com', contato: 'Maria Souza' }
];

let nextId = 3;

exports.listar = (req, res) => {
    res.json(fornecedores);
};

exports.criar = (req, res) => {
    const novoFornecedor = { id: nextId++, ...req.body };
    fornecedores.push(novoFornecedor);
    res.status(201).json(novoFornecedor);
};