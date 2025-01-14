import { Router } from 'express';
import { getLatestBlocks, getBlockByHeight } from '../controllers/blockController';

const router = Router();

router.get('/blocks', getLatestBlocks);
router.get('/blocks/:height', getBlockByHeight);

export default router;
