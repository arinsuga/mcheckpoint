
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useRouter, Stack } from "expo-router";

import { Colors } from "@/constants/Colors";
import Icon from "@/components/Icon/Icon";
import { useAuth } from "@/contexts/Authcontext";
import Login from "../login";
//import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { getToken } from "@/services/AuthService";

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
  const { authState, Logout } = useAuth();
  const [authentication, setAuthentication] = useState(false);
  const [token, setToken] = useState<string | null>('');

  
  const handleAuthentication = async () => {

    setToken(await getToken());

  }


  useEffect(() => {


    console.log('useEffect - _layout-checkpoint [] ....')
    console.log({
      localToken: token,
      authState: authState,
    });

    handleAuthentication();
    
  }, []);


  useEffect(() => {


    console.log('useEffect - _layout-checkpoint [token] ....')
    console.log({
      localToken: token,
      authState: authState,
    });

    
  }, [token]);

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
