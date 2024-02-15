import express from 'express';
import { authController } from './auth.controller';

const router = express.Router();

router.post('/', authController.register);

router.get('/:email', authController.getSingleUser);

router.patch('/:id', authController.updateUser);

// router.delete('/:id', authController.);

// router.get('/', authController.);

export const AuthRoutes = router;
