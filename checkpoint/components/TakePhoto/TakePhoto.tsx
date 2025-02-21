
//packages
import React, { useState, useRef, useEffect, } from 'react';
import { View, } from 'react-native';
import { Camera, useCameraDevice, PhotoFile, CameraDevice, } from 'react-native-vision-camera';
import * as ImageManipulator from 'expo-image-manipulator';

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
    const [photoCompressed, setPhotoCompressed] = useState<ImageManipulator.ImageResult | undefined>(undefined);

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

          const compressedPhotoResult = await ImageManipulator.manipulateAsync(
            `file://${photoResult?.path}`,
            [
              { resize: { width: 800 } }
            ],
            {
              compress: 0.3, format: ImageManipulator.SaveFormat.JPEG
            }
          );
          setPhotoCompressed(compressedPhotoResult);
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


    useEffect(() => {

      console.log('Inside takephoto - useEffect....')
      console.log('photoResult....');
      console.log(photo);

      console.log('compressedPhotoResult....');
      console.log(photoCompressed);



    }, [photoCompressed]);

    return (

          !photoCompressed ? 
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
          fileCompressed={photoCompressed}
          attendId={attendId}
          />

    )
}

export default TakePhoto
