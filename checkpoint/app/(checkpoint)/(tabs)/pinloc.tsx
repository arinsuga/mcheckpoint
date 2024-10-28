import { useState, useEffect, useRef } from 'react';
import { CameraView, CameraType, useCameraPermissions, CameraCapturedPicture } from 'expo-camera';
import { Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import TakePhoto from '@/components/checkpoint/TakePhoto';
import { Colors } from '@/constants/checkpoint/Colors';


export default function Pinloc() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<CameraCapturedPicture | undefined>(undefined);


  useEffect(() => {

    console.log('useEffect parrent...');
    console.log(photo);

  }, [photo]);


  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
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