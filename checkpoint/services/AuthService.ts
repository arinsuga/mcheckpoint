
//Packages
import { BehaviorSubject, interval } from 'rxjs';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

//Interfaces
import IAuth, { IUser } from '@/interfaces/IAuth';

//Constants
import Auths from '@/constants/Auths';

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/auth`;
export const authSubject = new BehaviorSubject<IAuth | null>(null);
export const authObservable = () => authSubject.asObservable();

export const initAuth = async (): Promise<IAuth | null> => {
  return {
    authenticated: false
  }
}

export const storeAuth = async (auth: IAuth) => {

  try {

    await AsyncStorage.setItem(Auths.storageKey.token, auth.token?.token as string);
    await AsyncStorage.setItem(Auths.storageKey.refreshToken, 'refreshToken_dummy');
    await AsyncStorage.setItem(Auths.storageKey.userName, auth.user?.username as string);
    await AsyncStorage.setItem(Auths.storageKey.user, JSON.stringify(auth.user));
  
  } catch(e) {

    //throw error

  }


}

export const clearAuth = async () => {

  try {

    await AsyncStorage.removeItem(Auths.storageKey.token);
    await AsyncStorage.removeItem(Auths.storageKey.refreshToken);
    await AsyncStorage.removeItem(Auths.storageKey.userName);
    await AsyncStorage.removeItem(Auths.storageKey.user);
      
  } catch(e) {

    //throw error

  }

}

export const getAuth = async (): Promise<IAuth | null> => {

  let result: IAuth = { authenticated: false };

  try {

    const username = await getUsername();
    const token = await getToken();
    const tokenInfo = await verifyToken(token);
    const user = await getUser();
    
    result = {
      user: {
        username,
        roles: ['admin_roles'],
        email: '',
      },
      token: tokenInfo,
      authenticated: tokenInfo.status,
      };

  } catch(e) {

    result = { authenticated: false };

  }

  return result;
}

export const login = async (username?: string, password?: string): Promise<IAuth | null> => {

    await clearAuth();
    authSubject.next(null);

    const response = await axios.post(`${API_URL}/login`, { email: username, password });
    const { token }: any = response.data;

    if (token) {
      
      await AsyncStorage.setItem(Auths.storageKey.token, token);
      await AsyncStorage.setItem(Auths.storageKey.refreshToken, 'refreshToken');
      await AsyncStorage.setItem(Auths.storageKey.userName, username as string);
      //Call storeAuth heare

      const auth = {
        user: {
          username,
          roles: ['admin_roles'],
          email: '',
        },
        token: {
          token: token,
          status: true,
          message: 'Token valid',
        },
        authenticated: true
      };

      authSubject.next(auth);

      return auth;
    }

    return null;
};

export const logout = async () => {
  await clearAuth();
  authSubject.next({authenticated: false});
  return {authenticated: false};
};

export const getUsername = async () => {
  const token = await AsyncStorage.getItem(Auths.storageKey.userName);
  return token;
};

export const getUser = async (): Promise<IUser> => {
  const user = await AsyncStorage.getItem(Auths.storageKey.user) as string;

  return JSON.parse(user);
};

export const getToken = async () => {
  const token = await AsyncStorage.getItem(Auths.storageKey.token);
  return token;
};

export const getRefreshToken = async () => {
  const refreshToken = await AsyncStorage.getItem(Auths.storageKey.refreshToken);
  return refreshToken;
};

export const refreshAuthToken = async () => {
  const refreshToken = await getRefreshToken();
  const response = await axios.post(`${API_URL}/refresh-token`, { refreshToken });
  const { token } = response.data as { token: string };
  await AsyncStorage.setItem(Auths.storageKey.token, token);
  return token;
};

export const verifyToken = (token: string | null) => {

  try {

    const decoded = jwtDecode(token as string);
    const currentTime = Date.now() / 1000; //Convert ot milliseconds

    if (decoded.exp && decoded.exp < currentTime) {

      return {
        token: token,
        status: false,
        code: 402,
        message: 'Token is expired',
      };

    }

    return {
      token: token,
      status: true,
      code: 200,
      message: 'Token is valid',
    };
  } catch (error) {

    return {
      token: token,
      status: false,
      code: 401,
      message: 'Token is Invalid',
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
