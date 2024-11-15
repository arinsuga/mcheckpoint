
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
import { useState, useEffect } from "react";

import { Colors } from "../constants/checkpoint/Colors";
import Logo from "../components/Logo/Logo";
import Icon from "@/components/Icon/Icon";
import { useAuth } from "@/contexts/Authcontext";

import FieldUserName from "@/components/FieldUserName/FieldUserName";
import FieldPassword from "@/components/FieldPassword/FieldPassword";

import { useFocusEffect, useRouter } from "expo-router";

export default function Login() {
  const { authState, Login } = useAuth();
  const router = useRouter();
  const [ username, setUsername ] = useState('admin'); //fortest
  const [ password, setPassword ] = useState('admin'); //fortest

  const onLogin = async (username: string, password: string) => {
    
    const result = await (Login && Login(username, password));
    
    result ? router.replace('/') : alert('Invalid username or password');

  }

  const usernamedOnChange = (nextText: string) => {

    setUsername(nextText);

  }

  const passwordOnChange = (nextText: string) => {

    setPassword(nextText);

  }


  return (
    <SafeAreaView
      style={ [ styles.rootContainer, { backgroundColor: Colors.whiteLight } ] }
    >

      <View style={{
        flex: 1,
        alignItems: "center",
        position: 'absolute',
        top: 100,
        alignSelf: "center",
        width: '100%'
      }}>
        <Logo size="s" />
      </View> 

      <View style={ styles.container }>

        <FieldUserName onChangeText={ usernamedOnChange } />
        <FieldPassword onChangeText={ passwordOnChange } />

        <View>

          <TouchableOpacity
              style={ [styles.btn, styles.btnLogin] }
              onPress={ () => onLogin(username, password) }
          >

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