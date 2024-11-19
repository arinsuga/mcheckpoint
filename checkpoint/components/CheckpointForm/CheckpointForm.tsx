
import { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    Platform,
    Dimensions,
    StatusBar,
    BackHandler,
    TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

import FieldTextInput from '../FieldTextInput/FieldTextInput';
import FieldMultilineTextInput from '../FieldMultilineTextInput/FieldMultilineTextInput';
import { Colors } from '@/constants/Colors';

interface IChekPointFormProps {
    uri: string
}

const CheckpointForm = ({uri}: IChekPointFormProps) => {
    const [displacamera, setDisplaycamera] = useState(true);
    const router = useRouter();


    const hideCaptured = () => {
        
        setDisplaycamera(false);

    }

    const showCaptured = () => {
        
      setDisplaycamera(true);

    }

    BackHandler.addEventListener('hardwareBackPress', () => {

      showCaptured();
      if (displacamera) router.back();
      
      return true;
    });

    const handleSave = () => {
      
        alert('Data tersimpan...');

        return true;

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
                height: displacamera ? Dimensions.get('window').height/2.5 : 0,
                marginBottom: 50,
              }}
            />

            <FieldTextInput
              placeholder='Title'
              onFocus={hideCaptured}
              style={{
                width: Dimensions.get('window').width-50,
              }}
            />
            <FieldMultilineTextInput
              placeholder='Description'
              onFocus={hideCaptured}
              style={{
                width: Dimensions.get('window').width-50,
              }}
            />
  
            <TouchableOpacity
                onPress={() => {
                  const success = handleSave();
                  router.back();
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