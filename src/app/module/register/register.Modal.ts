import { Schema, model } from 'mongoose';
import { IRegister, RegisterModal } from './register.Interface';

const RegisterSchema = new Schema<IRegister, RegisterModal>(
  {
    id: {
      type: String,
      required: [true, 'id is required'],
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    role: {
      type: String,
      required: [true, 'role is required'],
      default: 'visitor',
    },
    phone: {
      type: String,
      required: [true, 'phone is required'],
    },
    email: {
      type: String,
      required: [true, 'email is required'],
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

export const Register = model<IRegister, RegisterModal>(
  'registers',
  RegisterSchema
);
