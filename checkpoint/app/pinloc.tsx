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
import { Camera, CameraPermissionRequestResult } from 'react-native-vision-camera';


import TakePhoto from '@/components/checkpoint/TakePhoto';
import { Colors } from '@/constants/checkpoint/Colors';
import Icon from '@/components/Icon';

export default function Pinloc() {
  const [isRefresh, setIsRefresh] = useState(false);
  const [allowCamera, setAllowCamera] = useState(Camera.getCameraPermissionStatus());
  const [allowLocation, setAllowLocation] = useState(Camera.getLocationPermissionStatus());
  
  const [showRefreshCamera, setShowRefreshCamera] = useState(false);
  const [showRefreshLocation, setShowRefreshLocation] = useState(false);
  const [reloadApp, setReloadApp] = useState(false);


  //Request Camera Location
  const handleLocationPermission = async () => {
    
    console.log('handlePermission - requesting Location permission...');

    const LocationPermissionStatus = await Camera.requestLocationPermission();
    setAllowLocation(LocationPermissionStatus);
    setShowRefreshLocation(LocationPermissionStatus === 'denied');

  }
  
  //Request Camera Permission
  const handleCameraPermission = async () => {
    
    console.log('handlePermission - requesting Camera permission...');

    const cameraPermissionStatus = await Camera.requestCameraPermission();
    setAllowCamera(cameraPermissionStatus);
    setShowRefreshCamera(cameraPermissionStatus === 'denied');

  }

  useEffect(() => {

    console.log('useEffect parrent - LOCATION...');
    console.log(`useEffect - allowLocation : ${allowLocation}`);
    console.log(`useEffect - showRefreshLocation : ${showRefreshLocation}`);
    
    console.log('useEffect parrent - CAMERA...');
    console.log(`useEffect - allowCamera : ${allowCamera}`);
    console.log(`useEffect - showRefreshCamera : ${showRefreshCamera}`);

  }, [allowCamera, allowLocation]);

  console.log(`outside - everything - LOCATION`);
  console.log(`outside - allowLocation : ${allowLocation}`);
  console.log(`outside - showRefreshLocation : ${showRefreshLocation}`);
  if ((allowLocation !== 'granted') && (!showRefreshLocation)) {

    handleLocationPermission();

  }

  console.log(`outside - everything - CAMERA`);
  console.log(`outside - allowCamera : ${allowCamera}`);
  console.log(`outside - showRefreshCamera : ${showRefreshCamera}`);
  if ((allowCamera !== 'granted') && (!showRefreshCamera)) {

    handleCameraPermission();

  }


  if ((showRefreshCamera) || (showRefreshLocation)) {

    let message: string = '';
    if (showRefreshCamera) {
      message = 'Please allow this app to use Camera';
    }

    if (showRefreshLocation) {
      message !== '' ?
      message = message + ' and Location / GPS also make sure to enable Location / GPS' :
      message = 'please allow this app to use Location / GPS and make sure to enable Location / GPS'
    }

    return(
      
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>


            <Text style={{ fontSize: 18, marginBottom: 10 }}>{message}</Text>
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

              // setIsRefresh(true);
              // setShowRefreshCamera(false);
              // setShowRefreshLocation(false);

              allowCamera === 'denied' && setShowRefreshCamera(false);
              allowLocation === 'denied' && setShowRefreshLocation(false);

              //BackHandler.exitApp();
              //handlePermission();

            }}>
                <Icon.Power size={24} color={ Colors.white } />
                <Text style={{ color: Colors.white, marginLeft: 10 }}>Refresh</Text>
            </TouchableOpacity>

        </View>

    );

  }

  if ((allowCamera === 'granted') || (allowLocation === 'granted')) {
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