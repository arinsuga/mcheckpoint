import { ComponentProps } from "react";
import {
    View,
    TextInput,
    StyleSheet,
    StyleProp,
    ViewStyle
} from "react-native";

import { Colors } from "@/constants/checkpoint/Colors";
import Icon from "../Icon/Icon";

type FieldUserNameProps =  {
    placeholder?: string,
    placeholderTextColor?: string,
    secureTextEntry?: boolean,
    onChangeText?: (nexttext: string) => void,
    style?: StyleProp<ViewStyle>,
}

export const FieldMultilineTextInput = ({
    placeholder = '',
    placeholderTextColor = Colors.grey,
    secureTextEntry = false,
    onChangeText,
    style,  
}: FieldUserNameProps) => {

    return (
        <View style={ [ styles.textInputGroup, { marginBottom: 30 } ] }>

          <Icon.User size={20} color={Colors.greyLight} style={styles.inputIcon} />
          <TextInput
            multiline={true}
            numberOfLines={3}
            placeholder={ placeholder }
            placeholderTextColor={ placeholderTextColor }
            secureTextEntry={ secureTextEntry }
            style={ [ styles.textInput, style && style ] }
            onChangeText={ (nextText) => onChangeText && onChangeText(nextText) }
          ></TextInput>

        </View>
    );
}

export default FieldMultilineTextInput;

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