import { useState, useEffect, useCallback } from 'react';
import { CameraView, CameraType, useCameraPermissions, CameraCapturedPicture } from 'expo-camera';
import { Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera } from 'react-native-vision-camera';


import TakePhoto from '@/components/checkpoint/TakePhoto';
import { Colors } from '@/constants/checkpoint/Colors';


export default function Pinloc() {
  const [showcamera, setShowcamera] = useState(Camera.getCameraPermissionStatus());
  const [photo, setPhoto] = useState<CameraCapturedPicture | undefined>(undefined);


  // const handlePermission = useCallback(async () => {
    
  //   console.log('Parent requesting camera permission...');
  //   const permission = await Camera.requestCameraPermission();
  //   console.log(`Camere permission status : ${permission}`);
  //   setShowcamera(permission);

  // }, []);

  const handlePermission = async () => {
    
    console.log('Parent requesting camera permission...');
    const permission = await Camera.requestCameraPermission();
    console.log(`Camere permission status : ${permission}`);
    setShowcamera(permission);

  }

  useEffect(() => {

    console.log('useEffect parrent...');
    console.log(showcamera);

  }, [showcamera]);


  if (showcamera !== 'granted') {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the cameraxxx</Text>
        <Button onPress={handlePermission} title="grant permission" />
      </View>
    );
  }


  return (
    <SafeAreaView style={styles.container}>

        <Text style={{backgroundColor: Colors.green, color: Colors.white}}>TESTING</Text>
        <TakePhoto />

    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});