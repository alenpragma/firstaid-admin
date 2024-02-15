import express from 'express';
import { controller } from './payment.Controller';

const router = express.Router();

router.post('/', controller.create);

router.get('/:id', controller.getDataById);

router.patch('/:id', controller.updateDataById);

router.delete('/:id', controller.deleteData);

router.get('/', controller.getAlldata);

export const paymentRoutes = router;
