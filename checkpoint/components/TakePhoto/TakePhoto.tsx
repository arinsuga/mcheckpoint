
//packages
import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  PhotoFile,
} from 'react-native-vision-camera';
import { SafeAreaView } from 'react-native-safe-area-context';

//components
import FieldTextInput from '@/components/FieldTextInput/FieldTextInput';
import FieldMultilineTextInput from '@/components/FieldMultilineTextInput/FieldMultilineTextInput';
import CheckpointForm from '@/components/CheckpointForm/CheckpointForm';
import CheckpointCamera from '@/components/CheckpointCamera/CheckpointCamera';
import Icon from '@/components/Icon/Icon';

//constants
import { Colors } from '@/constants/Colors';

//interfaces
import ICameraInfoProps from '@/interfaces/ICameraInfoProps';

const TakePhoto = () => {
    const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>('front');
    const [photo, setPhoto] = useState<PhotoFile | undefined>(undefined);
    const cameraRef = useRef<Camera>(null);
    const phoneDevice = useCameraDevice(cameraPosition);

    const cameraInfo = {
      cameraRef: cameraRef,
      photo: true,
      device: phoneDevice,
      isActive: true,
      enableLocation: true,
    }

  useEffect(() => {

    console.log('useEffect child 1...logging photo');
    console.log(photo);
    
  }, [photo]);

  const capturePhoto = async () => {
      
      try {

        console.log('Start Capture...');
        const result = await cameraRef.current?.takePhoto({
          enableShutterSound: false,
        });
        
        console.log(`file://${result.path}`);


        setPhoto(result);

      } catch(e) {

        console.log('failed to capture photo ...');

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

        <CheckpointForm uri={ `file://${photo.path}`} />

  )
}

export default TakePhoto
