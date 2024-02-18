import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { AdminModal, IAdmin } from './auth.interface';

const adminSchema = new Schema(
  {
    id: {
      type: String,
      required: [true, 'Name is required'],
    },
    role: {
      type: String,
      required: [true, 'role is required'],
    },
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
    },
    password: {
      type: String,
      required: [true, 'password is required'],
    },
  },
  { timestamps: true }
);

adminSchema.statics.isUserExist = async function (
  id: string
): Promise<Pick<IAdmin, 'id' | 'role' | 'password'> | null> {
  // console.log(id, 'id');

  const user = await Admin.findOne({ id }, { id: 1, role: 1, password: 1 });
  // console.log(user, 'user');

  return user;
};

adminSchema.statics.isPasswordMatch = async function (
  providedPassword: string,
  previewsPass: string
): Promise<boolean> {
  return await bcrypt.compare(providedPassword, previewsPass);
};

// hashing password before save document
// user.create() // user.save()
adminSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycrypt_solt_rounds)
  );
  console.log(user);

  next();
});

export const Admin = model<IAdmin, AdminModal>('admin-user', adminSchema);
