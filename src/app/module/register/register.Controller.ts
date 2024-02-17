import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IRegister } from './register.Interface';
import { ordersFilterableFields } from './register.constant';
import { Services } from './register.service';

const create = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;

  const result = await Services.create(data);
  console.log(result, 'yoy');

  sendResponse(res, {
    statusCode: result?.status,
    success: true,
    message: result?.message,
    data: result?.data,
  });
});

//  get All Order

const getAlldata = catchAsync(async (req: Request, res: Response) => {
  const query = req?.query;

  const paginationOptions = pick(query, paginationFields);
  const filters = pick(query, ordersFilterableFields);

  const result = await Services.getAllData(filters, paginationOptions);
  // console.log(result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Register Retrieved  Succesfully',
    data: result,
  });
});
const getDataById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await Services.getSingleData(id);

  sendResponse<IRegister>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Register Retrieved Successfully',
    data: result,
  });
});

// // update Parts By Id
const updateDataById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await Services.updateDataById(id, updatedData);

  sendResponse<IRegister>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Register successfully updated',
    data: result,
  });
});

// // Delete Parts
const deleteData = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await Services.deleteData(id);

  sendResponse<IRegister>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Register deleted Successfully',
    data: result,
  });
});

export const controller = {
  create,
  getAlldata,
  getDataById,
  updateDataById,
  deleteData,
};
