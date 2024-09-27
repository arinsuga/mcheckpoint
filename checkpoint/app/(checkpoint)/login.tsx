
import {
  Button,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { Colors } from "../../constants/checkpoint/Colors";
import Logo from "../../components/checkpoint/Logo";

export default function Login() {

  console.log(StatusBar);

  return (
    <SafeAreaView
      style={ [ styles.rootContainer, { backgroundColor: Colors.whiteLight } ] }
    >

      <View style={{
        flex: 1,
        alignItems: "center",
        position: 'absolute',
        top: 50,
        alignSelf: "center",
        width: '100%'
      }}>
        <Logo size="s" />
      </View> 

      <View style={ styles.container }>


      <View style={ styles.textInputGroup } >

          <Image style={ styles.inputIcon } source={require('../../assets/checkpoint/images/user.png')}  />
          <TextInput
            placeholderTextColor={ Colors.grey }
            placeholder="Username"
            style={ styles.textInput }
          ></TextInput>

        </View>

        <View style={ [ styles.textInputGroup, { marginBottom: 30 } ] }>

          <Image style={ styles.inputIcon } source={require('../../assets/checkpoint/images/key.png')} />
          <TextInput
            placeholderTextColor={ Colors.grey }
            secureTextEntry={ true }
            placeholder="Password"
            style={ styles.textInput }
          ></TextInput>

        </View>

        <View>

          <TouchableOpacity style={ [styles.btn, styles.btnLogin] }>
            <Text style={ styles.btnText }>Login</Text>
          </TouchableOpacity>

        </View>

      </View>




    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  rootContainer: {

    flex: 1,
    justifyContent: "flex-end",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,

  },

  container: {
    paddingBottom: 50,
    paddingLeft: 30,
    paddingRight: 30,
  },

  btn: {
    alignItems: 'center',
    padding: 15,
    color: Colors.white,
    borderRadius: 5,

  },

  btnLogin: {
    
    backgroundColor: Colors.bgOrange,

  },

  btnText: {
    color: Colors.white,
  },

  
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