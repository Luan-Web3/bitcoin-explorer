import { Request, Response } from 'express';

import { BalanceDTO } from '../dtos/balance.dto';
import bitcoinClient from '../services/bitcoinService';

export const getBalanceByAddress = async (req: Request, res: Response) => {
    try {
        const { address } = req.params;
        const unspent = await bitcoinClient.command('listunspent', 0, 9999999, [address]);
        const balance = unspent.reduce((sum:any, utxo:any) => sum + utxo.amount, 0);

        const balanceResponse: BalanceDTO = {
            address,
            balance,
        };
        res.json(balanceResponse);
    } catch (err:any) {
        res.status(500).json({ error: err.message });
    }
};
