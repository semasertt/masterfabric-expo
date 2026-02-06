// Learn more https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(projectRoot);

// Stub paths for optional dependencies
const sentryStub = path.resolve(projectRoot, 'metro-stubs/sentry-stub.js');
const firebaseStub = path.resolve(projectRoot, 'metro-stubs/firebase-stub.js');
const expoBatteryStub = path.resolve(projectRoot, 'metro-stubs/expo-battery-stub.js');
const expoAvStub = path.resolve(projectRoot, 'metro-stubs/expo-av-stub.js');
const expoWebBrowserStub = path.resolve(projectRoot, 'metro-stubs/expo-web-browser-stub.js');
const sliderStub = path.resolve(projectRoot, 'metro-stubs/slider-stub.js');

// Ensure linked workspaces resolve modules from the app's node_modules
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
];

// Map masterfabric-expo-core to use source files directly in development
config.resolver.extraNodeModules = {
  'masterfabric-expo-core': path.resolve(workspaceRoot, 'packages/masterfabric-expo-core/src'),
  '@sentry/react-native': sentryStub,
  'firebase': firebaseStub,
  'expo-battery': expoBatteryStub,
  'expo-av': expoAvStub,
  'expo-web-browser': expoWebBrowserStub,
  '@react-native-community/slider': sliderStub,
};

// Custom resolver for masterfabric-expo-core and optional dependencies
const originalResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Resolve masterfabric-expo-core to source TypeScript files
  if (moduleName === 'masterfabric-expo-core') {
    const sourcePath = path.resolve(workspaceRoot, 'packages/masterfabric-expo-core/src/index.ts');
    return {
      filePath: sourcePath,
      type: 'sourceFile',
    };
  }

  // Stub Sentry if not installed
  if (moduleName === '@sentry/react-native') {
    return {
      filePath: sentryStub,
      type: 'sourceFile',
    };
  }

  // Stub Firebase if not installed (handles firebase, firebase/app, firebase/auth, etc.)
  if (moduleName === 'firebase' || moduleName.startsWith('firebase/')) {
    return {
      filePath: firebaseStub,
      type: 'sourceFile',
    };
  }

  // Stub Expo Battery if not installed
  if (moduleName === 'expo-battery') {
    return {
      filePath: expoBatteryStub,
      type: 'sourceFile',
    };
  }

  // Stub Expo AV if not installed
  if (moduleName === 'expo-av') {
    return {
      filePath: expoAvStub,
      type: 'sourceFile',
    };
  }

  // Stub Expo Web Browser if not installed
  if (moduleName === 'expo-web-browser') {
    return {
      filePath: expoWebBrowserStub,
      type: 'sourceFile',
    };
  }

  // Stub React Native Community Slider if not installed
  if (moduleName === '@react-native-community/slider') {
    return {
      filePath: sliderStub,
      type: 'sourceFile',
    };
  }

  // For other modules, use default resolution
  if (originalResolveRequest) {
    return originalResolveRequest(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

// Watch the monorepo packages folder
config.watchFolders = [
  path.resolve(workspaceRoot, 'packages'),
];

module.exports = config;
