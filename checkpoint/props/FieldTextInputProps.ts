import React from "react";
import { StyleProp, TextInput, TextStyle } from "react-native";

type FieldTextInputProps =  {
    placeholder?: string,
    placeholderTextColor?: string,
    secureTextEntry?: boolean,
    onChangeText?: (nexttext: string) => void,
    onFocus?: () => void,
    onBlur?: () => void,
    style?: StyleProp<TextStyle>,
    inputRef?: React.RefObject<TextInput>
}

export default FieldTextInputProps;