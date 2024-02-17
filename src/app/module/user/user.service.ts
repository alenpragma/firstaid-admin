import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IAdmin } from '../auth/auth.interface';
import { Admin } from '../auth/auth.model';
import { IUser } from './user.interface';
import { generateAdminId } from './user.utils';

const createAdmin = async (admin: IAdmin): Promise<IUser | null> => {
  console.log(admin);

  // default password
  if (!admin.password) {
    admin.password = config.default_admin_pass as string;
  }
  // set role
  admin.role = 'admin';
  const id = await generateAdminId();
  admin.id = id;

  console.log(admin, 'adminaaaa');

  // generate id

  const newAdmin = await Admin.create(admin);
  if (!newAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty ');
  }

  return newAdmin;
};

export const UserService = {
  createAdmin,
};
