import { Schema, model } from 'mongoose';
import { AuthModal, IUser } from './auth.interface';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const User = model<IUser, AuthModal>('User', userSchema);
