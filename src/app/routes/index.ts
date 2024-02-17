import express from 'express';
import { AuthRoutes } from '../module/auth/auth.route';
import { paymentRoutes } from '../module/payment/payment.route';
import { registerRoutes } from '../module/register/register.route';
import { UserRoutes } from '../module/user/user.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/payment',
    routes: paymentRoutes,
  },
  {
    path: '/register',
    routes: registerRoutes,
  },
  {
    path: '/auth',
    routes: AuthRoutes,
  },
  {
    path: '/admin',
    routes: UserRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
