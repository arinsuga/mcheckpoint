import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import IUser from '@/interfaces/IUser';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const login = async (username?: string, password?: string) => {

    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('username');

    const response = await axios.post(`${API_URL}/login`, { email: username, password });
    const { token }: any = response.data;

    if (token) {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('refreshToken', 'refreshToken');
      await AsyncStorage.setItem('username', username as string);
    }

};

export const logout = async () => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('refreshToken');
};

export const getUsername = async () => {
  const token = await AsyncStorage.getItem('username');
  return token;
};

export const getToken = async () => {
  const token = await AsyncStorage.getItem('token');
  return token;
};

export const getRefreshToken = async () => {
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  return refreshToken;
};

export const refreshAuthToken = async () => {
  const refreshToken = await getRefreshToken();
  const response = await axios.post(`${API_URL}/auth/refresh-token`, { refreshToken });
  const { token } = response.data;
  await AsyncStorage.setItem('token', token);
  return token;
};

export const isAuthenticated = async () => {
  const token = await getToken();
  if (!token) return false;

  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  if (decodedToken.exp < currentTime) {
    try {
      await refreshAuthToken();
      return true;
    } catch (error) {
      await logout();
      return false;
    }
  }
  return true;
};
