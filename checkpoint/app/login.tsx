
import {
  Platform,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";

import { Colors } from "../constants/Colors";
import Logo from "../components/Logo/Logo";
import { useAuth } from "@/contexts/Authcontext";

import FieldUserName from "@/components/FieldUserName/FieldUserName";
import FieldPassword from "@/components/FieldPassword/FieldPassword";
import WaitingIndicator from "@/components/WaitingIndicator/WaitingIndicator";

import { useRouter } from "expo-router";

export default function Login({ authstate }: { authstate: boolean | null | undefined }) {
  const { Login } = useAuth();
  const router = useRouter();
  const [ username, setUsername ] = useState('imam@hadiprana.co.id'); //fortest
  const [ password, setPassword ] = useState('hadiprana'); //fortest
  const [ startLogin, setStartLogin ] = useState(false);

  console.log('Login - authstate', authstate);

  const onLogin = async (username: string, password: string) => {
    
    setStartLogin(true);
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


    (authstate === undefined) ?
    <SafeAreaView style={ [ styles.activityContainer, { backgroundColor: Colors.whiteLight } ] }>
      <WaitingIndicator startWaiting={true} />
    </SafeAreaView> :
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

      <WaitingIndicator startWaiting={startLogin} />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  rootContainer: {

    flex: 1,
    justifyContent: "flex-end",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,

  },

  activityContainer: {

    flex: 1,
    justifyContent: "center",
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