import { Request, Response } from 'express';
import bitcoinClient from '../services/bitcoinService';

export const getLatestTransactions = async (req: Request, res: Response) => {
    try {
        const transactions = await bitcoinClient.listTransactions('*', 10, 0);

        res.json(transactions);
    } catch (error) {
        console.error('Erro ao buscar transações:', error.message);
        res.status(500).json({ error: 'Erro ao buscar transações' });
    }
};

export const getTransactionByTxid = async (req: Request, res: Response) => {
    try {
        const { txid } = req.params;
        const transaction = await bitcoinClient.command('getrawtransaction', txid, true);
        res.json(transaction);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
