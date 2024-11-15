
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";

import { Colors } from "@/constants/Colors";
import Icon from "@/components/Icon/Icon";
import { useAuth } from "@/contexts/Authcontext";

// Components
import Login from "../login";
import WaitingIndicator from "@/components/WaitingIndicator/WaitingIndicator";

export default function AppLayout() {
  const { authState, Logout } = useAuth();

  // const { authState, Logout, Authenticate } = useAuth();
  // const toggleShowLogin = useCallback(() => {
    
  //   (Authenticate && Authenticate());

  // }, [authState?.authenticated]);

  // useLayoutEffect(() => {

  //   toggleShowLogin();

  // }, []);


  //fortesting only, do not use for production
  // useEffect(() => {

  //   console.log('======= _layout - useEffect - authstate =======');
  //   console.log(`firstLogin: ${authState?.firstLogin}`);

  // });

  useEffect(() => {

    console.log('======= _layout - useEffect - authstate =======');
    console.log(`authetincated: ${authState?.authenticated}`);
    console.log(`firstLogin: ${authState?.firstLogin}`);

  }, []);

  return (
    <>
      {

       ((authState?.authenticated === undefined) || (authState?.firstLogin === undefined)) ? 

        <WaitingIndicator isWaiting={true} message="Outside login...." /> :

       (authState?.authenticated === false) ?
        
        <Login authstate={authState} /> :

        <Stack 
            screenOptions={{
              title: "",
              headerShown: true,
              headerStyle: {
                backgroundColor: Colors.orange
              },
              headerRight: () => (
                <View>
                  
                  <TouchableOpacity onPress={() => Logout && Logout()}>
                    <Icon.Power size={24} color={Colors.white} />
                  </TouchableOpacity>

                </View>
              )
        }}>

            <Stack.Screen name="(tabs)" />

        </Stack>


      }
    </>

  );

}
