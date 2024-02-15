import { Model } from 'mongoose';

export type IUser = {
  name: string;
  email: string;
  hashedPassword: string;
};

export type AuthModal = Model<IUser, unknown>;
