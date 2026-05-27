# 🔍 Validation Library Comparison for React Native

## 📊 Popular Validation Libraries

| Library           | Size | TypeScript     | Learning Curve | Best For             | Status           |
| ----------------- | ---- | -------------- | -------------- | -------------------- | ---------------- |
| **Zod** ⭐        | 13KB | ✅ First-class | Easy           | Type-safe, modern    | **✅ INSTALLED** |
| Yup               | 17KB | ✅ Good        | Easy           | React forms (Formik) | Mature           |
| Joi               | 30KB | ⚠️ Weak        | Hard           | Node.js/Backend      | Overkill for RN  |
| Valibot           | 5KB  | ✅ Excellent   | Easy           | Lightweight          | Newer            |
| io-ts             | 8KB  | ✅ Advanced    | Hard           | Functional           | Niche            |
| Superstruct       | 6KB  | ⚠️ Partial     | Medium         | Complex data         | Less popular     |
| fastest-validator | 8KB  | ⚠️ No          | Easy           | Performance          | Backend-focused  |

---

## 🏆 Our Choice: Zod ✅

**Why Zod is perfect for React Native:**

- ✅ TypeScript-first (infer types from schemas)
- ✅ Minimal bundle size (13KB)
- ✅ Fluent API (very readable)
- ✅ Composable schemas
- ✅ Excellent error messages
- ✅ Active community
- ✅ Already installed in your project!

---

## 🚀 Zod Examples

### 1. Basic Validation

```tsx
import { z } from 'zod';

// Define schema
const LoginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Min 8 characters'),
});

// Infer TypeScript type automatically
type LoginInput = z.infer<typeof LoginSchema>;
// Result: { email: string; password: string }

// Validate
try {
  const data = LoginSchema.parse({
    email: 'user@example.com',
    password: 'password123',
  });
  console.log('Valid!', data);
} catch (error) {
  console.error('Validation failed:', error.issues);
}
```

### 2. React Form Integration

```tsx
// src/screens/LoginScreen.tsx
import { z } from 'zod';

import { useState } from 'react';

const LoginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Min 8 characters'),
});

type LoginInput = z.infer<typeof LoginSchema>;

export const LoginScreen = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    const result = LoginSchema.safeParse(formData);

    if (!result.success) {
      // Build error map
      const errorMap = result.error.issues.reduce(
        (acc, issue) => {
          const path = issue.path[0];
          acc[String(path)] = issue.message;
          return acc;
        },
        {} as Record<string, string>
      );

      setErrors(errorMap);
      return;
    }

    // Valid data
    console.log('Submitting:', result.data);
  };

  return (
    <View>
      <TextInput
        value={formData.email}
        onChangeText={(text) => {
          setFormData({ ...formData, email: text });
          if (errors.email) setErrors({ ...errors, email: '' });
        }}
        error={errors.email}
      />
      <TextInput
        value={formData.password}
        onChangeText={(text) => {
          setFormData({ ...formData, password: text });
          if (errors.password) setErrors({ ...errors, password: '' });
        }}
        error={errors.password}
        secureTextEntry
      />
      <Button onPress={handleSubmit} label="Login" />
    </View>
  );
};
```

### 3. Complex Validation

```tsx
// Property creation validation
const PropertySchema = z.object({
  title: z.string().min(5, 'Min 5 chars').max(100, 'Max 100 chars'),

  description: z.string().min(20, 'Describe at least 20 chars').max(1000, 'Max 1000 chars'),

  price: z.number().positive('Price must be positive').int('Price must be whole number'),

  bedrooms: z.number().int().min(0).max(10),
  bathrooms: z.number().int().min(0).max(10),
  area: z.number().positive('Area must be positive'),

  location: z.object({
    address: z.string().min(5),
    city: z.string().min(2),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
  }),

  images: z.array(z.string().url()).min(1, 'At least 1 image required'),

  amenities: z.array(z.enum(['wifi', 'parking', 'pool', 'gym', 'ac'])).optional(),

  owner: z.string().uuid('Invalid owner ID'),
});

type Property = z.infer<typeof PropertySchema>;

// Validate
const result = PropertySchema.safeParse(propertyData);
if (!result.success) {
  // Handle errors
  result.error.issues.forEach((issue) => {
    console.error(`${issue.path.join('.')}: ${issue.message}`);
  });
} else {
  // Submit to Firebase
  await propertyService.createProperty(result.data);
}
```

### 4. Conditional Validation

```tsx
// Validate based on property type
const PropertySchema = z
  .object({
    type: z.enum(['apartment', 'house', 'commercial']),
    bedrooms: z.number().optional(),
    // Only require bedrooms for apartments/houses
  })
  .refine(
    (data) => {
      if (data.type === 'commercial') return true; // Commercial doesn't need bedrooms
      return data.bedrooms !== undefined && data.bedrooms > 0;
    },
    {
      message: 'Bedrooms required for residential properties',
      path: ['bedrooms'],
    }
  );
```

### 5. Custom Validation

```tsx
// Email already exists validation
const UserSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
  })
  .refine(
    async (data) => {
      const exists = await userService.emailExists(data.email);
      return !exists;
    },
    {
      message: 'Email already registered',
      path: ['email'],
    }
  );

// With async validation
const result = await UserSchema.parseAsync(formData);
```

### 6. Using with React Hook Form

```tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const LoginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8),
});

export const LoginWithForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register('email')} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}

      <input {...register('password')} type="password" placeholder="Password" />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">Login</button>
    </form>
  );
};
```

### 7. Building Reusable Validators

```tsx
// src/utils/validators.ts
import { z } from 'zod';

// Common validators
export const Validators = {
  email: z.string().email('Invalid email address'),

  password: z
    .string()
    .min(8, 'Password must be 8+ characters')
    .regex(/[A-Z]/, 'Must contain uppercase')
    .regex(/[a-z]/, 'Must contain lowercase')
    .regex(/[0-9]/, 'Must contain number'),

  phone: z.string().regex(/^[0-9]{10,11}$/, 'Invalid phone number'),

  url: z.string().url('Invalid URL'),

  positiveNumber: z.number().positive('Must be positive'),

  nonEmptyString: z.string().min(1, 'Required'),
};

// Combine validators
export const LoginSchema = z.object({
  email: Validators.email,
  password: z.string().min(8, 'Min 8 characters'),
});

export const RegisterSchema = z
  .object({
    email: Validators.email,
    password: Validators.password,
    confirmPassword: z.string(),
    phone: Validators.phone.optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const PropertySchema = z.object({
  title: Validators.nonEmptyString.max(100),
  description: Validators.nonEmptyString.max(1000),
  price: Validators.positiveNumber,
  images: z.array(Validators.url).min(1),
});
```

---

## 📋 Common Validation Patterns

### Email Validation

```tsx
const schema = z.object({
  email: z.string().email('Invalid email').toLowerCase().trim(),
});
```

### Password Strength

```tsx
const schema = z.object({
  password: z
    .string()
    .min(8, 'Min 8 characters')
    .regex(/[A-Z]/, 'Need uppercase')
    .regex(/[a-z]/, 'Need lowercase')
    .regex(/[0-9]/, 'Need number')
    .regex(/[!@#$%]/, 'Need special char'),
});
```

### Phone Number

```tsx
const schema = z.object({
  phone: z
    .string()
    .regex(/^[0-9]{10,11}$/, 'Invalid phone')
    .transform((val) => val.replace(/\D/g, '')), // Remove non-digits
});
```

### Date Validation

```tsx
const schema = z.object({
  birthDate: z
    .string()
    .refine((date) => new Date(date) < new Date(), 'Birth date must be in the past'),
});
```

### Array Validation

```tsx
const schema = z.object({
  tags: z.array(z.string()).min(1, 'At least 1 tag required'),
  images: z.array(
    z.object({
      url: z.string().url(),
      title: z.string(),
    })
  ),
});
```

### Optional vs Nullable

```tsx
// Optional: field can be missing
const schema = z.object({
  nickname: z.string().optional(), // undefined allowed
})

// Nullable: field can be null
const schema = z.object({
  middleName: z.string().nullable(), // null allowed
})

// Both
const schema = z.object({
  middleName: z.string().optional().nullable(),
})
```

---

## 🎯 For Your Real Estate App

### Complete Validation Setup

```tsx
// src/schemas/index.ts
import { z } from 'zod';

// User schemas
export const LoginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Min 8 characters'),
});

export const RegisterSchema = z.object({
  name: z.string().min(2, 'Min 2 characters').max(50),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Min 8 characters'),
  phone: z.string().regex(/^[0-9]{10,11}$/, 'Invalid phone'),
});

export const UpdateProfileSchema = z.object({
  name: z.string().min(2).max(50),
  phone: z.string().regex(/^[0-9]{10,11}$/),
  bio: z.string().max(500).optional(),
  avatar: z.string().url().optional(),
});

// Property schemas
export const CreatePropertySchema = z.object({
  title: z.string().min(5, 'Min 5 chars').max(100),
  description: z.string().min(20, 'Min 20 chars').max(1000),
  price: z.number().positive('Price must be positive'),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().int().min(0),
  area: z.number().positive(),

  location: z.object({
    address: z.string().min(5),
    city: z.string().min(2),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
  }),

  images: z.array(z.string().url()).min(1, 'At least 1 image'),
  amenities: z.array(z.string()).optional(),
});

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
      if (data.minPrice && data.maxPrice) {
        return data.minPrice <= data.maxPrice;
      }
      return true;
    },
    { message: 'Min price must be less than max price' }
  );

// Chat schemas
export const SendMessageSchema = z.object({
  chatId: z.string().uuid(),
  text: z.string().min(1, 'Message cannot be empty').max(1000),
});

// Type exports
export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type CreatePropertyInput = z.infer<typeof CreatePropertySchema>;
export type SearchPropertyInput = z.infer<typeof SearchPropertySchema>;
export type SendMessageInput = z.infer<typeof SendMessageSchema>;
```

### Usage in Services

```tsx
// src/services/userService.ts
import { RegisterInput, RegisterSchema } from '@schemas';

export const userService = {
  register: async (data: RegisterInput) => {
    // Data is already type-safe and validated!
    const validated = RegisterSchema.parse(data);

    // Submit to Firebase
    const user = await authService.signUp(validated);
    return user;
  },

  updateProfile: async (userId: string, data: unknown) => {
    const validated = UpdateProfileSchema.parse(data);
    // Update with confidence
    await db.users.update(userId, validated);
  },
};
```

---

## 🔒 Server-Side Validation (Firebase Functions)

```tsx
// Can use same schemas on backend!
// firebase/functions/index.js
import { z } from 'zod';

import { RegisterSchema } from '../src/schemas';

exports.register = functions.https.onCall(async (data) => {
  // Validate before processing
  const result = RegisterSchema.safeParse(data);

  if (!result.success) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Validation failed',
      result.error.issues
    );
  }

  // Process validated data
  const user = await createUser(result.data);
  return { success: true, user };
});
```

---

## ✅ Validation Checklist

For each form/input:

- [ ] Define schema with Zod
- [ ] Infer TypeScript type
- [ ] Handle validation errors
- [ ] Show user-friendly messages
- [ ] Disable submit during validation
- [ ] Test edge cases

---

## 🚀 Why Zod Over Others

| Feature          | Zod          | Yup       | Joi          |
| ---------------- | ------------ | --------- | ------------ |
| TypeScript Infer | ✅           | ⚠️        | ❌           |
| Bundle Size      | ✅ 13KB      | ⚠️ 17KB   | ❌ 30KB      |
| Error Messages   | ✅ Excellent | ✅ Good   | ✅ Good      |
| Async Validation | ✅ Yes       | ✅ Yes    | ✅ Yes       |
| Composability    | ✅ Excellent | ✅ Good   | ⚠️ Okay      |
| Learning Curve   | ✅ Easy      | ✅ Easy   | ❌ Hard      |
| Community        | ✅ Growing   | ✅ Mature | ⚠️ Declining |

---

## 📚 Resources

- [Zod Documentation](https://zod.dev)
- [Zod Examples](https://github.com/colinhacks/zod/tree/main/examples)
- [Zod + React Hook Form](https://github.com/react-hook-form/resolvers)

---

**Recommendation: Stick with Zod!** ✅  
Already installed, perfect for React Native, type-safe, lightweight, and comprehensive.

Need help setting up validation for a specific form? 🤔
