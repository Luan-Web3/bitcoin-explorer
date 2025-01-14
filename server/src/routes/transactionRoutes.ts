import { Router } from 'express';
import { getLatestTransactions, getTransactionByTxid } from '../controllers/transactionController';

const router = Router();

router.get('/transactions', getLatestTransactions);
router.get('/transactions/:txid', getTransactionByTxid);

export default router;
