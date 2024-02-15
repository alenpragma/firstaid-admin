import { Schema, model } from 'mongoose';
import { IPayment, PaymentModal } from './payment.Interface';

const OrdersSchema = new Schema<IPayment, PaymentModal>(
  {
    method: {
      type: String,
      required: [true, 'Method is required'],
    },
    paymentNumber: {
      type: String,
      required: [true, 'Sender is required'],
    },
    amount: {
      type: String,
      required: [true, 'amount is required'],
    },
    trxId: {
      type: String,
      required: [true, 'Transaction is required'],
      unique: true,
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

export const Payment = model<IPayment, PaymentModal>('payment', OrdersSchema);
