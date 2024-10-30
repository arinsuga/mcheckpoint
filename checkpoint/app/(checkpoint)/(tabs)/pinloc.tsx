import {
  useState,
  useEffect,
  useCallback
} from 'react';
import {
  BackHandler,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Camera } from 'react-native-vision-camera';
import Ionicons from '@expo/vector-icons/Ionicons';

import TakePhoto from '@/components/checkpoint/TakePhoto';
import { Colors } from '@/constants/checkpoint/Colors';


export default function Pinloc() {
  const [showcamera, setShowcamera] = useState(Camera.getCameraPermissionStatus());
  const [quitApp, setQuitApp] = useState(false);


  //Request Camera Permission
  const handlePermission = async () => {
    
    console.log('Parent requesting camera permission...');
    const permission = await Camera.requestCameraPermission();
    console.log(`Camere permission status : ${permission}`);
    setShowcamera(permission);
    setQuitApp(permission === 'denied');

  }

  useEffect(() => {

    console.log('useEffect parrent...');
    console.log(showcamera);

  }, [showcamera]);


  if (showcamera !== 'granted') {

    handlePermission();

  }

  if (quitApp) {

    return(
      
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}>


            <TouchableOpacity>
                <Ionicons name="power" size={64} color={ Colors.orange }
                onPress={() => BackHandler.exitApp()} />
            </TouchableOpacity>

        </View>

    );
    

  }


  return (
    <SafeAreaView style={styles.container}>

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