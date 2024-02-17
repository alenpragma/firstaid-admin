/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IUser = {
  id: string;
  role: string;
  password: string;
  needsPasswordChange: true | false;
  passwordChangedAt: Date;
};

// export type IUserMethods = {
//   isUserExist(id: string): Promise<Partial<IUser | null>>;

//   isPasswordMatch(
//     providedPassword: string,
//     currentPassword: string
//   ): Promise<boolean>;
// };

// export type UserModal = Model<IUser, Record<string, unknown>, IUserMethods>;

export type UserModal = {
  isUserExist(
    id: string
  ): Promise<Pick<IUser, 'id' | 'role' | 'password' | 'needsPasswordChange'>>;

  isPasswordMatch(
    providedPassword: string,
    currentPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
