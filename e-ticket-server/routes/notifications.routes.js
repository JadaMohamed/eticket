import express from 'express';
import notificationsController from '../controllers/notifications.controller.js';

const router = express.Router();


router.post('/', notificationsController.createNotification);
router.get('/', notificationsController.getAllNotifications);
router.get('/:accountId', notificationsController.getNotificationsByAccountId);
router.post('/many', notificationsController.createManyNotifications);
router.delete('/:id', notificationsController.deleteNotificationById);
router.put('/:id', notificationsController.updateNotifications);

export default router;
