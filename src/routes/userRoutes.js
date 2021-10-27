import { Router } from 'express';
import userController from '../controllers/UserController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// esses n deveria existir
// router.get('/', userController.index);
// router.get('/:id', userController.show); // se liga no params id

// tirando os ids daqui, pq vms pegar o id pelo o token
// tudo esta de acordo com o id do token para fazer essas coisas
router.post('/', loginRequired, userController.store); // criar conta
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);

export default router;
/**
 *
 */
