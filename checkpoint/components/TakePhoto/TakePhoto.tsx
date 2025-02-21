
//packages
import React, { useState, useRef, useEffect, } from 'react';
import { View, } from 'react-native';
import { Camera, useCameraDevice, PhotoFile, CameraDevice, } from 'react-native-vision-camera';

//components
import CheckpointForm from '@/components/CheckpointForm/CheckpointForm';
import CheckpointCamera from '@/components/CheckpointCamera/CheckpointCamera';

//services
import { check } from '@/services/ChekpointService';
import { getUsername } from '@/services/AuthService';

const TakePhoto = () => {
    const [isCaptureWaiting, setIsCaptureWaiting] = useState(false);


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

            const input = {
              action: checkResult.data.action,
              action_button: checkResult.data.action_button,
              attendId: checkResult.data.user.attend_id,
            };

            setAction(checkResult.data.action);
            setActionButton(checkResult.data.action_button);
            setAttendId(checkResult.data.user.attend_id);

        }
        fetchData();

    }, [actionButton]);

    const capturePhoto = async () => {
        
        try {

          setIsCaptureWaiting(true);
          const photoResult = await cameraRef.current?.takePhoto({
            enableShutterSound: false,
          });

          setPhoto(photoResult);
          setIsCaptureWaiting(false);

        } catch(e) {

          console.log(e);

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
          <View style={{ flex: 1, justifyContent: 'center' }}>

            <CheckpointCamera
              viewCapturedImage={viewCapturedImage}
              capturePhoto={capturePhoto}
              toggleCameraFacing={toggleCameraFacing}
              cameraInfo={cameraInfo}
              isWaiting={isCaptureWaiting}
            />

          </View> :
          <CheckpointForm
          action={action}
          actionButton={actionButton}
          file={photo}
          attendId={attendId}
          />

    )
}

export default TakePhoto
