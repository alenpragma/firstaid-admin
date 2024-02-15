import { IUser } from './auth.interface';
import { User } from './auth.model';

const register = async (paylode: IUser): Promise<IUser> => {
  console.log(paylode);

  const result = await User.create(paylode);
  return result;
};

// const getAllBuildPc = async (
//   filters:any,
//   pageinationOptions: any
// ): Promise<IGenericResponse<IUser[]>> => {
//   // pagination helpers
//   const { page, limit, skip, sortBy, sortOrder } =
//     calculatePagination(pageinationOptions);

//   const { searchTerm, ...filtersData } = filters;

//   const andCondation = [];

// if (searchTerm) {
//   andCondation.push({
//     $or: pcPartsSearchableFields.map(field => ({
//       [field]: { $regex: searchTerm, $options: 'i' },
//     })),
//   });
// }

// if (Object.keys(filtersData).length) {
//   andCondation.push({
//     $and: Object.entries(filtersData).map(([field, value]) => ({
//       [field]: value,
//     })),
//   });
// }

//   const sortCondations: { [key: string]: SortOrder } = {};

//   if (sortBy && sortOrder) {
//     sortCondations[sortBy] = sortOrder;
//   }
//   const requestCondetion =
//     andCondation.length > 0 ? { $and: andCondation } : {};

//   const result = await Builder.find(requestCondetion)
//     .sort(sortCondations)
//     .skip(skip)
//     .limit(limit);

//   const total = await Builder.countDocuments();

//   return {
//     meta: {
//       page,
//       limit,
//       total,
//     },
//     data: result,
//   };
// };

const getSingleUser = async (email: string): Promise<IUser | null> => {
  const result = await User.findOne({ email });
  return result;
};

const updateUserById = async (
  id: string,
  paylode: IUser
): Promise<IUser | null> => {
  const result = await User.findByIdAndUpdate({ _id: id }, paylode, {
    new: true,
  });
  return result;
};

export const authServices = {
  register,
  getSingleUser,
  updateUserById,
};
