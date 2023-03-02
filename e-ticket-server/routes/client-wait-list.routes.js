import { Router } from 'express';
import clientWaitListController from '../controllers/client-wait-list.controller.js';

const router = Router();

router.post('/', clientWaitListController.createClientWaitList);
router.post('/many', clientWaitListController.createManyClientWaitList);
router.get('/', clientWaitListController.getClientWaitLists);
router.get('/:id', clientWaitListController.getClientWaitListsById);
router.delete('/:id', clientWaitListController.deleteClientWaitList);
router.put('/:id', clientWaitListController.updateClientWaitList);


export default router;
