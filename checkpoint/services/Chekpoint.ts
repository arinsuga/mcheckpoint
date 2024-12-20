import axios from 'axios';
import ICheckpoint from '../interfaces/ICheckpoint';
import { getToken } from './AuthService';

const API_URL = process.env.EXPO_PUBLIC_API_URL;


export const checkin = async (checkinData: ICheckpoint) => {

  console.log('checkinData', checkinData);
  
  const token = await getToken();
  try {    
    const response = await axios.post(`${API_URL}/absen/checkin`, checkinData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

    return response;

  } catch (error) {

    return error;
    
  }

};
