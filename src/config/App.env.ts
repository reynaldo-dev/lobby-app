import constants from 'expo-constants';

export function getApiURL() {
     if (constants.expoConfig?.extra?.['API_URL']) {
          return constants.expoConfig.extra['API_URL'] as string;
     }
     return 'http://localhost:4000';
}
