import {
  useState,
  useEffect,
} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Camera } from 'react-native-vision-camera';


import TakePhoto from '@/components/TakePhoto/TakePhoto';
import { Colors } from '@/constants/Colors';
import Icon from '@/components/Icon/Icon';

export default function Pinloc() {
  const [isRefresh, setIsRefresh] = useState(false);
  const [allowCamera, setAllowCamera] = useState(Camera.getCameraPermissionStatus());
  const [allowLocation, setAllowLocation] = useState(Camera.getLocationPermissionStatus());
  
  const [showRefreshCamera, setShowRefreshCamera] = useState(false);
  const [showRefreshLocation, setShowRefreshLocation] = useState(false);
  const [reloadApp, setReloadApp] = useState(false);


  //Request Camera and Location
  const handleAllPermission = async () => {
    
    const LocationPermissionStatus = await Camera.requestLocationPermission();
    const cameraPermissionStatus = await Camera.requestCameraPermission();

    setAllowLocation(LocationPermissionStatus);
    setShowRefreshLocation(LocationPermissionStatus === 'denied');
    setAllowCamera(cameraPermissionStatus);
    setShowRefreshCamera(cameraPermissionStatus === 'denied');


  }
  
  useEffect(() => {

    if ((allowLocation !== 'granted') && (allowCamera !== 'granted')) {

      handleAllPermission();
  
    }
  
  }, [allowCamera, allowLocation]);

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

              allowCamera === 'denied' && setShowRefreshCamera(false);
              allowLocation === 'denied' && setShowRefreshLocation(false);

            }}>
                <Icon.Power size={24} color={ Colors.white } />
                <Text style={{ color: Colors.white, marginLeft: 10 }}>Refresh</Text>
            </TouchableOpacity>

        </View>

    );

  }

  if ((allowCamera === 'granted') && (allowLocation === 'granted')) {

    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>

        <TakePhoto />

      </SafeAreaView>
    );
  }

}
