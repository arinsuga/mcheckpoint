import { CameraCapturedPicture } from "expo-camera";

export default interface ICheckpoint {
    files: CameraCapturedPicture[],
    checkType: 'checkin' | 'checkout',
    description: string,
}
