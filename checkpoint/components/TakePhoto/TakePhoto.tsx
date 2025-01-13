
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

    //Senopati
    const [latitude, setLatitude] = useState('-6.2325772'); //onlyfortest
    const [longitude, setLongitude] = useState('106.8106801'); //onlyfortest
    const [action, setAction] = useState<'checkin' | 'checkout'>('checkin');  
    const [actionButton, setActionButton] = useState<'Checkin' | 'Checkout' | ''>('');
    const [attendId, setAttendId] = useState<string>('');
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

            console.log(checkResult.data);

            const input = {
              action: checkResult.data.action,
              action_button: checkResult.data.action_button,
              attendId: checkResult.data.user.attend_id,
            };
            console.log(input);

            if (input.action == 'checkout') {
              setLatitude('-6.2423441'); //onlyfortest
              setLongitude('106.8051293'); //onlyfortest
            }

            setAction(checkResult.data.action);
            setActionButton(checkResult.data.action_button);
            setAttendId(checkResult.data.user.attend_id);
        }
        fetchData();

    }, [actionButton]);

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
          <CheckpointForm
          action={action}
          actionButton={actionButton}
          file={photo}
          attendId={attendId}
          latitude={latitude}
          longitude={longitude}
          />

    )
}

export default TakePhoto
