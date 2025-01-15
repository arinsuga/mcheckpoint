//systems
import React, { MutableRefObject, } from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity, } from 'react-native';
//packages
import { Camera, CameraDevice } from 'react-native-vision-camera';
//components
import Icon from '@/components/Icon/Icon';
//components
import { Colors } from '@/constants/Colors';

interface ICameraInfoProps {

  cameraRef: MutableRefObject<Camera | null>;
  photo: boolean;
  device: CameraDevice;
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

                <TouchableOpacity onPress={props.viewCapturedImage}>
                  <Icon.Image color={Colors.whiteDark} />
                </TouchableOpacity>

                <TouchableOpacity onPress={props.capturePhoto}>
                  <Icon.Capture color={Colors.whiteDark} size={98} />
                </TouchableOpacity>

                <TouchableOpacity onPress={props.toggleCameraFacing}>
                  <Icon.CameraRotate color={Colors.whiteDark} />
                </TouchableOpacity>

            </View>

        </>
    
  )
}

export default CheckpointCamera

const styles = StyleSheet.create({
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
});
