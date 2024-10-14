
import { Text } from "react-native";
import { Stack, useRouter } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

import { Colors } from "@/constants/checkpoint/Colors";
import { useAuth } from "@/contexts/Authcontext";
import Login from "../login";

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

        <Stack
            screenOptions={{
              headerShown: true,
              title: "",
              headerLeft: () => (
                <>
                  <Ionicons
                      name="arrow-back"
                      size={24}
                      color={ Colors.orange }
                      onPress={() => router.back()}
                  />
                </>
              )
            }}
        />

    )

  }


}
