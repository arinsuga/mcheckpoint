import {
  useState,
  useRef,
  MutableRefObject,

} from 'react';

import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import {
  Camera,
  useCameraDevice,
  PhotoFile,
  CameraDevice,
} from 'react-native-vision-camera';

import Icon from '@/components/Icon/Icon';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ICameraInfoProps {

  cameraRef: MutableRefObject<Camera | null>;
  photo: boolean;
  device: any;
  isActive: boolean;
  enableLocation: boolean;

}

interface CheckpointCameraProps {

  viewCapturedImage: () => void;
  capturePhoto: () => Promise<void>;
  toggleCameraFacing: () => void;
  cameraInfo: ICameraInfoProps

}

const CheckpointCamera = (props: CheckpointCameraProps) => {
  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>('front');
  const [photo, setPhoto] = useState<PhotoFile | undefined>(undefined);
  const cameraRef = useRef<Camera>(null);
  const phoneDevice = useCameraDevice(cameraPosition);

  return (

        <>
            <Camera
                style={{ flex: 1 }}
                ref={props.cameraInfo.cameraRef}
                photo={props.cameraInfo.photo}
                device={props.cameraInfo.device}
                isActive={props.cameraInfo.isActive}
                enableLocation={props.cameraInfo.enableLocation}
            />


            <View style={styles.buttonContainer}>

                <TouchableOpacity style={styles.button} onPress={props.viewCapturedImage}>
                  <Icon.Image color={Colors.whiteDark} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={props.capturePhoto}>
                  <Icon.Capture color={Colors.whiteDark} size={98} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={props.toggleCameraFacing}>
                  <Icon.CameraRotate color={Colors.whiteDark} />
                </TouchableOpacity>

            </View>

        </>
    
  )
}

export default CheckpointCamera

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
