import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { IChagePassword, ILogin, IloginResponse } from './auth.interface';
import { Admin } from './auth.model';

const create = async (user: any) => {
  // default password

  if (!user.password) {
    user.password = config.default_admin_pass as string;
  }

  // set role
  user.role = 'admin';

  const result = await Admin.create(user);
  return result;
};

const login = async (payload: ILogin): Promise<IloginResponse> => {
  const { id, password } = payload;

  // check

  const isUserExist = await Admin.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not found');
  }
  // console.log(password, isUserExist.password);

  if (
    isUserExist.password &&
    !(await Admin.isPasswordMatch(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'password is incorrect');
  }

  const { id: userId, role } = isUserExist;
  // console.log(config);

  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.secret_expires_in as string
  );

  // console.log(accessToken, 'accessToken');

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_secret_expires_in as string
  );

  // console.log(refreshToken, 'refreshToken');

  return {
    accessToken,
    refreshToken,
  };
};

const passwordChange = async (
  user: JwtPayload | null,
  paylode: IChagePassword
): Promise<void> => {
  const { oldPassword, newPassword } = paylode;

  // Step 1 -> checking is user exist
  // alternative way to change password
  console.log(user);

  const isUserExist = await Admin.findOne({ id: user?.userId }).select(
    '+password'
  );
  console.log(isUserExist, 'this is user');

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //  Step 2 -> checking old password

  if (
    isUserExist.password &&
    !(await Admin.isPasswordMatch(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password is incorrect');
  }

  isUserExist.password = newPassword;
  isUserExist.needsPasswordChange = false;

  // update password using save method
  isUserExist.save();
};

const refreshToken = async (token: string): Promise<any> => {
  // verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'invalid refresh token');
  }

  const { userId } = verifiedToken;

  // // user deleted fromd database then have refresh token
  // // checking deleted user
  const isUserExist = await Admin.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Does not exist');
  }

  // genatate new token

  const newAccessToken = jwtHelpers.createToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.secret_expires_in as string
  );
  console.log(newAccessToken, 'new AccessToken');

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  create,
  login,
  passwordChange,
  refreshToken,
};
