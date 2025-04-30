
import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    Image,
    Platform,
    Dimensions,
    StatusBar,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator
} from 'react-native';

//Packages
import { useRouter } from 'expo-router';
import {PhotoFile} from 'react-native-vision-camera';
import * as Location from 'expo-location';

import FieldTextInput from '../FieldTextInput/FieldTextInput';
import FieldMultilineTextInput from '../FieldMultilineTextInput/FieldMultilineTextInput';
import { Colors } from '@/constants/Colors';
import ICheckpoint from '@/interfaces/ICheckpoint';
import { checkin, checkout } from '@/services/ChekpointService';
import WaitingIndicator from '@/components/WaitingIndicator/WaitingIndicator';

interface IChekPointFormProps {
  action: 'checkin' | 'checkout'; 
  actionButton: 'Checkin' | 'Checkout' | '';
  file?: PhotoFile | undefined;
  attendId?: string;
}

const CheckpointForm = ({action, actionButton, file, attendId}: IChekPointFormProps) => {
    const [isWaiting, setIsWaiting] = useState(false);
    const [displaycamera, setDisplaycamera] = useState(true);
    const [checkpoint, setCheckpoint] = useState<ICheckpoint>({
      file: file,
      checkType: action,
      attend_id: attendId,
      latitude: '',
      longitude: '',
    });
    const uri = `file://${file?.path}`;



useEffect(() => {

  console.log('======= CheckpointForm - useEffect - actionButton =======');
  console.log(actionButton);

  (async () => {

    const currentPosition = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest});
    setCheckpoint({
      ...checkpoint,
      latitude: currentPosition.coords.latitude.toString(),
      longitude: currentPosition.coords.longitude.toString()
    });

  })();


}, []);


    const router = useRouter();

    const hideCaptured = () => setDisplaycamera(false);

    const showCaptured = () => setDisplaycamera(true);

    const handleSave = useCallback(async (checkpointData: ICheckpoint) => {

        try {

          setIsWaiting(true);
          if (action == 'checkin') {

        
            const result = await checkin(checkpointData);
            alert('Checkin berhasil...');

          } else if (action == 'checkout') {

            const result = await checkout(checkpointData);
            alert('Checkout berhasil...');

          } else {

            alert('Data gagal tersimpan...');

          }


          return true;
  
        } catch (error) {

            alert('Data gagal disimpan...');
            return false;

        }
    }, []);

  return (
        <View style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, 
        }}>
            <Image
              source={{ uri: uri }}
              style={{
                width: Dimensions.get('window').width,
                height: displaycamera ? Dimensions.get('window').height/2.5 : 0,
                marginBottom: 50,
              }}
            />

            <FieldTextInput
              placeholder='Title'
              onFocus={hideCaptured}
              onChangeText={(nextText) => setCheckpoint({ ...checkpoint, title: nextText })}
              style={{
                width: Dimensions.get('window').width-50,
              }}
            />
            <FieldMultilineTextInput
              placeholder='Description'
              onFocus={hideCaptured}
              onChangeText={(nextText) => setCheckpoint({ ...checkpoint, description: nextText })}
              style={{
                width: Dimensions.get('window').width-50,
              }}
            />

            <TouchableOpacity
                onPress={ async() => {
                  const success = await handleSave(checkpoint);
                  if (success) router.replace('/')
                }}
                style={[
                  styles.checkButton,
                  {display: actionButton == 'Checkin' || actionButton == 'Checkout' ? 'flex' : 'none'}
                ]}
            >
              <Text style={{color: Colors.white}}>{actionButton}</Text>
            </TouchableOpacity>

            <View
                style={[
                  styles.checkButton,
                  {
                    display: actionButton != 'Checkin' && actionButton != 'Checkout' ? 'flex' : 'none',
                    paddingTop: 5,
                    paddingBottom: 5,
                  }
                ]}
            >
              <ActivityIndicator  size={30} color={ Colors.white } />
            </View>

            <WaitingIndicator isWaiting={isWaiting} />

        </View>
  )
}

export default CheckpointForm

const styles = StyleSheet.create({
  checkButton: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    width: Dimensions.get('window').width-100,
    backgroundColor: Colors.primary,
  }
});