# 📋 Formik Guide for Real Estate App

## ✅ Setup Done!

Installed:

- ✅ `formik` - Form state management
- ✅ `zod` - Validation (already have)
- ✅ `src/schemas/index.ts` - All validation schemas

---

## 🚀 Quick Usage

```tsx
import { Formik } from 'formik';

import { LoginSchema } from '@schemas';

<Formik
  initialValues={{ email: '', password: '' }}
  validationSchema={LoginSchema}
  onSubmit={(values) => {
    // Submit values
  }}
>
  {({ handleChange, values, errors, handleSubmit, isSubmitting }) => (
    <View>
      <TextInput value={values.email} onChangeText={handleChange('email')} error={errors.email} />
      <Button onPress={handleSubmit} label="Submit" />
    </View>
  )}
</Formik>;
```

---

## 📚 Available Schemas

All from `src/schemas/index.ts`:

```tsx
// Auth
LoginSchema;
RegisterSchema;
ForgotPasswordSchema;
UpdateProfileSchema;

// Property
CreatePropertySchema;
UpdatePropertySchema;
SearchPropertySchema;

// Chat & Review
SendMessageSchema;
CreateChatSchema;
CreateReviewSchema;
```

---

## ✨ Formik Props

| Prop               | Type       | Purpose                      |
| ------------------ | ---------- | ---------------------------- |
| `initialValues`    | Object     | Form starting values         |
| `validationSchema` | Zod Schema | Validation rules             |
| `onSubmit`         | Function   | Handle form submission       |
| `validate`         | Function   | Custom validation (optional) |

---

## 🎯 Example: Property Form

```tsx
import { Formik } from 'formik';

import { CreatePropertySchema } from '@schemas';

<Formik
  initialValues={{
    title: '',
    description: '',
    price: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    location: {
      address: '',
      city: '',
      latitude: '',
      longitude: '',
    },
    images: [],
  }}
  validationSchema={CreatePropertySchema}
  onSubmit={async (values, { setSubmitting }) => {
    try {
      await propertyService.createProperty(values);
      Alert.alert('Success', 'Property created!');
    } catch (error) {
      Alert.alert('Error', 'Failed to create property');
    } finally {
      setSubmitting(false);
    }
  }}
>
  {({ handleChange, values, errors, handleSubmit, isSubmitting }) => (
    <ScrollView>
      <TextInput
        label="Title"
        value={values.title}
        onChangeText={handleChange('title')}
        error={errors.title}
      />
      <TextInput
        label="Price"
        keyboardType="number-pad"
        value={values.price}
        onChangeText={handleChange('price')}
        error={errors.price}
      />
      <Button onPress={handleSubmit} label="Create" />
    </ScrollView>
  )}
</Formik>;
```

---

## 🔄 Form State Access

Inside Formik render function:

```tsx
{({
  values,           // Current form values
  errors,           // Validation errors
  touched,          // Which fields were touched
  handleChange,     // Handle input change
  handleBlur,       // Handle input blur
  handleSubmit,     // Handle form submit
  isSubmitting,     // Is form submitting
  isValidating,     // Is form validating
  setFieldValue,    // Set specific field
  resetForm,        // Reset form
}) => (
  // Your form here
)}
```

---

## ✅ Updated Files

- ✅ `src/screens/LoginScreen.tsx` - Uses Formik
- ✅ `src/screens/FormikLoginExample.tsx` - Simple example
- ✅ `src/schemas/index.ts` - All schemas

---

## 🎯 No More Custom Stuff

**Removed (not needed):**

- ❌ `src/hooks/useValidation.ts`
- ❌ `src/screens/ValidationExampleScreen.tsx`
- ❌ `FORM_STATE_MANAGEMENT.md`
- ❌ `RHF_VS_MANUAL.md`

**Kept (useful):**

- ✅ `VALIDATION_GUIDE.md`
- ✅ `INTEGRATION_GUIDE.md`
- ✅ `LIBRARIES.md`
- ✅ `FIREBASE_SETUP.md`
- ✅ `QUICKSTART.md`

---

## 🚀 Ready to Go!

Just use:

```tsx
<Formik
  initialValues={...}
  validationSchema={YourSchema}
  onSubmit={handleSubmit}
>
  {/* Your form */}
</Formik>
```

Done! ✨
