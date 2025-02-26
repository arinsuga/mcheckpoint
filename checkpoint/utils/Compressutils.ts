
import { PhotoFile } from 'react-native-vision-camera';
import * as ImageManipulator from 'expo-image-manipulator';

export const compressPhotoFileToJPEG = async (photo: PhotoFile | undefined): Promise<ImageManipulator.ImageResult | null> => {
        
    try {

      console.log('Inside compressPhotoFileToJPEG...');
      console.log(`file://${photo?.path}`);

      // const result = await ImageManipulator.manipulateAsync(
      //   `file://${photo?.path}`,
      //   [
      //     { resize: { width: 800 } }
      //   ],
      //   {
      //     compress: 0.3, format: ImageManipulator.SaveFormat.JPEG
      //   }
      // );

      const result = await ImageManipulator.manipulateAsync(
        `file://${photo?.path}`,
        [
          { resize: { width: 800 } }
        ],
        {
          compress: 0.5, format: ImageManipulator.SaveFormat.JPEG
        }
      );

      return result;

    } catch(e) {

      console.log(e);
      return null;

    }

}

const Compressutils = {

    photoFileToJPEG: compressPhotoFileToJPEG

}

export default Compressutils;