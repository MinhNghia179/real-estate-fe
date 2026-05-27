# 🏠 Real Estate App

A modern mobile application for buying, selling, and renting real estate properties, built with React Native and Expo.

## 🎯 Tech Stack

### Frontend (React Native)

| Component     | Technology                                          |
| ------------- | --------------------------------------------------- |
| **Framework** | React Native (Expo) - Single code for iOS + Android |
| **Routing**   | Expo Router - File-based routing                    |
| **Language**  | TypeScript                                          |
| **State**     | React Hooks + Zustand ready                         |

### Backend (Node.js)

| Component     | Technology                                          |
| ------------- | --------------------------------------------------- |
| **Runtime**   | Node.js                                             |
| **Auth**      | Firebase Authentication - Email/password            |
| **Database**  | Firestore - Property data, user profiles            |
| **Chat**      | Firebase Realtime Database - Real-time messages     |
| **Storage**   | Firebase Cloud Storage - Images, documents          |
| **API**       | REST/GraphQL endpoints for data operations          |

## 📱 Platforms

- ✅ iOS (via Expo)
- ✅ Android (via Expo)
- ✅ Web (Development)

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm/yarn
- Expo CLI: `npm install -g expo-cli`
- Firebase account

### Installation

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Add your Firebase config to .env.local

# Start development
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## 📁 Project Structure

See [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) for detailed folder structure and architecture.

## 🎨 Key Features

### Current

- Tab-based navigation (Home, Search, Saved, Profile)
- Firebase integration ready
- TypeScript support
- Modern UI components
- Environment configuration

### Coming Soon

- Property listing & search
- Real-time chat
- User profiles
- Favorites
- Image upload
- Map integration

## 📦 Key Dependencies

```json
{
  "expo": "~51.0.0",
  "react": "18.2.0",
  "react-native": "0.74.0",
  "expo-router": "^3.4.0",
  "firebase": "^10.8.0",
  "zustand": "^4.4.7"
}
```

## 🔧 Development

### Scripts

```bash
npm start        # Start Expo
npm run ios      # Run on iOS simulator
npm run android  # Run on Android emulator
npm run web      # Run on web
npm run test     # Run tests
npm run lint     # Check code quality
npm run type-check # TypeScript validation
```

### Code Quality

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type safety
- **Jest** - Unit testing

## 📋 Architecture

```
┌─────────────────────────────────────────┐
│   Frontend (React Native + Expo)        │
│   ├── User Interface Components         │
│   ├── Expo Router Navigation            │
│   ├── Custom Hooks (Business Logic)     │
│   ├── Zustand Store (State Management)  │
│   └── Services (API & Firebase SDK)     │
└────────────┬────────────────────────────┘
             │
             │ REST/GraphQL API Calls
             │
┌────────────▼────────────────────────────┐
│   Backend (Node.js Server)              │
│   ├── Express/Fastify Server            │
│   ├── REST/GraphQL API Endpoints        │
│   ├── Business Logic Layer              │
│   └── Firebase SDK Integration          │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│   Firebase Services                     │
│   ├── Firestore Database                │
│   ├── Realtime Database (Chat)          │
│   ├── Cloud Storage (Images/Docs)       │
│   └── Authentication Service            │
└─────────────────────────────────────────┘
```

### Frontend Layers

1. **UI Layer** - Components and screens
2. **Hook Layer** - Business logic & state
3. **Service Layer** - API calls & Firebase SDK
4. **Config Layer** - Firebase setup & constants

### Backend Layers

1. **API Layer** - REST/GraphQL endpoints
2. **Business Logic Layer** - Data processing & validation
3. **Firebase Service Layer** - Firebase operations
4. **Config Layer** - Firebase setup & environment

## 🔐 Firebase Setup

1. Create project at [firebase.google.com](https://firebase.google.com)
2. Enable:
   - Authentication (Email/Password)
   - Firestore Database
   - Realtime Database
   - Cloud Storage
3. Copy config to `.env.local`

## 🧪 Testing

```bash
npm run test              # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
```

## 📚 Documentation

- **[Project Summary](./PROJECT_SUMMARY.md)** - Architecture, structure, and setup
- **[Firebase Setup](./FIREBASE_SETUP.md)** - Step-by-step Firebase guide
- **[Firebase Docs](https://firebase.google.com/docs)**
- **[Expo Docs](https://docs.expo.dev)**
- **[React Native Docs](https://reactnative.dev)**

## 🎓 Best Practices

- Small, focused components (<400 lines)
- Proper error handling
- Immutable state updates
- Comprehensive testing
- Clear naming conventions
- Type-safe code

## 📝 Git Workflow

```bash
git checkout -b feature/your-feature
# Make changes
git commit -m "feat: description"
git push origin feature/your-feature
# Create pull request
```

## 🐛 Troubleshooting

### Clear Expo cache

```bash
npm start -- --clear
```

### Rebuild node_modules

```bash
rm -rf node_modules package-lock.json
npm install
```

### Check Expo status

```bash
expo diagnostics
```

## 📈 Performance Tips

- Use React.memo for expensive components
- Lazy load images
- Optimize Firebase queries
- Implement pagination
- Use native modules for heavy tasks

## 🚀 Deployment

### Build

```bash
eas build --platform ios
eas build --platform android
```

### Submit to App Stores

```bash
eas submit
```

## 📞 Support

- Check [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) for architecture
- Review error logs in Expo CLI
- Check Firebase console
- Use React Native Debugger

## 📄 License

Private project

## 👨‍💻 Author

Nguyen Minh Nghia
