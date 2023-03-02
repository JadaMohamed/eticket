import express from 'express';
import ticketController from '../controllers/ticket.controller.js';

const router = express.Router();

router.post('/', ticketController.createTicket);
router.post('/many', ticketController.createManyTicket);
router.get('/', ticketController.getAllTickets);
router.get('/client/:clientId', ticketController.getTicketsByClientId);
router.delete('/:id', ticketController.deleteticketById);
router.put('/:id', ticketController.updateTicket);

export default router;
