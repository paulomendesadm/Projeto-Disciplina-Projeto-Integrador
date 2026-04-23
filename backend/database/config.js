const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function setupDatabase() {
    const db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });

    // Criando a Tabela de Produtos
    await db.exec(`
        CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            descricao TEXT,
            preco REAL,
            codigo_barras TEXT UNIQUE
        )
    `);

    // Criando a Tabela de Fornecedores
    await db.exec(`
        CREATE TABLE IF NOT EXISTS fornecedores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            cnpj TEXT UNIQUE,
            endereco TEXT,
            contato TEXT
        )
    `);

    // Criando a Tabela de Associação (Muitos para Muitos)
    await db.exec(`
        CREATE TABLE IF NOT EXISTS produto_fornecedor (
            produto_id INTEGER,
            fornecedor_id INTEGER,
            FOREIGN KEY (produto_id) REFERENCES produtos (id),
            FOREIGN KEY (fornecedor_id) REFERENCES fornecedores (id),
            PRIMARY KEY (produto_id, fornecedor_id)
        )
    `);

    return db;
}

module.exports = setupDatabase;