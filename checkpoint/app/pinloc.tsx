import {
  useState,
  useEffect,
} from 'react';
import {
  SafeAreaView,
} from 'react-native';
import { Camera } from 'react-native-vision-camera';
import * as Location from 'expo-location';

import RequestPermission from '@/components/RequestPermission/RequestPermission';
import TakePhoto from '@/components/TakePhoto/TakePhoto';

export default function Pinloc() {
  const [allowCamera, setAllowCamera] = useState(Camera.getCameraPermissionStatus());
  const [allowLocation, setAllowLocation] = useState<Location.PermissionStatus>(Location.PermissionStatus.UNDETERMINED);
  
  const [showRefreshCamera, setShowRefreshCamera] = useState(false);
  const [showRefreshLocation, setShowRefreshLocation] = useState(false);

  //Request Camera and Location
  const handleAllPermission = async () => {
    
    // const LocationPermissionStatus = await Camera.requestLocationPermission();
    const {status} = await Location.requestForegroundPermissionsAsync();
    const cameraPermissionStatus = await Camera.requestCameraPermission();

    setAllowLocation(status);
    setShowRefreshLocation(status === Location.PermissionStatus.DENIED);
    setAllowCamera(cameraPermissionStatus);
    setShowRefreshCamera(cameraPermissionStatus === 'denied');


  }

  useEffect(() => {

    handleAllPermission();

  }, []);


  useEffect(() => {

    let message: string = '';
    if (showRefreshCamera) {
      message = 'Please allow this app to use Camera';
    }

    if (showRefreshLocation) {
      message !== '' ?
      message = message + ' and Location / GPS also make sure to enable Location / GPS' :
      message = 'please allow this app to use Location / GPS and make sure to enable Location / GPS'
    }

  }, [allowCamera, allowLocation]);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>

      {

        (allowLocation === Location.PermissionStatus.GRANTED) && (allowCamera === 'granted') ?

        <TakePhoto /> : <RequestPermission askPermission={handleAllPermission} />

      }

    </SafeAreaView>
  );



}
