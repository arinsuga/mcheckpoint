import {
  useState,
  useEffect,
  useLayoutEffect,
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


import TakePhoto from '@/components/checkpoint/TakePhoto';
import { Colors } from '@/constants/checkpoint/Colors';
import Icon from '@/components/Icon';

export default function Pinloc() {
  const [showcamera, setShowcamera] = useState(Camera.getCameraPermissionStatus());
  const [showRefresh, setShowRefresh] = useState(false);
  const [reloadApp, setReloadApp] = useState(false);


  //Request Camera Permission
  const handlePermission = async () => {
    
    console.log('handlePermission - requesting camera permission...');
    const permission = await Camera.requestCameraPermission();
    
    console.log(`handlePermission - Camera permission status : ${permission}`);
    console.log(`handlePermission - showCamera : ${showcamera}`);
    console.log(`handlePermission - showRefresh : ${showRefresh}`);
      
    setShowcamera(permission);
    setShowRefresh(permission === 'denied');

  }

  useEffect(() => {

    console.log('useEffect parrent...');
    console.log(`useEffect - showCamera : ${showcamera}`);
    console.log(`useEffect - showRefresh : ${showRefresh}`);
    
  }, [showcamera]);

  console.log(`outside - everything`);
  console.log(`outside - showCamera : ${showcamera}`);
  console.log(`outside - showRefresh : ${showRefresh}`);
  if ((showcamera !== 'granted') && (!showRefresh)) {

    handlePermission();

  }


  if (showRefresh) {

    return(
      
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>


            <Text style={{ fontSize: 18, marginBottom: 10 }}>Please allow this app to use camera.</Text>
            <Text style={{ fontSize: 18, marginBottom: 10, fontWeight: 'bold' }}>Or</Text>
            <TouchableOpacity style={{
              flex: 1,
              flexDirection: "row",
              alignItems: 'center',
              justifyContent: 'space-around',
              backgroundColor: Colors.orange,
              padding: 6,
              flexGrow: 0.07,
              paddingHorizontal: 18,
            }} onPress={() => {

              setShowRefresh(false);
              //BackHandler.exitApp();
              //handlePermission();

            }}>
                <Icon.Power size={24} color={ Colors.white } />
                <Text style={{ color: Colors.white, marginLeft: 10 }}>Refresh</Text>
            </TouchableOpacity>

        </View>

    );
    

  }

  if (showcamera === 'granted') {
    return (
      <SafeAreaView style={styles.container}>

        <TakePhoto />

      </SafeAreaView>
    );
  }

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