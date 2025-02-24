import {PhotoFile} from 'react-native-vision-camera';

export default interface ICheckpoint {
    file?: PhotoFile | undefined;
    checkType: 'checkin' | 'checkout';
    attend_id?: string;
    latitude?: string;
    longitude?: string;
    imageTemp?: string;
    title?: string;
    subtitle?: string;
    description?: string;
}
