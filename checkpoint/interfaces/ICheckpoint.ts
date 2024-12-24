import {PhotoFile} from 'react-native-vision-camera';

export default interface ICheckpoint {
    file?: PhotoFile | undefined;
    checkType: 'checkin' | 'checkout';
    latitude?: string;
    longitude?: string;
    imageTemp?: string;
    checkin_title?: string;
    checkin_subtitle?: string;
    checkin_description?: string;
}
