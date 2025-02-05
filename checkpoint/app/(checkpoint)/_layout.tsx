
import React, { useEffect, useLayoutEffect, useCallback, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useRouter, Stack } from "expo-router";

import { Colors } from "@/constants/Colors";
import Icon from "@/components/Icon/Icon";
import { useAuth } from "@/contexts/Authcontext";
import Login from "../login";
//import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { getToken, verifyToken } from "@/services/AuthService";
import { SafeAreaView } from "react-native-safe-area-context";

// const CustomDrawerContent = (props: any) => {
//     const { Logout } = useAuth();
//     const router = useRouter();

//   return (

//       <DrawerContentScrollView {...props} >

//         <DrawerItem
//             icon={({color, size}) => (
//               <Icon.Power
//                 size={24}
//                 color={Colors.orange}
//                 style={{
//                   marginRight: -20
//                 }}
//               />
//             )}
//             label={"Logout"}
//             labelStyle={{
//               fontSize: 16,
//             }}
//             onPress={() => (Logout && Logout())}
//         />

//         <DrawerItem
//           label={"History"}
//           onPress={() => router.push('/(checkpoint)/(tabs)/history')}
//         />

//       </DrawerContentScrollView>

//     );

// }

export default function AppLayout() {
  const { authState, Logout, Authenticate } = useAuth();


  const toggleShowLogin = useCallback(() => {
    
    (Authenticate && Authenticate());

  }, [authState?.authenticated]);

  useLayoutEffect(() => {

    toggleShowLogin();

  }, []);


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
