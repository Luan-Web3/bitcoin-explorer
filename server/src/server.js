require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Client = require('bitcoin-core');

const app = express();
app.use(bodyParser.json());

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
};

app.use(cors(corsOptions));

const client = new Client({
    network: 'regtest',
    username: process.env.RPC_USER,
    password: process.env.RPC_PASSWORD,
    host: process.env.RPC_HOST,
    port: process.env.RPC_PORT
});

// Endpoint: Verificar a saúde da conexão
app.get('/health', async (req, res) => {
    try {
        const info = await client.command('getblockchaininfo');
        res.json({
            status: 'OK',
            message: 'Conexão com o nó Bitcoin está funcionando.',
            chain: info.chain,
            blocks: info.blocks,
            headers: info.headers,
            verificationprogress: info.verificationprogress,
        });
    } catch (err) {
        res.status(500).json({
            status: 'ERROR',
            message: 'Não foi possível conectar ao nó Bitcoin.',
            error: err.message,
        });
    }
});

// Endpoint: Consultar bloco por número
app.get('/block/:height', async (req, res) => {
    try {
        const { height } = req.params;
        const hash = await client.command('getblockhash', parseInt(height));
        const block = await client.command('getblock', hash);
        res.json(block);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint: Consultar transação por hash
app.get('/transaction/:txid', async (req, res) => {
    try {
        const { txid } = req.params;
        const transaction = await client.command('getrawtransaction', txid, true);
        res.json(transaction);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint: Consultar saldo por endereço
app.get('/balance/:address', async (req, res) => {
    try {
        const { address } = req.params;
        const unspent = await client.command('listunspent', 0, 9999999, [address]);
        const balance = unspent.reduce((sum, utxo) => sum + utxo.amount, 0);
        res.json({ address, balance });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint: Buscar os últimos 5 blocos
app.get('/blocks/latest', async (req, res) => {
    try {
        const blockCount = await client.getBlockCount();

        const lastBlocksCount = blockCount >= 5 ? 5 : blockCount;

        const blockPromises = [];
        for (let i = blockCount; i > blockCount - lastBlocksCount; i--) {
            blockPromises.push(client.getBlockHash(i));
        }

        const blockHashes = await Promise.all(blockPromises);

        const blockDetailsPromises = blockHashes.map(hash => client.getBlock(hash));
        const blocks = await Promise.all(blockDetailsPromises);

        res.json(blocks);
    } catch (error) {
        console.error('Erro ao buscar os últimos blocos:', error.message);
        res.status(500).json({ error: 'Erro ao buscar os últimos blocos' });
    }
});

// Endpoint: Buscar as últimas 10 transações
app.get('/transactions/latest', async (req, res) => {
    try {
        const transactions = await client.listTransactions('*', 10, 0);

        res.json(transactions);
    } catch (error) {
        console.error('Erro ao buscar transações:', error.message);
        res.status(500).json({ error: 'Erro ao buscar transações' });
    }
});

// Inicializar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
