import { View } from "react-native";
import { Colors } from "@/constants/checkpoint/Colors";
import { useAuth } from "@/contexts/Authcontext";
import { useRouter, Slot } from "expo-router";
import { Button, Text } from "react-native";

import Ionicons from '@expo/vector-icons/Ionicons';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

import Login from "../login";
import Index from ".";
import Dashboard from "./dashboard";

export default function AppLayout() {
  const { authState, Logout } = useAuth();
  const router = useRouter();

  const onLogout =  async () => {

      const result = await (Logout && Logout());

  }


  if (!authState?.authenticated) {

      console.log('Not authenticated');
      // return <Redirect href="/login" />
      return <Login />;


  } else {

      console.log('authenticatedXXX');
    
      return (

        <View style={{
          flex: 1,
          backgroundColor: Colors.blue
        }}>

            <View style={{
              flex: 0.05,
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              backgroundColor: Colors.white,
              height: 50,
              top: 50,
              paddingRight: 5,
            }}>

                <Ionicons
                  onPress={ () => onLogout() }
                  name="power"
                  size={24}
                  color={ Colors.orange }
                />

            </View>

            <Slot />

        </View>
      

    )

  }


}
