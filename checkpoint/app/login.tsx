
import { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Dimensions,
} from "react-native";

import Styles from "@/constants/Styles";
import { Colors } from "../constants/Colors";
import LogoIcon from "@/components/LogoIcon/LogoIcon";
import { useAuth } from "@/contexts/Authcontext";

//Interface
import IAuth from "@/interfaces/IAuth";

import FieldUserName from "@/components/FieldUserName/FieldUserName";
import FieldPassword from "@/components/FieldPassword/FieldPassword";
import WaitingIndicator from "@/components/WaitingIndicator/WaitingIndicator";

import { useRouter } from "expo-router";

export default function Login({ authstate }: { authstate: IAuth | null | undefined }) {
    const { Login } = useAuth();
    const router = useRouter();
    const [ username, setUsername ] = useState(''); //fortest
    const [ password, setPassword ] = useState(''); //fortest
    const [ isWaiting, setIsWaiting ] = useState(false);
  
    const onLogin = async (username: string, password: string) => {
      
      setIsWaiting(true);
      const result = await (Login && Login(username, password));
      setIsWaiting(false);
      
      result ? router.replace('/') : alert('Invalid username or password');

    }

    const usernamedOnChange = (nextText: string) => {

      setUsername(nextText);

    }

    const passwordOnChange = (nextText: string) => {

      setPassword(nextText);

    }


    return (

      (authstate?.authenticated === undefined) ?
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
          <LogoIcon size="s" />
        </View> 

        <View style={{
          display: authstate?.firstLogin ? 'none' : 'flex',
          flex: 1,
          alignItems: "center",
          position: 'absolute',
          top: (Dimensions.get('screen').height - 100) / 2,
          alignSelf: "center",
          width: '100%'
        }}>
          <Text> Authentication expired </Text>
          <Text> Please login again </Text>
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

