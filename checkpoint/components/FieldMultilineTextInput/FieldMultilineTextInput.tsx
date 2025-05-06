import { ComponentProps } from "react";
import {
    View,
    TextInput,
} from "react-native";

import FormStyles from "@/constants/FormStyles";
import { Colors } from "@/constants/Colors";
import Icon from "../Icon/Icon";

import FieldTextInputProps from "@/props/FieldTextInputProps";

export const FieldMultilineTextInput = (props: FieldTextInputProps) => {

    return (
        <View
            style={ [ FormStyles.inputGroup ] }
        >

          <TextInput
            multiline={true}
            numberOfLines={3}
            placeholder={ props.placeholder }
            placeholderTextColor={ props.placeholderTextColor }
            secureTextEntry={ props.secureTextEntry }
            onChangeText={ (nextText) => props.onChangeText && props.onChangeText(nextText) }
            onFocus={props.onFocus}
            onBlur={props.onBlur}
            textAlignVertical="bottom"
            style={ [ FormStyles.textInput, props.style && props.style ] }
          ></TextInput>

        </View>
    );
}

export default FieldMultilineTextInput;
