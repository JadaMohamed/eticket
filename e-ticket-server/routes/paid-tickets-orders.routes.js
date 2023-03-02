import express from 'express';
import PaidTicketsOrdersController from '../controllers/paid-tickets-orders.controller.js';

const router = express.Router();

router.post('/', PaidTicketsOrdersController.createPaidTicketOrder);
router.post('/many', PaidTicketsOrdersController.createManyPaidTicketOrder);
router.get('/', PaidTicketsOrdersController.getAllPaidTicketOrders);
router.get('/event/:eventId', PaidTicketsOrdersController.getPaidTicketOrdersByEventId);
router.delete('/:id', PaidTicketsOrdersController.deletePaidTicketsOrderById);
router.put('/:id', PaidTicketsOrdersController.updatePaidTicketsOrder);


export default router;
