import { Router } from 'express';
import tokenController from '../controllers/TokenController';

const router = Router();

// store pq vms criar um token
router.post('/', tokenController.store);

export default router;
