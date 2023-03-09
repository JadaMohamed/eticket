import express from 'express';
import userController from '../controllers/user.controller.js';
import { verifyJwt } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', verifyJwt, userController.profile);
router.post('/register', userController.register);
router.post('/registerorganizer', userController.registerOrganizer);
router.post('/login', userController.login);
router.get('/logout', verifyJwt, userController.logout);

export default router;
