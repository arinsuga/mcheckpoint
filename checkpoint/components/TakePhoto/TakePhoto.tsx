
//packages
import { useState, useRef, useEffect, } from 'react';
import { Camera, useCameraDevice, PhotoFile, CameraDevice, } from 'react-native-vision-camera';
import { SafeAreaView, } from 'react-native-safe-area-context';

//components
import CheckpointForm from '@/components/CheckpointForm/CheckpointForm';
import CheckpointCamera from '@/components/CheckpointCamera/CheckpointCamera';

const TakePhoto = () => {

    const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>('front');
    const [photo, setPhoto] = useState<PhotoFile | undefined>(undefined);
    const cameraRef = useRef<Camera>(null);
    const phoneDevice = useCameraDevice(cameraPosition);
    const cameraDevice = phoneDevice as CameraDevice;

    const cameraInfo = {
      cameraRef: cameraRef,
      photo: true,
      device: cameraDevice,
      isActive: true,
      enableLocation: true,
    }

    useEffect(() => {
      
    }, [photo]);

    const capturePhoto = async () => {
        
        try {

          const result = await cameraRef.current?.takePhoto({
            enableShutterSound: false,
          });
          
          console.log(`file://${result.path}`);


          setPhoto(result);

        } catch(e) {


        }

    }

    const toggleCameraFacing = () => {
      setCameraPosition(current => current ==='front' ? 'back' : 'front');
    }

    const viewCapturedImage = () => {
      alert('TODO : Image Viewer');
    }

    return (

          !photo ? 
          <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>

            <CheckpointCamera
              viewCapturedImage={viewCapturedImage}
              capturePhoto={capturePhoto}
              toggleCameraFacing={toggleCameraFacing}
              cameraInfo={cameraInfo}
            />

          </SafeAreaView> :
          <CheckpointForm uri={ `file://${photo.path}`} upload={photo} />

    )
}

export default TakePhoto
