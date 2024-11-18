import { StyleProp, ViewStyle } from "react-native";

type FieldTextInputProps =  {
    placeholder?: string,
    placeholderTextColor?: string,
    secureTextEntry?: boolean,
    onChangeText?: (nexttext: string) => void,
    onFocus?: () => void,
    onBlur?: () => void,
    style?: StyleProp<ViewStyle>,
}

export default FieldTextInputProps;