
//Packages
import moment from 'moment';
import axios from 'axios';
import Fileutils from '../utils/Fileutils';

//Interfaces
import ICheckpoint from '../interfaces/ICheckpoint';

//Services
import { getToken } from '@/services/AuthService';

//Constants
import Dates from '@/constants/Dates';

//Utils
import Compressutils from '@/utils/Compressutils';

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/absen`;
const compressPercent = 0.5;
const compressWidth = 400;

export const check = async (username: string): Promise<any> => {

  const token = await getToken();
  try {    

    const response = await axios.get(`${API_URL}/check-by-email/${username}`, {
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

    const filePhoto = await Compressutils.photoFileToJPEG(checkinData.file, compressWidth, compressPercent);
    const fileUri   = filePhoto?.uri ? filePhoto?.uri as string : '';
    const filePath  = Fileutils.path(fileUri);
    const fileName = Fileutils.name(filePath);
    const fileType = Fileutils.type(filePath);

    const formData = new FormData();
    formData.append('upload', { uri: fileUri, type: fileType, name: fileName, });
    formData.append('latitude', checkinData.latitude as string);
    formData.append('longitude', checkinData.longitude as string);
    formData.append('imageTemp', checkinData.imageTemp as string);
    formData.append('checkin_title', 'HPTEST - ' + checkinData.title as string);
    formData.append('checkin_subtitle', 'HPTEST - ' + checkinData.subtitle as string);
    formData.append('checkin_description', 'HPTEST - ' + checkinData.description as string);

    const response = await axios.post(`${API_URL}/checkin`, formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

    return response;

  } catch (error) {

    console.log(error);  
    console.log('Checkin ERROR mas bro...');  

    return error;

  }

};

export const checkout = async (checkoutData: ICheckpoint): Promise<any> => {

  const token = await getToken();
  try {    

    const filePhoto = await Compressutils.photoFileToJPEG(checkoutData.file, compressWidth, compressPercent);
    const fileUri   = filePhoto?.uri ? filePhoto?.uri as string : '';
    const filePath  = Fileutils.path(fileUri);
    const fileName = Fileutils.name(filePath);
    const fileType = Fileutils.type(filePath);

    const formData = new FormData();
    formData.append('upload', { uri: fileUri, type: fileType, name: fileName, });
    formData.append('attend_id', checkoutData.attend_id as string);
    formData.append('latitude', checkoutData.latitude as string);
    formData.append('longitude', checkoutData.longitude as string);
    formData.append('imageTemp', checkoutData.imageTemp as string);
    formData.append('checkout_title', 'HPTEST - ' + checkoutData.title as string);
    formData.append('checkout_subtitle', 'HPTEST - ' + checkoutData.subtitle as string);
    formData.append('checkout_description', 'HPTEST - ' + checkoutData.description as string);

    const response = await axios.post(`${API_URL}/checkout`, formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      // console.log(response.data);  
      console.log('Checkout SUCCESS mas bro...');  
      return response;

  } catch (error) {

    console.log(error);
    console.log('Checkout ERROR mas bro...');  

    return error;

  }

};

export const historyByUserIdCheckpointPeriod = async (
  userName: string,
  startdt: string,
  enddt: string,
  history_media: string,
): Promise<any> => {

  const token = await getToken();
  try {    

    const formData = new FormData();
    formData.append('username', userName);
    formData.append('startdt', startdt);
    formData.append('enddt', enddt);
    formData.append('history_media', history_media);

    const response = await axios.post(`${API_URL}/check-history-post`, formData,
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

export const historyByUserIdCheckpointDate = async (
  userName: string,
  checkpointDate: moment.Moment,
  history_media: string,
): Promise<any> => {

  const token = await getToken();
  try {    

    const formData = new FormData();
    formData.append('username', userName);
    formData.append('checkpoint_date', checkpointDate.format(Dates.format.date));
    formData.append('history_media', history_media);

    const response = await axios.post(`${API_URL}/post-history-by-userid-checkpointdate`, formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

    return response;

  } catch (error: any) {

    console.error("Error fetching checkpoint history:", error);
    return error.response;

  }

};

const CheckpointProvider = { check, checkin, checkout, historyByUserIdCheckpointPeriod, historyByUserIdCheckpointDate };
export default CheckpointProvider;