
//Packages
import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

//Interfaces
import IUser from '@/interfaces/IUser';

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/auth`;
const JWT_SCRET = process.env.EXPO_PUBLIC_JWT_SCRET;

const authSubject = new BehaviorSubject<string | null>(null);
export const authObservable = () => authSubject.asObservable();

const clearToken = async () => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('refreshToken');
  await AsyncStorage.removeItem('username');
}


interface IAuthProps {
  username: string | null;
  token: string | null;
  status: boolean;
  message: string;

}

export const initializeAuth = async (): Promise<IAuthProps> => {

      const username = await getUsername();
      const token = await getToken();
      const authenticated = await verifyToken(token);

      return {
        username,
        token,
        status: authenticated.status,
        message: authenticated.message,
      }

}

export const login = async (username?: string, password?: string) => {

    await clearToken();
    authSubject.next(null);

    const response = await axios.post(`${API_URL}/login`, { email: username, password });
    const { token }: any = response.data;

    if (token) {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('refreshToken', 'refreshToken');
      await AsyncStorage.setItem('username', username as string);
      authSubject.next(token);
    }

};

export const logout = async () => {
  await clearToken();
  authSubject.next(null);
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
  const response = await axios.post(`${API_URL}/refresh-token`, { refreshToken });
  const { token } = response.data as { token: string };
  await AsyncStorage.setItem('token', token);
  return token;
};

export const verifyToken = (token: string | null) => {

  try {

    const decoded = jwtDecode(token as string);
    const currentTime = Date.now() / 1000;
    let result = {};
  

    if (decoded.exp && decoded.exp < currentTime) {

      return {
        status: false,
        message: 'Token expired',
      };
    }

    return {
      status: true,
      message: 'Token valid',
    };
  } catch (error) {

    return {
      status: false,
      message: 'Token Invalid',
    };
  }

};

export const isAuthenticated = async () => {

  const token = await getToken();
  if (!token) return false;

  const response = await axios.get(`${API_URL}/status`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',},
  });
  if (!response.data) return false;

  switch (response.data) {
    case 'token_expired':
      try {
        await refreshAuthToken();
        return true;
      } catch (error) {
        await logout();
        return false;
      }
    
    case 'token_invalid':
      await logout();
      return false;

    default:
      break;
  }

  return true;
};
