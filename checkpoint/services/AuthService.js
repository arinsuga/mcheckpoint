import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

export const login = async (username, password) => {
//  const response = await axios.post(`${API_URL}/auth/login`, { username, password });

    const API_URL = process.env.EXPO_PUBLIC_API_URL;
    const response = await axios.post(`${API_URL}/login`, { email: username, password });

    // const { token, refreshToken } = response.data;
    const { token } = response.data;

    console.log('token', token);

    const tokenX = await getToken();
    console.log('tokenX', tokenX);

    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('refreshToken', 'refreshToken');
    // await AsyncStorage.setItem('refreshToken', refreshToken);
};

export const logout = async () => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('refreshToken');
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
