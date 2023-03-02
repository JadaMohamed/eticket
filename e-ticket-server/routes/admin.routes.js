import { Router } from 'express';
import adminController from '../controllers/admin.controller.js';

const router = Router();

router.post('/', adminController.createAdmin);
router.post('/many', adminController.createManyAdmins);
router.get('/', adminController.getAllAdmins);
router.get('/:id', adminController.getAdminById);
router.delete('/:id', adminController.deleteAdmin);
router.put('/:id', adminController.updateAdmin);



export default router;
