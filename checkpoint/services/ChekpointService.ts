import mime from 'mime';
import axios from 'axios';
import ICheckpoint from '../interfaces/ICheckpoint';
import { getToken, getUsername } from './AuthService';
import Fileutils from '../utils/Fileutils';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
export const check = async (username: string): Promise<any> => {

  const token = await getToken();
  try {    

    const response = await axios.get(`${API_URL}/absen/check-by-email/${username}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',},
    });

    if (!response.data) return '';
  
    return response.data;

  } catch (error) {

    console.log(error);
    return error;

  }

};

export const checkin = async (checkinData: ICheckpoint): Promise<any> => {

  const token = await getToken();
  try {    

    const filePath = checkinData.file?.path as string;
    const fileUri = Fileutils.uri(filePath);
    const fileName = Fileutils.name(filePath);
    const fileType = Fileutils.type(filePath);
    
    const formData = new FormData();
    formData.append('upload', { uri: fileUri, type: fileType, name: fileName, });
    formData.append('latitude', checkinData.latitude as string);
    formData.append('longitude', checkinData.longitude as string);
    formData.append('imageTemp', checkinData.imageTemp as string);
    formData.append('checkin_title', 'HPTEST - ' + checkinData.checkin_title as string);
    formData.append('checkin_subtitle', 'HPTEST - ' + checkinData.checkin_subtitle as string);
    formData.append('checkin_description', 'HPTEST - ' + checkinData.checkin_description as string);

    const response = await axios.post(`${API_URL}/absen/checkin`, formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      console.clear();
      //console.log(response);
    return response;

  } catch (error) {

    return error;

  }

};

export const checkout = async (checkoutData: ICheckpoint): Promise<any> => {

  const token = await getToken();
  try {    

    const filePath = checkoutData.file?.path as string;
    const fileUri = Fileutils.uri(filePath);
    const fileName = Fileutils.name(filePath);
    const fileType = Fileutils.type(filePath);
    
    const formData = new FormData();
    formData.append('upload', { uri: fileUri, type: fileType, name: fileName, });
    formData.append('latitude', checkoutData.latitude as string);
    formData.append('longitude', checkoutData.longitude as string);
    formData.append('imageTemp', checkoutData.imageTemp as string);
    formData.append('checkout_title', 'HPTEST - ' + checkoutData.checkin_title as string);
    formData.append('checkout_subtitle', 'HPTEST - ' + checkoutData.checkin_subtitle as string);
    formData.append('checkout_description', 'HPTEST - ' + checkoutData.checkin_description as string);

    const response = await axios.post(`${API_URL}/absen/checkin`, formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

    return response;

  } catch (error) {

    return error;

  }

};
