
import React from "react";
import { View, Button, Text, TouchableOpacity, SafeAreaView, BackHandler } from "react-native";
import { useRouter, Stack } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Colors } from "@/constants/Colors";
import Icon from "@/components/Icon/Icon";
import { useAuth } from "@/contexts/Authcontext";
import Login from "../login";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

const CustomDrawerContent = (props: any) => {
    const { Logout } = useAuth();
    const router = useRouter();

  return (

      <DrawerContentScrollView {...props} >

        <DrawerItem
            icon={({color, size}) => (
              <Icon.Power
                size={24}
                color={Colors.orange}
                style={{
                  marginRight: -20
                }}
              />
            )}
            label={"Logout"}
            labelStyle={{
              fontSize: 16,
            }}
            onPress={() => (Logout && Logout())}
        />

        <DrawerItem
          label={"History"}
          onPress={() => router.push('/(checkpoint)/(tabs)/history')}
        />

      </DrawerContentScrollView>

    );

}

export default function AppLayout() {
  const { authState, Logout } = useAuth();

  React.useEffect(() => {

    console.log('useEffect - _layout-checkpint ....')
    console.log(authState);
    
  }, [authState]);


  return (
    <>
      {
        (!authState?.authenticated) ?
        
        <Login /> :

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
