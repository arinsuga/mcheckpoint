import mime from 'mime';
import axios from 'axios';
import ICheckpoint from '../interfaces/ICheckpoint';
import { getToken } from './AuthService';

const API_URL = process.env.EXPO_PUBLIC_API_URL;


export const checkin = async (checkinData: ICheckpoint) => {

  const token = await getToken();
  try {    

    const formData = new FormData();
    const filePath = checkinData.file?.path as string;
    const fileUri = `file://${filePath}`;
    const fileURL = new URL(fileUri);
    const upload = await fetch(fileUri);
    const fileName = fileURL.pathname.split('/').pop();
    const fileType = mime.getType(filePath);
    //console.log({ formData, fileUri, fileURL, upload, fileName, filePath, fileType });

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
