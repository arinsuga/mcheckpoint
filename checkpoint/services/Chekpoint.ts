import axios from 'axios';
import ICheckpoint from '../interfaces/ICheckpoint';
import { getToken } from './AuthService';

const API_URL = process.env.EXPO_PUBLIC_API_URL;


export const checkin = async (checkinData: ICheckpoint) => {

  const token = await getToken();
  try {    

    const formData = new FormData();
    const fileUri = `file://${checkinData.file?.path}`;
    const fileURL = new URL(fileUri);
    const upload = await fetch(fileUri);
    const fileBlob = await upload.blob();
    const fileName = fileURL.pathname.split('/').pop();
    console.log({ formData, fileUri, fileURL, upload, fileName });

    formData.append('upload', fileBlob, fileName );
    formData.append('latitude', checkinData.latitude as string);
    formData.append('longitude', checkinData.longitude as string);
    formData.append('imageTemp', checkinData.imageTemp as string);
    formData.append('checkin_title', checkinData.checkin_title as string);
    formData.append('checkin_subtitle', checkinData.checkin_subtitle as string);
    formData.append('checkin_description', checkinData.checkin_description as string);

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
