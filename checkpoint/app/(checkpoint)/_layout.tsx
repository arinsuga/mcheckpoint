import { Colors } from "@/constants/checkpoint/Colors";
import { useAuth } from "@/contexts/Authcontext";
import { Redirect, Stack, useFocusEffect, useRouter } from "expo-router";
import { Button, Text } from "react-native";

import Ionicons from '@expo/vector-icons/Ionicons';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

export default function AppLayout() {
  const { authState, Logout } = useAuth();
  const router = useRouter();

  const onLogout =  async () => {

      const result = await (Logout && Logout());

  }


  if (!authState?.authenticated) {

      console.log('Not authenticated');

      return <Redirect href="/login" />


  } else {

      console.log('authenticated');
    
      return (

      <Stack screenOptions={{
        headerShown: true,
        headerRight: () => (
          <Ionicons
            onPress={ () => onLogout() }
            name="power"
            size={24}
            color={ Colors.orange }
          />
        ),
        
      }}>

        <Stack.Screen name="index" options={{
          headerShown: true,
        }} />
            
      </Stack>
        

    )

  }


}
