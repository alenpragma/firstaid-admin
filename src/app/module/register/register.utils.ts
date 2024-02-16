import { Register } from './register.Modal';

export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastFaculty = await Register.findOne(
    { role: 'visitor' },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateAdminId = async (): Promise<string> => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(5, '0');

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `C-${incrementedId}`;

  return incrementedId;
};
