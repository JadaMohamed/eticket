import { Router } from 'express';
import clientController from '../controllers/client.controller.js';

const router = Router();

router.post('/', clientController.createClient);
router.post('/many', clientController.createManyClients);
router.get('/', clientController.getAllClients);
router.get('/:clientId', clientController.getClientById);
router.delete('/:id', clientController.deleteClienById);
router.put('/:id', clientController.updateClient);
router.get('/account/:id', clientController.getClientAccountInformations);


export default router;
