import { Colors } from "@/constants/checkpoint/Colors";
import { useAuth } from "@/contexts/Authcontext";
import { Redirect, Stack, useFocusEffect, useRouter } from "expo-router";
import { Button, Text } from "react-native";


export default function AppLayout() {
  const { authState, Logout } = useAuth();
  const router = useRouter();

  if (!authState?.authenticated) {

      console.log('Not authenticated');

      return <Redirect href="/login" />


  } else {

      console.log('authenticated');
    
      return (<Stack screenOptions={{
        headerShown: true,
      }} />)

  }


}
