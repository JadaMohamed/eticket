import { Router } from 'express';
import seatCategoryController from '../controllers/seat-category.controller.js';

const router = Router();

router.post('/', seatCategoryController.createSeatCategory);
router.post('/many', seatCategoryController.createManySeatCategory);
router.get('/', seatCategoryController.getAllSeatCategories);
router.get('/:id', seatCategoryController.getSeatCategorieById);
router.delete('/:id', seatCategoryController.deleteSeatCategoryById);
router.put('/:id', seatCategoryController.updateSeatCategory);
router.get('/event/:id', seatCategoryController.getEventCategories)

export default router;
