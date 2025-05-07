import {
    View,
    TextInput,
    StyleSheet,
} from "react-native";

//Packages
import moment from "moment";

//Constants
import { Colors } from "@/constants/Colors";
import Icon from "../Icon/Icon";

type FieldProps = {
    value?: string,
    onChangeText?: (nexttext: string) => void;
}

export const FieldDateRange = ({value = moment().format('DD/MM/YYYY'), onChangeText}: FieldProps) => {

    return (
        <View style={ [ styles.textInputGroup, { marginBottom: 5 } ] }>

          <TextInput
            value={value}
            placeholderTextColor={ Colors.grey }
            secureTextEntry={ false }
            placeholder="DD/MM/YYYY"
            style={ styles.textInput }
            onChangeText={ (nextText) => onChangeText && onChangeText(nextText) }
          ></TextInput>
          <Icon.DateRange size={20} color={Colors.greyLight} style={styles.inputIcon} />

        </View>
    );
}

export default FieldDateRange;

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
  
      fontSize: 14,
      color: Colors.black,
      paddingLeft: 30,
      paddingTop: 30,
  
    },
  
  });