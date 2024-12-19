import axios from 'axios';
import ICheckpoint from '../interfaces/ICheckpoint';
import { getToken } from './AuthService';

const API_URL = process.env.EXPO_PUBLIC_API_URL;


export const checkin = async (checkinData: ICheckpoint) => {
  
  const token = await getToken();
  const response = await axios.post(`${API_URL}/checkin`, checkinData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

  return response;
};
