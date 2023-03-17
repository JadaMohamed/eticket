import express from 'express';
import transactionController from '../controllers/transaction.controller.js';

const router = express.Router();

router.post('/', transactionController.createTransaction);
router.post('/many', transactionController.createManyTransactions);
router.get('/:id', transactionController.getTransactionById);
router.get('/', transactionController.getAllTransactions);

export default router;
