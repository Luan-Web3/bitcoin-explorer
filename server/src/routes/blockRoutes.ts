import { Router } from 'express';
import { getLatestBlocks, getBlockByHeight } from '../controllers/blockController';

const router = Router();

router.get('/blocks/latest', getLatestBlocks);
router.get('/block/:height', getBlockByHeight);

export default router;
