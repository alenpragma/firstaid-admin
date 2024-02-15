import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './auth.interface';
import { authServices } from './auth.service';

const register = catchAsync(async (req: Request, res: Response) => {
  const { password, email, name } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await authServices.register({ name, email, hashedPassword });
  console.log(result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Register Successfully',
    data: result,
  });
});

//  get All Parts

// const getAllBuildPc = catchAsync(async (req: Request, res: Response) => {
//   const query = req?.query;

//   const paginationOptions = pick(query, paginationFields);
//   const filters = pick(query, pcPartsFilterableFields);

//   const result = await authServices.getAllBuildPc(
//     filters,
//     paginationOptions
//   );
//   // console.log(result);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Pc Retrieved  Succesfully',
//     data: result.data,
//   });
// });

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email;
  console.log(email);

  const result = await authServices.getSingleUser(email);
  console.log(result);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Retrieved Successfully',
    data: result,
  });
});

// // update Parts By Id
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await authServices.updateUserById(id, updatedData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User successfully updated',
    data: result,
  });
});

// // // Delete Parts
// const deleteBuildPc = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;

//   const result = await authServices.deleteBuildPc(id);

//   sendResponse<IBuilder>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Build Pc deleted Successfully',
//     data: result,
//   });
// });

export const authController = {
  register,
  getSingleUser,
  updateUser,
};
