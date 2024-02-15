import { Model } from 'mongoose';

export type IRegister = {
  name: string;
  phone: string;
  email: string;
  trxId: string;
  status: boolean;
};

export type RegisterModal = Model<IRegister, unknown>;

export type IRegisterFilterRequest = {
  searchTerm?: string;
  phone?: string;
  trxId?: string;
};
