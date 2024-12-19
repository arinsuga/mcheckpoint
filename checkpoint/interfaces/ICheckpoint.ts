import { CameraCapturedPicture } from "expo-camera";

export default interface ICheckpoint {
    upload?: CameraCapturedPicture[];
    checkType: 'checkin' | 'checkout';
    latitude?: string;
    longitude?: string;
    imageTemp?: string;
    checkin_title?: string;
    checkin_subtitle?: string;
    checkin_description?: string;
}
