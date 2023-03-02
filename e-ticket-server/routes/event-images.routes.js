import express from 'express';
import eventImagesController from '../controllers/event-images.controller.js';

const router = express.Router();

router.post('/', eventImagesController.createEventImage);
router.post('/many', eventImagesController.createManyEventImage);
router.get('/', eventImagesController.getAllEventImages);
router.get('/:id', eventImagesController.getImageById);//this router is may does not have any meaning but it's ok
router.delete('/:id', eventImagesController.deleteImageById);
router.put('/:id', eventImagesController.updateEventImage);


export default router;
