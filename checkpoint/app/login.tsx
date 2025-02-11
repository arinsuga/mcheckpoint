
import { useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";

import Styles from "@/constants/Styles";
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
  const [ isWaiting, setIsWaiting ] = useState(false);

  const onLogin = async (username: string, password: string) => {
    
    setIsWaiting(true);
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
    <SafeAreaView style={ [ Styles.activityContainer, { backgroundColor: Colors.whiteLight } ] }>
      <WaitingIndicator isWaiting={true} />
    </SafeAreaView> :
    <SafeAreaView style={ [ Styles.loginContainer, { backgroundColor: Colors.whiteLight } ] } >

      <StatusBar barStyle={ "dark-content" }  />
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

      <View style={ Styles.container }>

        <FieldUserName onChangeText={ usernamedOnChange } />
        <FieldPassword onChangeText={ passwordOnChange } />

        <View>

          <TouchableOpacity
              style={ [Styles.btn, Styles.btnLogin] }
              onPress={ () => onLogin(username, password) }
          >

            <Text style={ Styles.btnText }>Login</Text>

          </TouchableOpacity>

        </View>
      </View>

      <WaitingIndicator isWaiting={isWaiting} />

    </SafeAreaView>
  );
}

