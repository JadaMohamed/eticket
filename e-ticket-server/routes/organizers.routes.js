import express from 'express';
import organizersController from '../controllers/organizers.controller.js';

const router = express.Router();

router.post('/', organizersController.createOrganizer);
router.post('/many', organizersController.createManyOrganizers);
router.get('/', organizersController.getAllOrganizers);
router.get('/:org_id', organizersController.getOrganizerById);
router.delete('/:id', organizersController.deleteOrganizerById);
router.put('/:id', organizersController.updateOrganizer);

export default router;
