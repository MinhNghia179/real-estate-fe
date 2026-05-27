# 🚀 Quick Start Guide

## 5 Minutes to Running App

### Step 1: Setup Firebase (5 min)

```bash
# Read the complete guide
cat FIREBASE_SETUP.md

# Copy and fill your credentials
cp .env.example .env.local
# Edit .env.local with your Firebase credentials
```

### Step 2: Start Expo

```bash
npm start
```

You'll see:

```
expo-router/entry, expo-router/entry, etc.

i  Expo CLI   Connected to the development server.
i  Starting Expo server...

› Press 'a' for Android
› Press 'i' for iOS
› Press 'w' for web
› Press 'r' to reload
› Press 'q' to quit
```

### Step 3: Run on Device/Emulator

**iOS** (requires Mac):

```bash
# Press 'i' in Expo CLI, or:
npm run ios
```

**Android** (requires Android emulator):

```bash
# Press 'a' in Expo CLI, or:
npm run android
```

**Web** (instant):

```bash
# Press 'w' in Expo CLI, or:
npm run web
```

## What You'll See

### First Screen: Login

```
Welcome Back
Sign in to your account

[Email input]
[Password input]
[Sign In button]

Don't have an account? Sign Up
Forgot Password?
```

### Test Credentials

1. **No account yet?** Click "Sign Up"
2. **Create test account:**
   - Name: Test User
   - Email: test@example.com
   - Password: Test1234
   - Confirm: Test1234

3. **Click Sign Up** → Should see home screen

## Home Screen Tabs

```
┌─────────────────────┐
│  Welcome to Real... │  ← Tab 1: Home
├─────────────────────┤
│ [Home] [Search]...  │  ← Tab icons at bottom
└─────────────────────┘
```

**4 Tabs:**

1. 🏠 **Home** - Property feed
2. 🔍 **Search** - Search properties
3. ❤️ **Saved** - Favorite properties
4. 👤 **Profile** - User profile

## File Structure

```
src/
├── screens/          ← LoginScreen, RegisterScreen
├── components/       ← Button, TextInput, PropertyCard
├── services/         ← Firebase auth, properties
├── config/           ← Firebase config, Zustand store
└── types/            ← TypeScript models

app/
├── (tabs)/          ← Tab navigation
├── login.tsx        ← Login route
└── register.tsx     ← Register route
```

## Next Steps

1. ✅ **Test Login/Register flow**
   - Create account
   - Login
   - See home screen
   - Logout

2. 🏠 **Build Home Screen**
   - List properties from Firestore
   - Add search filters
   - Show property details

3. 💬 **Add Chat**
   - Real-time messages
   - Chat list

4. 📸 **Image Upload**
   - Property images
   - User avatars

5. 🚀 **Deploy**
   - Build for iOS/Android
   - Submit to App Stores

## Debugging

**Check Errors:**

```bash
# Expo logs
npm start -- --clear

# Press 'j' for JavaScript debugger
# Press 'i' for iOS debugger
```

**Clear Cache:**

```bash
npm start -- --clear
```

**Reset Everything:**

```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm start -- --clear
```

## Common Issues

| Error                    | Fix                             |
| ------------------------ | ------------------------------- |
| Firebase not initialized | Check `.env.local` has all vars |
| Permission denied        | Check Firestore test mode is ON |
| Module not found         | Run `npm install` again         |
| Build fails              | Try `npm start -- --clear`      |

## Key Files

| File                     | Purpose                           |
| ------------------------ | --------------------------------- |
| `.env.local`             | Firebase credentials (secret!)    |
| `app.json`               | App config (iOS/Android settings) |
| `tsconfig.json`          | TypeScript config                 |
| `package.json`           | Dependencies                      |
| `src/config/firebase.ts` | Firebase initialization           |
| `src/config/store.ts`    | Zustand state                     |

## Development Tips

1. **Hot reload** - Changes auto-reload in Expo
2. **TypeScript** - Errors caught before running
3. **Validation** - Form inputs validated
4. **Error boundary** - Catches render errors
5. **Zustand** - Simple state management

## Resources

- 📖 [Expo Docs](https://docs.expo.dev)
- 🔥 [Firebase Docs](https://firebase.google.com/docs)
- ⚛️ [React Native](https://reactnative.dev)
- 🧩 [Zustand](https://github.com/pmndrs/zustand)

## Support

- Check [SETUP.md](./SETUP.md) for architecture
- Check [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for Firebase guide
- Check error messages in Expo CLI
- Use React Native Debugger for advanced debugging

---

**Ready? Let's go!** 🚀

```bash
npm start
```
