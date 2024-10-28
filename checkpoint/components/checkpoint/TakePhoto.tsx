
import { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CameraView, CameraType, CameraCapturedPicture } from "expo-camera";

const TakePhoto = () => {
    const [facing, setFacing] = useState<CameraType>('front');
    const [photo, setPhoto] = useState<CameraCapturedPicture | undefined>(undefined);
    const cameraRef = useRef<CameraView | null>(null);

  useEffect(() => {

    console.log('useEffect child 1...logging photo');
    console.log(photo);
    console.log('useEffect child 2...reseting photo');
    console.log(photo);

  }, [photo]);

  const capture = async () => {
      
        const options = {};

        setPhoto(await cameraRef.current?.takePictureAsync(options));
        console.log('start Capture');
        console.log(photo);

  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (

      <CameraView
          style={styles.camera}
          facing={facing}
          ref={cameraRef}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>

            <Text style={styles.text}>Flip Camera</Text>
            
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={capture}>
            <Text style={ styles.text }>Rekam</Text>
          </TouchableOpacity>
        </View>
      </CameraView>


  )
}

export default TakePhoto

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