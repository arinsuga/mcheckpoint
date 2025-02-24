
import { PhotoFile } from 'react-native-vision-camera';
import * as ImageManipulator from 'expo-image-manipulator';

export const compressPhoto = async (photo: PhotoFile | undefined): Promise<ImageManipulator.ImageResult | null> => {
        
    try {


      const result = await ImageManipulator.manipulateAsync(
        `file://${photoResult?.path}`,
        [
          { resize: { width: 800 } }
        ],
        {
          compress: 0.3, format: ImageManipulator.SaveFormat.JPEG
        }
      );

      return result;

    } catch(e) {

      console.log(e);
      return null;

    }

}
export const photoUri = async (compressedPhoto: ImageManipulator.ImageResult | null): Promise<string | null> => {
        
    
    try {

        console.log(compressedPhoto?.uri);

        return '';
    } catch(e) {

        console.log(e);
        return null;

    }

      
}

export const photoPath = async (compressedPhoto: ImageManipulator.ImageResult | null): Promise<string | null> => {
        
    
    try {

        const uri = await photoUri(compressedPhoto);
        const path = uri?.replace('file://', '') as string;

        console.log(uri);

        return path;
    } catch(e) {

        console.log(e);
        return null;

    }

      
}

const Compressutils = {

    photo: compressPhoto,
    photoUri: photoUri,
    photoPath: photoPath

}

export default Compressutils;