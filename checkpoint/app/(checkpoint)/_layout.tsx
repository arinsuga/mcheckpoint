
import { Text } from "react-native";
import { useRouter, Stack, Tabs } from "expo-router";

import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

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
      return <Login />;

  } else {

      console.log('authenticatedXXX');
    
      return (

        <Tabs
            screenOptions={{
              headerShown: true,
              title: "",
              headerLeft: () => (router.canGoBack() ?
                <Ionicons
                name="arrow-back"
                size={24}
                color={ Colors.orange }
                onPress={() => router.canGoBack() && router.back()}
                /> :
                <></>),
                headerRight: () => (
                  <Ionicons
                    name="power"
                    size={24}
                    color={Colors.orange}
                    onPress={() => (Logout && Logout())}
                  />
                ),
            }}
        >
          
              <Tabs.Screen name="index" options={{
                headerShown: true,
                tabBarIcon: () => <MaterialIcons name="home" size={32} color={ Colors.orange } />
              }} />
              <Tabs.Screen name="pinloc" options={{
                headerShown: true,
                tabBarIcon: () => <MaterialIcons name="my-location" size={32} color={ Colors.orange } />
              }} />
              <Tabs.Screen name="history" options={{
                headerShown: true,
                tabBarIcon: () => <MaterialIcons name="history" size={32} color={ Colors.orange } />
              }} />

              <Tabs.Screen name="dashboard" options={{
                headerShown: true,
                href: null,
                tabBarIcon: () => <FontAwesome name="dashboard" size={32} color={ Colors.orange } />
              }} />
              <Tabs.Screen name="historydetail" options={{
                headerShown: true,
                href: null,
                tabBarIcon: () => <MaterialIcons name="my-location" size={32} color={ Colors.orange } />
              }} />
              <Tabs.Screen name="historysearch" options={{
                headerShown: true,
                href: null,
                tabBarIcon: () => <MaterialIcons name="my-location" size={32} color={ Colors.orange } />
              }} />

        </Tabs>
      )
  }
}
