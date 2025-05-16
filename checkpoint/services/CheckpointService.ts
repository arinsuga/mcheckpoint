
//Packages
import moment from 'moment';

//Interfaces
import ICheckpoint from '../interfaces/ICheckpoint';

//Providers
import CheckpointProvider from '@/providers/CheckpointProvider';


const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/absen`;
const compressPercent = 0.5;
const compressWidth = 400;
export const check = async (username: string): Promise<any> => {

  try {    

    const response = await CheckpointProvider.check(username);

    if (!response.data) return '';
  
    return response.data;

  } catch (error) {

    console.log(error);
    return error;

  }

};

export const checkin = async (checkinData: ICheckpoint): Promise<any> => {

  try {    

    const response = await CheckpointProvider.checkin(checkinData);

    return response;

  } catch (error) {

    console.log(error);  
    console.log('Checkin ERROR mas bro...');  

    return error;

  }

};

export const checkout = async (checkoutData: ICheckpoint): Promise<any> => {

  try {    

      const response = await CheckpointProvider.checkout(checkoutData);

      return response;

  } catch (error) {

    console.error(error);

    return error;

  }

};

export const checkinHistory = async ({userName, startdt, enddt, history_media}: {
  userName: string,
  startdt: moment.Moment,
  enddt: moment.Moment,
  history_media: string,
}): Promise<any> => {

  try {    

    const response = await CheckpointProvider.checkinHistory({userName, startdt, enddt, history_media});

    return response;

  } catch (error) {

    return error;

  }

};

export const historyByUserIdCheckpointDate = async ({userName, checkpointDate, history_media}: {
  userName: string,
  checkpointDate: moment.Moment,
  history_media: string,
}): Promise<any> => {

  try {    

    const response = await CheckpointProvider.historyByUserIdCheckpointDate({userName, checkpointDate, history_media});

    return response;

  } catch (error: any) {

    console.error("Error fetching checkpoint history:", error);
    return error.response;

  }

};
