require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Client = require('bitcoin-core');

const app = express();
app.use(bodyParser.json());

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

// Inicializar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
