import { Router } from 'express';
import seatCategoryController from '../controllers/seat-category.controller.js';
import { verifyJwt } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', verifyJwt, seatCategoryController.createSeatCategory);
router.post('/many', verifyJwt, seatCategoryController.createManySeatCategory);
router.get('/', seatCategoryController.getAllSeatCategories);
router.get('/:id', seatCategoryController.getSeatCategorieById);
router.delete('/:id', verifyJwt, seatCategoryController.deleteSeatCategoryById);
router.put('/:id', verifyJwt, seatCategoryController.updateSeatCategory);
router.get('/event/:id', seatCategoryController.getEventCategories)

export default router;
