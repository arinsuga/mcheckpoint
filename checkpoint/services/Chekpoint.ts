import axios from 'axios';
import ICheckpoint from '../interfaces/ICheckpoint';
import { getToken } from './AuthService';

const API_URL = process.env.EXPO_PUBLIC_API_URL;


export const checkin = async (checkinData: ICheckpoint) => {

  const token = await getToken();
  try {    

    const formData = new FormData();
    formData.append('upload', {
      uri: checkinData.upload?.uri,
      type: 'image/jpeg',
      name: 'tes.jpg',
    });
    formData.append('latitude', checkinData.latitude);
    formData.append('longitude', checkinData.longitude);
    formData.append('imageTemp', checkinData.imageTemp);
    formData.append('checkin_title', checkinData.checkin_title);
    formData.append('checkin_subtitle', checkinData.checkin_subtitle);
    formData.append('checkin_description', checkinData.checkin_description);

    const response = await axios.post(`${API_URL}/absen/checkin`, formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
//          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

    return response;

  } catch (error) {

    return error;

  }

};
