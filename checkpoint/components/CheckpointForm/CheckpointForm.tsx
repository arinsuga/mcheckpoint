
import React, { useState } from 'react';
import {
    SafeAreaView,
    Text,
    Image,
    Platform,
    Dimensions,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

import {PhotoFile} from 'react-native-vision-camera';

import FieldTextInput from '../FieldTextInput/FieldTextInput';
import FieldMultilineTextInput from '../FieldMultilineTextInput/FieldMultilineTextInput';
import { Colors } from '@/constants/Colors';
import ICheckpoint from '@/interfaces/ICheckpoint';
import { checkin } from '@/services/Chekpoint';

interface IChekPointFormProps {
  file?: PhotoFile | undefined;
}

const CheckpointForm = ({file}: IChekPointFormProps) => {

    const uri = `file://${file?.path}`;
    const router = useRouter();
    const [displaycamera, setDisplaycamera] = useState(true);
    const [latitude, setLatitude] = useState('-6.2325772');
    const [longitude, setLongitude] = useState('106.8106801');
    const [checkpoint, setCheckpoint] = useState<ICheckpoint>({
      file: file,
      checkType: 'checkin',
      latitude: latitude,
      longitude: longitude,
    });

    const hideCaptured = () => setDisplaycamera(false);

    const showCaptured = () => setDisplaycamera(true);

    const handleSave = async () => {

        try {

          const result = await checkin(checkpoint);

          alert('Data tersimpan...');
          console.log(result);

          return true;
  
        } catch (error) {

            console.log(error);
            alert('Data gagal disimpan...');
            return false;

        }
    }

  return (
        <SafeAreaView style={{
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
              onChangeText={(nextText) => setCheckpoint({ ...checkpoint, checkin_title: nextText })}
              style={{
                width: Dimensions.get('window').width-50,
              }}
            />
            <FieldMultilineTextInput
              placeholder='Description'
              onFocus={hideCaptured}
              onChangeText={(nextText) => setCheckpoint({ ...checkpoint, checkin_description: nextText })}
              style={{
                width: Dimensions.get('window').width-50,
              }}
            />
  
            <TouchableOpacity
                onPress={ async() => {
                  const success = await handleSave();
                  if (success) router.replace('/')
                }}
                style={{
                  flex: 0.3,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 50,
                  width: Dimensions.get('window').width-100,
                  backgroundColor: Colors.primary,
                }}
            >
              <Text style={{color: Colors.white}}>Save</Text>
            </TouchableOpacity>


        </SafeAreaView>
  )
}

export default CheckpointForm