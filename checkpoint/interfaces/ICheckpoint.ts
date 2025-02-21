import {PhotoFile} from 'react-native-vision-camera';
import * as ImageManipulator from 'expo-image-manipulator';

export default interface ICheckpoint {
    file?: PhotoFile | undefined;
    fileCompressed?: ImageManipulator.ImageResult | undefined;
    checkType: 'checkin' | 'checkout';
    attend_id?: string;
    latitude?: string;
    longitude?: string;
    imageTemp?: string;
    title?: string;
    subtitle?: string;
    description?: string;
}
