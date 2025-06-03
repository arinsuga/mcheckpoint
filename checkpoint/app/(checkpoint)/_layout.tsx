
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

  return (
    <>
      {

       ((authState?.authenticated === undefined) || (authState?.firstLogin === undefined)) ? 

        <WaitingIndicator isWaiting={true} /> :

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
        }} />



      }
    </>

  );

}
