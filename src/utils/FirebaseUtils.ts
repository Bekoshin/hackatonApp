import AsyncStorage from '@react-native-community/async-storage';

export const getTokenFromAsyncStorage = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('firebase_token');
}

export const saveTokenToAsyncStorage = async (token: string) => {
  await AsyncStorage.setItem('firebase_token', token);
}
