import express from 'express';
import eventReviewController from '../controllers/event-reviews.controller.js';

const router = express.Router();

router.post('/', eventReviewController.createEventReview);
router.post('/many', eventReviewController.createManyEventReviews);
router.get('/', eventReviewController.getEventReviews);
router.get('/:id', eventReviewController.getEventReviewsById);
router.delete('/:id', eventReviewController.deleteEventReviewById);
router.put('/:id', eventReviewController.updateEventReview);

export default router;
