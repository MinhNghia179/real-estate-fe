import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Email không hợp lệ' }),
  password: z.string().min(8, { message: 'Mật khẩu tối thiểu 8 ký tự' }),
});

export const RegisterSchema = z
  .object({
    name: z.string().min(2, { message: 'Tên tối thiểu 2 ký tự' }).max(50),
    email: z.string().email({ message: 'Email không hợp lệ' }),
    password: z
      .string()
      .min(8, { message: 'Mật khẩu tối thiểu 8 ký tự' })
      .regex(/[A-Z]/, { message: 'Phải có chữ hoa' })
      .regex(/[0-9]/, { message: 'Phải có số' }),
    confirmPassword: z.string(),
    phone: z
      .string()
      .regex(/^[0-9]{10,11}$/, { message: 'Số điện thoại không hợp lệ' })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword'],
  });

export const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Email không hợp lệ' }),
});

export const UpdateProfileSchema = z.object({
  name: z.string().min(2).max(50),
  phone: z
    .string()
    .regex(/^[0-9]{10,11}$/)
    .optional(),
  bio: z.string().max(500).optional(),
  avatar: z.string().url().optional(),
});

export const CreatePropertySchema = z.object({
  title: z.string().min(5, { message: 'Tối thiểu 5 ký tự' }).max(100),
  description: z.string().min(20, { message: 'Tối thiểu 20 ký tự' }).max(1000),
  price: z.number().positive({ message: 'Giá phải dương' }),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().int().min(0),
  area: z.number().positive({ message: 'Diện tích phải dương' }),
  location: z.object({
    address: z.string().min(5),
    city: z.string().min(2),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
  }),
  images: z.array(z.string().url()).min(1, { message: 'Cần ít nhất 1 ảnh' }),
  amenities: z.array(z.string()).optional(),
});

export const UpdatePropertySchema = CreatePropertySchema.partial();

export const SearchPropertySchema = z
  .object({
    minPrice: z.number().optional(),
    maxPrice: z.number().optional(),
    city: z.string().optional(),
    bedrooms: z.number().optional(),
    bathrooms: z.number().optional(),
  })
  .refine(
    (data) => {
      if (data.minPrice && data.maxPrice) return data.minPrice <= data.maxPrice;
      return true;
    },
    { message: 'Giá tối thiểu phải nhỏ hơn giá tối đa' }
  );

export const SendMessageSchema = z.object({
  chatId: z.string().uuid(),
  text: z.string().min(1, { message: 'Tin nhắn không được trống' }).max(1000),
});

export const CreateChatSchema = z.object({
  propertyId: z.string(),
  sellerId: z.string(),
});

export const CreateReviewSchema = z.object({
  propertyId: z.string(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(10, { message: 'Nhận xét tối thiểu 10 ký tự' }).max(500),
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;
export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;
export type CreatePropertyInput = z.infer<typeof CreatePropertySchema>;
export type SearchPropertyInput = z.infer<typeof SearchPropertySchema>;
export type SendMessageInput = z.infer<typeof SendMessageSchema>;
export type CreateReviewInput = z.infer<typeof CreateReviewSchema>;
