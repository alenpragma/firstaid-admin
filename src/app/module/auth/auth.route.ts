import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validations';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.authValidationZodSchema),
  AuthController.login
);
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

router.post(
  '/change-password',
  auth(ENUM_USER_ROLE.ADMIN),
  AuthController.changePassword
);

export const AuthRoutes = router;
