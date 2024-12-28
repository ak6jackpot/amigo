import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dimensions} from 'react-native';
import {functionDataStore, userDataStore, itineraryDataStore} from './store';

export const screenHeight = Dimensions.get('window').height;
export const screenWidth = Dimensions.get('window').width;

export const clearAllData = () => {
  return new Promise<void>((resolve, reject) => {
    AsyncStorage.clear()
      .then(() => {
        console.log('// Clearing All Data');
        itineraryDataStore.reset();
        userDataStore.reset();
        functionDataStore.reset;
        AsyncStorage.setItem('firstTimeAppOpen', 'true');
        resolve();
      })
      .catch(error => {
        console.error('// Error clearing data:', error);
        reject(error);
      });
  });
};

export function throttle(func: () => void, limit: number) {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
