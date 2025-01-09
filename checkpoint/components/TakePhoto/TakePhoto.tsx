
//packages
import React, { useState, useRef, useEffect, } from 'react';
import { Camera, useCameraDevice, PhotoFile, CameraDevice, } from 'react-native-vision-camera';
import { SafeAreaView, } from 'react-native-safe-area-context';

//components
import CheckpointForm from '@/components/CheckpointForm/CheckpointForm';
import CheckpointCamera from '@/components/CheckpointCamera/CheckpointCamera';

//services
import { check,checkin, checkout } from '@/services/ChekpointService';
import { getUsername } from '@/services/AuthService';

const TakePhoto = () => {

    const [action, setAction] = useState<'checkin' | 'checkout'>('checkin');  
    const [actionbutton, setActionbutton] = useState<'Checkin' | 'Checkout'>('Checkin');  
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
        const fetchData = async () => {

          const username = await getUsername();
          const checkResult = await check(username as string); 
          const buttonText = checkResult.data.action_button

          setAction(buttonText == 'Checkin' ? 'checkin' : 'checkout');
          setActionbutton(buttonText);

        }
        fetchData();

    }, []);

    const capturePhoto = async () => {
        
        try {

          const photoResult = await cameraRef.current?.takePhoto({
            enableShutterSound: false,
          });

          setPhoto(photoResult);

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
          <CheckpointForm action={action} actionbutton={actionbutton} file={photo} />

    )
}

export default TakePhoto
