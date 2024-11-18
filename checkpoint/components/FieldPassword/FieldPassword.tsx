import {
    View,
    TextInput,
    StyleSheet,
} from "react-native";

import { Colors } from "@/constants/Colors";
import Icon from "../Icon/Icon";

type FieldUserNameProps = {
    onChangeText: (nexttext: string) => void;
}

export const FieldPassword = ({onChangeText}: FieldUserNameProps) => {

    return (
        <View style={ [ styles.textInputGroup, { marginBottom: 30 } ] }>

          <Icon.Key size={20} color={Colors.greyLight} style={styles.inputIcon} />
          <TextInput
            placeholderTextColor={ Colors.grey }
            secureTextEntry={ true }
            placeholder="Password"
            style={ styles.textInput }
            onChangeText={ (nextText) => onChangeText(nextText) }
          ></TextInput>

        </View>
    );
}

export default FieldPassword;

const styles = StyleSheet.create({

  
  
    
    inputIcon: {
  
      position: "absolute",
      bottom: 10
  
    },
  
    textInputGroup: {
      borderBottomWidth: 1,
      borderBottomColor: Colors.greyLight,
      marginBottom: 5,
      width: '75%'
    },
  
    textInput: {
  
      fontSize: 17,
      color: Colors.black,
      paddingLeft: 30,
      paddingTop: 30,
  
    },
  
  });