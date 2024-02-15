import { SortOrder } from 'mongoose';
import calculatePagination from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { Payment } from '../payment/payment.Modal';
import { Register } from './payment.Modal';
import { IRegister, IRegisterFilterRequest } from './register.Interface';
import { ordersSearchableFields } from './register.constant';

const create = async (paylode: IRegister): Promise<any> => {
  const response: any = {
    message: '',
    data: '',
  };
  const { trxId } = paylode;

  const paymentData = await Payment.findOne({
    trxId,
  });
  console.log(paymentData, 'paymentData 111');

  // if data not found
  if (paymentData === null) {
    response.message = 'data not found';
    return response;
  }

  if (paymentData && paymentData.trxId === String(paylode.trxId)) {
    // if payment is less then 300
    if (Number(paymentData.amount) < 300) {
      response.message = 'your payment is low';
      response.data = [];
      return response;
    }
    // ok the abobe

    // if registration already conform
    if (paymentData.status) {
      response.message = 'Already registration confim';
      response.data = paymentData;
      return response;
    }
    //  update before data save
    const updateStatus = await Payment.findOneAndUpdate(
      { trxId },
      { status: true },
      { new: true }
    );

    console.log(updateStatus);

    // user data save
    const result = await Register.create(paylode);
    if (result) {
      console.log(result, 'yoy');

      return (response.message = 'Congratulation your registration success');
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
