import bcrypt from 'bcrypt';
import { Schema } from 'mongoose';
import config from '../../../config';
import { IUser } from './user.interface';

//  Create a Schema corresponding to the document interface.

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
): Promise<Pick<
  IUser,
  'id' | 'role' | 'password' | 'needsPasswordChange'
> | null> {
  const user = await User.findOne(
    { id },
    { id: 1, role: 1, needsPasswordChange: 1, password: 1 }
  );
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

  next();
});

// export const User = model<IUser, UserModal>('admin-user', adminSchema);
