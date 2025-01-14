import { Request, Response } from 'express';
import bitcoinClient from '../services/bitcoinService';

export const checkHealth = async (req: Request, res: Response) => {
    try {
        const info = await bitcoinClient.command('getblockchaininfo');
        res.json({
            status: 'OK',
            message: 'Conexão com o nó Bitcoin está funcionando.',
            chain: info.chain,
            blocks: info.blocks,
            headers: info.headers,
            verificationprogress: info.verificationprogress,
        });
    } catch (error) {
        res.status(500).json({
            status: 'ERROR',
            message: 'Não foi possível conectar ao nó Bitcoin.',
            error: error.message,
        });
    }
};
