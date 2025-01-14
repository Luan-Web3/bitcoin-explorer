import { Request, Response } from 'express';
import bitcoinClient from '../services/bitcoinService';

export const getBalanceByAddress = async (req: Request, res: Response) => {
    try {
        const { address } = req.params;
        const unspent = await bitcoinClient.command('listunspent', 0, 9999999, [address]);
        const balance = unspent.reduce((sum, utxo) => sum + utxo.amount, 0);
        res.json({ address, balance });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
