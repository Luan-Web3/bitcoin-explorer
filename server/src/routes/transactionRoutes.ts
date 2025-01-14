import { Router } from 'express';
import { getLatestTransactions, getTransactionByTxid } from '../controllers/transactionController';

const router = Router();

router.get('/transactions/latest', getLatestTransactions);
router.get('/transaction/:txid', getTransactionByTxid);

export default router;
