import { Schema, model } from 'mongoose';
import { IOrder, OrdersModal } from './orders.Interface';

const OrdersSchema = new Schema<IOrder, OrdersModal>(
  {
    firstName: {
      type: String,
      required: [true, 'firstName is required'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
    },
    phone: {
      type: String,
      required: [true, 'phone is required'],
    },
    postOffice: {
      type: String,
      required: [true, 'postOffice is required'],
    },
    policy: {
      type: String,
      required: [true, 'policy is required'],
    },
    email: {
      type: String,
      required: [true, 'Email: is required'],
    },
    quantity: {
      type: String,
      required: [true, 'Quantity is required'],
    },
    zipCode: {
      type: String,
      required: [true, 'Post code is required'],
    },
    distric: {
      type: String,
      required: [true, 'distric is required'],
    },
    info: {
      type: String,
      required: [true, 'info is required'],
    },
    price: {
      type: String,
      required: [true, 'price is required'],
    },
    status: {
      type: Boolean,
      default: false, // You can set a default value if needed
    },
  },
  {
    timestamps: true,
  }
);

export const Orders = model<IOrder, OrdersModal>('orders', OrdersSchema);
