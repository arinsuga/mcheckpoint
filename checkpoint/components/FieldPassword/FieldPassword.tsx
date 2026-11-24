import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/constants/Colors";
import Icon from "../Icon/Icon";

type FieldUserNameProps = {
    onChangeText: (nexttext: string) => void;
}

export const FieldPassword = ({onChangeText}: FieldUserNameProps) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <View style={ [ styles.textInputGroup, { marginBottom: 30 } ] }>

          <Icon.Key size={20} color={Colors.greyLight} style={styles.inputIcon} />
          <TextInput
            placeholderTextColor={ Colors.grey }
            secureTextEntry={ !isPasswordVisible }
            placeholder="Password"
            style={ styles.textInput }
            onChangeText={ (nextText) => onChangeText(nextText) }
          ></TextInput>
          <TouchableOpacity
            style={ styles.visibilityToggle }
            onPress={ () => setIsPasswordVisible((visible) => !visible) }
            accessibilityRole="button"
            accessibilityLabel={ isPasswordVisible ? "Hide password" : "Show password" }
            hitSlop={ 8 }
          >
            <Ionicons
              name={ isPasswordVisible ? "eye-off-outline" : "eye-outline" }
              size={ 20 }
              color={ Colors.greyLight }
            />
          </TouchableOpacity>

        </View>
    );
}

export default FieldPassword;

const styles = StyleSheet.create({

  
  
    
    inputIcon: {
  
      position: "absolute",
      bottom: 10
  
    },

    visibilityToggle: {
      position: "absolute",
      right: 0,
      bottom: 10,
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
      paddingRight: 30,
      paddingTop: 30,
  
    },
  
  });