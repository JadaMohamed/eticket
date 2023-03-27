import { Router } from 'express';
import adminController from '../controllers/admin.controller.js';

const router = Router();

// router.post('/', adminController.createAdmin);
// router.post('/many', adminController.createManyAdmins);
// router.get('/', adminController.getAllAdmins);
// router.get('/:id', adminController.getAdminById);
// router.delete('/:id', adminController.deleteAdmin);
// router.put('/:id', adminController.updateAdmin);
router.get('/users/count/joined-last-week', adminController.getJoinedLastWeek);
router.get('/users/count/total', adminController.getTotalUsers);
router.get('/events/count/total&weekcount', adminController.getEventsStats);
router.get('/users/last-10-joined', adminController.getLastJoinedUsers);
router.get('/users/all', adminController.getAllUsers);




export default router;
