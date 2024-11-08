
import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { CameraView, CameraType, CameraCapturedPicture } from "expo-camera";
import {
  Camera,
  CameraDevice,
  useCameraDevice,
  CameraProps,
  PhotoFile,
  CameraPosition,
  getCameraDevice,
  TakePhotoOptions,
} from 'react-native-vision-camera';
import Reanimated, { Extrapolate, interpolate, useAnimatedGestureHandler, useAnimatedProps, useSharedValue } from 'react-native-reanimated'

import Icon from '@/components/Icon';
import { Colors } from '@/constants/checkpoint/Colors';

const TakePhoto = () => {
    const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>('front');
    const [photo, setPhoto] = useState<PhotoFile | undefined>(undefined);
    const cameraRef = useRef<Camera>(null);


    const phoneDevice = useCameraDevice(cameraPosition);

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
        
        setPhoto(result);

      } catch {

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

        <View style={styles.container}>
            <Camera
                style={styles.camera}
                ref={cameraRef}
                photo={true}
                device={phoneDevice}
                isActive={true}
                enableLocation={true}
            />

            <View style={styles.buttonContainer}>

                <TouchableOpacity style={styles.button} onPress={viewCapturedImage}>
                  <Icon.Image color={Colors.whiteDark} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={capturePhoto}>
                  <Icon.Capture color={Colors.whiteDark} size={98} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                  <Icon.CameraRotate color={Colors.whiteDark} />
                </TouchableOpacity>

            </View>

        </View>

  )
}

export default TakePhoto

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      position: 'absolute',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
      backgroundColor: 'transparent',
      width: Dimensions.get('window').width,
      bottom: 60,
    },
    message: {
      textAlign: 'center',
      paddingBottom: 10,
    },
    camera: {
      flex: 1,
    },
    button: {
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
  });