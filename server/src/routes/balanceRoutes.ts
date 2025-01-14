import { Router } from 'express';
import { getBalanceByAddress } from '../controllers/balanceController';

const router = Router();

router.get('/balance/:address', getBalanceByAddress);

export default router;
