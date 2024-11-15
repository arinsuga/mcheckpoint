
import { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    Image,
    Platform,
    Dimensions,
    StatusBar,
} from 'react-native';

import FieldTextInput from '../FieldTextInput/FieldTextInput';
import FieldMultilineTextInput from '../FieldMultilineTextInput/FieldMultilineTextInput';


interface IChekPointFormProps {
    uri: string
}

const CheckpointForm = ({uri}: IChekPointFormProps) => {
    const [displacamera, setDisplaycamera] = useState(true);


    const hideCaptured = () => {
        
        setDisplaycamera(false);

    }

    const showCaptured = () => {
        
        setDisplaycamera(true);

    }
    
  return (
        <SafeAreaView style={{
          flex: 1,
          justifyContent: 'flex-start',
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, 
        }}>

            <Image style={{

              width: Dimensions.get('window').width,
              height: displacamera ? Dimensions.get('window').height/3 : 0,
            }} source={{
              uri: uri 
            }} />

            <ScrollView>
              <FieldTextInput
                placeholder='Title'
                onFocus={hideCaptured}
                onBlur={showCaptured}
              />
              <FieldMultilineTextInput placeholder='Description' />
            </ScrollView>


        </SafeAreaView>
  )
}

export default CheckpointForm