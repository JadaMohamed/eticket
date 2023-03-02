import { Router } from 'express';
import accountController from '../controllers/account.controller.js';

const router = Router();

router.post('/', accountController.createAccount);
router.post('/many', accountController.createManyAccount);
router.get('/', accountController.getAllAccounts);
router.get('/:id', accountController.getAccountById);
router.put('/:id', accountController.updateAccount);
router.delete('/:id', accountController.deleteAccount);

export default router;
