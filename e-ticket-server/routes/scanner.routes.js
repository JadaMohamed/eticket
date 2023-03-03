import { Router } from 'express';
import accountController from '../controllers/account.controller.js';
import organizersController from '../controllers/organizers.controller.js';
import ticketController from '../controllers/ticket.controller.js';

const router = Router();


router.post('/accounts/login', accountController.loginToAccount);
router.get('/organizers/account/:account_id', organizersController.getOrganizerByAccountId);
router.get('/organizers/:org_id', organizersController.getOrganizerById);
router.get('/tickets/event/:eventId', ticketController.getTicketsByEventId);
router.put('/tickets/:id', ticketController.updateTicket);


export default router;