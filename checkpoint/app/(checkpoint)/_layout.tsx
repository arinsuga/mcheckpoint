
import React, { useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";

import { Colors } from "@/constants/Colors";
import Icon from "@/components/Icon/Icon";
import { useAuth } from "@/contexts/Authcontext";

// Components
import Login from "../login";

export default function AppLayout() {
  const { authState, Logout } = useAuth();

  // const { authState, Logout, Authenticate } = useAuth();
  // const toggleShowLogin = useCallback(() => {
    
  //   (Authenticate && Authenticate());

  // }, [authState?.authenticated]);

  // useLayoutEffect(() => {

  //   toggleShowLogin();

  // }, []);


  useEffect(() => {

    console.log('======= _layout - useEffect : CALLED =======');

  });

  return (
    <>
      {

        (!authState?.authenticated) ?
        
        <Login authstate={authState?.authenticated} /> :

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
