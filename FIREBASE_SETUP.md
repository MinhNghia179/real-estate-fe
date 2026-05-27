# 🔥 Firebase Setup Guide

## 1️⃣ Create Firebase Project

1. Go to [firebase.google.com](https://firebase.google.com)
2. Click **"Go to console"** (top right)
3. Click **"Create a project"**
4. Enter project name: `real-estate-app`
5. Click **"Create project"** (accept defaults)
6. Wait for project to be created (~1 min)

## 2️⃣ Enable Firebase Services

### Authentication

1. Go to **Authentication** (left sidebar)
2. Click **"Get Started"**
3. Click **"Email/Password"**
4. Toggle **"Enable"** → **"Enable"** → **"Save"**

### Firestore Database

1. Go to **Firestore Database** (left sidebar)
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development)
4. Click **"Create"**
5. Select location closest to you
6. Click **"Create"**

### Realtime Database (for Chat)

1. Go to **Realtime Database** (left sidebar)
2. Click **"Create Database"**
3. Select **"Start in test mode"**
4. Choose same location as Firestore
5. Click **"Create"**

### Cloud Storage (for Images)

1. Go to **Storage** (left sidebar)
2. Click **"Get Started"**
3. Click **"Start in test mode"**
4. Choose same location
5. Click **"Create"**

## 3️⃣ Get Firebase Config

1. Click **"Project Settings"** (gear icon, top left)
2. Go to **"General"** tab
3. Scroll to **"Your apps"** section
4. Click **"Web"** icon (or create new app)
5. Choose name: `real-estate-web`
6. Click **"Register app"**
7. Copy the Firebase config object
8. **DO NOT commit this to git!**

## 4️⃣ Update Environment Variables

1. Open `.env.local` in your project:

```bash
cp .env.example .env.local
```

2. Copy these values from Firebase Console:

```
EXPO_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
EXPO_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
EXPO_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
EXPO_PUBLIC_FIREBASE_DATABASE_URL=https://YOUR_PROJECT_ID.firebaseio.com
```

**Example:**

```
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSyDIHmOpX1Fj5-8L7dK8pQ3zL5mN0hJk1sT
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=real-estate-app-12345.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=real-estate-app-12345
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=real-estate-app-12345.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
EXPO_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abc123def456
EXPO_PUBLIC_FIREBASE_DATABASE_URL=https://real-estate-app-12345.firebaseio.com
```

## 5️⃣ Firestore Security Rules (Test Mode)

For development, Firebase is in **test mode** (allows all reads/writes).

⚠️ **Before production**, update Security Rules:

```bash
# Go to Firestore → Rules tab
```

Example production rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }

    // Anyone can read properties
    match /properties/{propertyId} {
      allow read: if true;
      allow create, update: if request.auth != null && request.auth.uid == resource.data.owner;
      allow delete: if request.auth.uid == resource.data.owner;
    }

    // Chats between authenticated users
    match /chats/{chatId} {
      allow read: if request.auth.uid in resource.data.participantIds;
      allow create: if request.auth != null;
    }
  }
}
```

## 6️⃣ Realtime Database Rules (Test Mode)

For development, in **test mode**.

⚠️ **Before production**, update:

```
{
  "rules": {
    "messages": {
      "$chatId": {
        ".read": "root.child('chats').child($chatId).child('participantIds').child(auth.uid).exists()",
        ".write": "root.child('chats').child($chatId).child('participantIds').child(auth.uid).exists()"
      }
    }
  }
}
```

## 7️⃣ Verify Setup

Run the app:

```bash
npm run ios  # or android
```

Try to:

1. ✅ Register with email/password
2. ✅ Login
3. ✅ See home screen
4. ✅ Logout

## 🔒 Security Checklist

- [ ] `.env.local` is in `.gitignore` (never commit secrets)
- [ ] `EXPO_PUBLIC_*` are safe to share (public config)
- [ ] No hardcoded secrets in code
- [ ] Test mode rules are temporary
- [ ] Have production rules ready before deploying

## 🐛 Troubleshooting

### "Firebase app not initialized"

- Check `.env.local` has all required variables
- Restart Expo (`npm start -- --clear`)

### "Permission denied" errors

- Check Firestore/Realtime Database are in **test mode**
- Or update security rules to allow your operations

### "User not found after login"

- Check Authentication → Email/Password is **Enabled**
- Check Firestore has `users` collection (optional, created automatically)

### Images not uploading

- Check Cloud Storage is created
- Check `.env.local` has `FIREBASE_STORAGE_BUCKET`

## 📚 Resources

- [Firebase Console](https://console.firebase.google.com)
- [Firebase Docs](https://firebase.google.com/docs)
- [Firestore Guide](https://firebase.google.com/docs/firestore)
- [Real-time Database Guide](https://firebase.google.com/docs/database)
- [Cloud Storage Guide](https://firebase.google.com/docs/storage)

## ✅ Next Steps

After Firebase setup:

1. Create test user account
2. Run app and test auth flow
3. Test property creation (add test data)
4. Test chat functionality
5. Deploy to production with proper security rules
