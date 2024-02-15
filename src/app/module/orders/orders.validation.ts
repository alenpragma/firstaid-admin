import { z } from 'zod';

const createPcPartZodSchema = z.object({
  body: z.object({
    Model: z.string().min(1, { message: 'Model is required' }),
    InputSensitivity: z.string(),
    FrequencyResponse: z.string(),
    Price: z
      .number()
      .min(0, { message: 'Price must be a non-negative number' }),
    Brand: z.string().min(1, { message: 'Brand is required' }),
    Type: z.string(),
    SystemRequirements: z.string(),
    Details: z.string().min(1, { message: 'Details are required' }),
    Category: z.string().min(1, { message: 'Category is required' }),
    ProductId: z
      .number()
      .int()
      .positive({ message: 'ProductId must be a positive integer' }),
    img1: z.string(),
    img2: z.string(),
    AvgRatings: z
      .number()
      .min(0)
      .max(5, { message: 'Average Ratings must be between 0 and 5' }),
    Status: z.string(),
    Reviews: z.array(z.string()),
  }),
});

export const partValidation = {
  createPcPartZodSchema,
};
