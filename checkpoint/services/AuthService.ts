
//Packages
import { BehaviorSubject, interval } from 'rxjs';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

//Interfaces
import IAuth, { IUser, IToken, IHeader, IClaims, IJWT, IRole } from '@/interfaces/IAuth';

//Constants
import StorageKey from '@/constants/StorageKeys';

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

    await AsyncStorage.setItem(StorageKey.auth, JSON.stringify(auth));
  
  } catch(e) {

    //throw error

  }


}

export const clearAuth = async () => {

  try {

    await AsyncStorage.removeItem(StorageKey.auth);
      
  } catch(e) {

    //throw error

  }

}

export const getAuth = async (): Promise<IAuth | null> => {

  let result: IAuth = { authenticated: false };

  try {

    const authString = await AsyncStorage.getItem(StorageKey.auth);
    const auth = JSON.parse(authString as string);
    const tokenInfo = await verifyToken(auth.token.token);
    
    result = { ...auth,  token: tokenInfo, authenticated: tokenInfo.status };

  } catch(e) {

    console.log('===== ERROR getAuth =====');
    console.log(e);

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

      const tokenString = token;
      const tokenArray = tokenString.split('.');
      const tokenHeader: IHeader = JSON.parse(atob(tokenArray[0]));
      const tokenPayload: IClaims = JSON.parse(atob(tokenArray[1]));
      const jwt: IJWT = {
        header: tokenHeader,
        payload: tokenPayload,
      }

      const auth: IAuth = {
        user: {
          username,
          roles: jwt.payload?.roles ? jwt.payload?.roles : [],
          email: jwt.payload?.prv ? jwt.payload?.prv.email : '',
        },
        token: {
          token: tokenString,
          status: true,
          code: 200,
          message: 'Token is valid',
        },
        jwt: jwt,
        authenticated: true
      };

      //Call storeAuth heare
      storeAuth(auth);

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
  const auth = await getAuth();
  const result = auth?.user?.username;
  return result;
};

export const getUser = async (): Promise<IUser> => {

  const auth = await getAuth();
  const result = auth?.user as IUser;

  return result;
};

export const getToken = async () => {

  const auth = await getAuth();
  const result = auth?.token ? auth?.token.token : '';

  return result;
};

export const getRefreshToken = async () => {
  const refreshToken = await AsyncStorage.getItem(StorageKey.refreshToken);
  return refreshToken;
};

export const refreshAuthToken = async () => {

  const auth = await getAuth();
  const tokenString = auth ? auth.token ? auth.token.token : '' : '';

  console.log('======= refreshAuthToken =======');
  console.log(auth);

  try {

    const formData = new FormData();
    const response = await axios.post(`${API_URL}/refresh`, formData, {
      headers: {
        'Authorization': `Bearer ${tokenString}`,
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
  
    });
  
    console.log('======= response =======');
    console.log(response.data);

    const { token } = response.data as { token: string };
    const tokenCurrent = { ...auth && auth.token, token };
  
    const authNew = { ...auth, token: tokenCurrent };
    
    await AsyncStorage.setItem(StorageKey.auth, JSON.stringify(authNew));
  
    return token;
      
  } catch(e) {
    
    console.log('======= ERROR =======');
    console.log(`${API_URL}/refresh-token`);
    console.log(e);

  }


};

export const verifyToken = (token: string):IToken => {

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
