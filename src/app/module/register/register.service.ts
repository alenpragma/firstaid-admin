import { SortOrder } from 'mongoose';
import calculatePagination from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { Payment } from '../payment/payment.Modal';
import { IRegister, IRegisterFilterRequest } from './register.Interface';
import { Register } from './register.Modal';
import { ordersSearchableFields } from './register.constant';
import { generateAdminId } from './register.utils';

const create = async (paylode: IRegister): Promise<any> => {
  console.log(paylode, 'ppppp');

  const id = await generateAdminId();
  console.log({ ...paylode, id }, 'with new id');

  // return;

  const response: any = {
    message: '',
    data: '',
    status: '',
  };
  const { trxId } = paylode;

  const paymentData = await Payment.findOneAndUpdate(
    { trxId },
    { $set: { status: true } }
  );

  // if data not found
  if (paymentData === null) {
    response.message = 'Somethings wrong check your transaction id ';
    response.status = 404;
    return response;
  }

  if (paymentData && paymentData.trxId === String(paylode.trxId)) {
    // if payment is less then 300
    if (Number(paymentData.amount) < 300) {
      response.message = 'your payment is low';
      response.status = 200;
      response.data = [];
      return response;
    }
    // ok the abobe

    // if registration already conform
    if (paymentData.status) {
      response.message = 'Already registration confim';
      response.data = paymentData;
      response.status = 208;
      return response;
    }
    //  update before data save
    // const updateStatus = await Payment.findOneAndUpdate(
    //   { trxId },
    //   { status: true },
    //   { new: true }
    // );

    // user data save
    const result = await Register.create({ ...paylode, id });
    if (result) {
      response.message = 'Congratulation your registration success';
      response.data = result;
      response.status = 200;
      return response;
    }
  }

  // console.log(paymentData, 'paymentData');

  return response;
};

const getAllData = async (
  filters: IRegisterFilterRequest,
  pageinationOptions: IPaginationOptions
): Promise<IGenericResponse<IRegister[]>> => {
  // pagination helpers
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(pageinationOptions);

  const { searchTerm, ...filtersData } = filters;

  const andCondation = [];

  if (searchTerm) {
    andCondation.push({
      $or: ordersSearchableFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondation.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortCondations: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondations[sortBy] = sortOrder;
  }
  const requestCondetion =
    andCondation.length > 0 ? { $and: andCondation } : {};

  const result = await Register.find(requestCondetion)
    .sort(sortCondations)
    .skip(skip)
    .limit(limit);

  const total = await Register.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleData = async (id: string): Promise<IRegister | null> => {
  const result = await Register.findById(id);
  return result;
};

const updateDataById = async (
  id: string,
  paylode: IRegister
): Promise<IRegister | null> => {
  const result = await Register.findByIdAndUpdate({ _id: id }, paylode, {
    new: true,
  });
  return result;
};

const deleteData = async (id: string): Promise<IRegister | null> => {
  const result = await Register.findByIdAndDelete(id);
  return result;
};

export const Services = {
  create,
  getAllData,
  getSingleData,
  updateDataById,
  deleteData,
};
