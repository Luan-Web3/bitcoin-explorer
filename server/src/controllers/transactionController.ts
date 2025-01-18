import { Request, Response } from 'express';

import { TransactionDTO } from '../dtos/transaction.dto';
import bitcoinClient from '../services/bitcoinService';

export const getLatestTransactions = async (req: Request, res: Response) => {
    try {
        // res.json('teste');

        const transactions = await bitcoinClient.listTransactions('*', 10, 0);

        // console.log('transactions:', transactions);
        // const txids = transactions.map((transaction) => transaction.txid);

        // const transactionPromises = txids.map((txid) => bitcoinClient.command('getrawtransaction', txid, true));
        // const detailedTransactions = await Promise.all(transactionPromises);

        // const transactionsResponse: TransactionDTO[] = detailedTransactions.map((transaction) => ({
        //     txid: transaction.txid,
        //     blocktime: transaction.blocktime,
        //     value: transaction.vout.reduce((acc: number, output: any) => acc + output.value, 0),
        //     size: transaction.size,
        //     weight: transaction.weight,
        // }));

        res.json(transactions);
    } catch (error: any) {
        console.error('Erro ao buscar transações:', error.message);
        res.status(500).json({ error: 'Erro ao buscar transações' });
    }
};

export const getTransactionByTxid = async (req: Request, res: Response) => {
    try {
        const { txid } = req.params;
        const transaction = await bitcoinClient.command('getrawtransaction', txid, true);

        const transactionResponse: TransactionDTO = {
            txid: transaction.txid,
            blocktime: transaction.blocktime,
            value: transaction.vout.reduce((acc: number, output: any) => acc + output.value, 0),
            size: transaction.size,
            weight: transaction.weight,
        };

        res.json(transactionResponse);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
