import { Model } from 'mongoose';

export type IAdmin = {
  id: string;
  role: string;
  password: string;
  phone: string;
  needsPasswordChange: true | false;
  passwordChangedAt: Date;
};

export type AdminModal = {
  // eslint-disable-next-line no-unused-vars
  isUserExist(id: string): Promise<Pick<IAdmin, 'id' | 'role' | 'password'>>;

  isPasswordMatch(
    // eslint-disable-next-line no-unused-vars
    providedPassword: string,
    // eslint-disable-next-line no-unused-vars
    currentPassword: string
  ): Promise<boolean>;
} & Model<IAdmin>;

export type ILogin = {
  id: string;
  password: string;
};

export type IloginResponse = {
  accessToken: string;
  refreshToken: string;
};
export type IChagePassword = {
  oldPassword: string;
  newPassword: string;
};
