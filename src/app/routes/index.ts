import express from 'express';
import { paymentRoutes } from '../module/payment/payment.route';
import { registerRoutes } from '../module/register/register.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  // {
  //   path: '/orders',
  //   routes: ordersRoutes,
  // },
  {
    path: '/payment',
    routes: paymentRoutes,
  },
  {
    path: '/register',
    routes: registerRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
