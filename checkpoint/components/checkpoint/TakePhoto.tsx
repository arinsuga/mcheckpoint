
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
} from 'react-native';
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
    const [photoUri, setPhotoUri] = useState<string | undefined>(undefined);
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
        
        console.log(`file://${result.path}`);


        setPhoto(result);
        setPhotoUri(result?.path);

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

        !photo ? 
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

        </View> :
        <View style={{
          flex: 1,
          justifyContent: 'flex-start',
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, 
        }}>
            <Image style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height/2,
            }} source={{
              uri: `file://${photo.path}` 
            }} />
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