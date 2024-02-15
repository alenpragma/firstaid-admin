import { Model } from 'mongoose';

export type IPayment = {
  method: string;
  paymentNumber: string;
  amount: string;
  trxId: string;
  status: boolean;
};

export type PaymentModal = Model<IPayment, unknown>;

export type IPaymentFilterRequest = {
  searchTerm?: string;
  paymentNumber?: string;
  trxId?: string;
};
