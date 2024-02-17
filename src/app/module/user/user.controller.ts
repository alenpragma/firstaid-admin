import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    console.log(req.body);

    const { ...userData } = req.body;

    console.log(userData, 'aaaa');

    const result = await UserService.createAdmin(userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin created successfully!',
      data: result,
    });
  }
);

export const UserController = {
  createAdmin,
};
