const dotEnv = require('dotenv');

try {
     if (!process.env.TARGET_ENV) {
          dotEnv.config({ path: '.env.dev' });
     } else {
          dotEnv.config({ path: '.env.production' });
     }
} catch (error) {
     dotEnv.config();
}

/**
 * @param config {import('expo/config').ExpoConfig}
 * @returns {import('expo/config').ExpoConfig}
 */

export default () => {
     return {
          name: 'lobby',
          slug: 'lobby',
          version: '1.0.0',
          orientation: 'portrait',
          icon: './assets/images/icon.png',
          userInterfaceStyle: 'light',
          plugins: [
               [
                    'expo-barcode-scanner',
                    {
                         cameraPermission:
                              'Permitir a $(PRODUCT_NAME) acceso a la cámara.',
                    },
               ],
               [
                    'expo-notifications',
                    {
                         icon: './assets/images/icon.png',
                         color: '#ffffff',
                    },
               ],
          ],
          splash: {
               image: './assets/images/splash.png',
               resizeMode: 'cover',
               backgroundColor: '#ffffff',
          },
          assetBundlePatterns: ['*/'],
          ios: {
               supportsTablet: true,
               bundleIdentifier: 'com.sv.davivienda.lobby',
               buildNumber: '1',
               infoPlist: {
                    NSCameraUsageDescription:
                         'Permitir a $(PRODUCT_NAME) acceso a la cámara.',
               },
          },
          android: {
               adaptiveIcon: {
                    foregroundImage: './assets/images/adaptive-icon.png',
                    backgroundColor: '#ffffff',
               },
               package: 'com.sv.davivienda.lobby',
               googleServicesFile: './google-services.json',
               versionCode: 1,
               permissions: ['android.permission.CAMERA'],
          },
          web: {
               favicon: './assets/images/icon.png',
          },
          extra: {
               eas: {
                    projectId: 'b325d5e2-f7ec-4d16-aca9-374cfb688e20',
               },
               API_URL: process.env.API_URL,
          },
          owner: 'dev.julioaguilar',
     };
};
