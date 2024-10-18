
import { Text } from "react-native";
import { useRouter, Tabs } from "expo-router";

import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Colors } from "@/constants/checkpoint/Colors";
import { useAuth } from "@/contexts/Authcontext";

export default function AppLayout() {
  const { Logout } = useAuth();
  const router = useRouter();
    
  return (

    <Tabs
        screenOptions={{
          headerShown: false,
          title: "",
          headerStyle: {
            backgroundColor: Colors.orange,
          },
          headerLeft: () => (router.canGoBack() ?
            <Ionicons
            name="arrow-back"
            size={24}
            color={ Colors.orange }
            onPress={() => router.canGoBack() && router.back()}
            /> :
            <></>),
        }}
    >
      
          <Tabs.Screen name="index"
            options={{
            tabBarIcon: () => <MaterialIcons name="home" size={32} />,
            tabBarIconStyle: {
              color: Colors.red
            }
          }} />
          <Tabs.Screen name="pinloc" options={{
            tabBarIcon: () => <MaterialIcons name="my-location" size={56}
              style={[{ position: "absolute", top: -30, backgroundColor: Colors.white, borderRadius: 50 }]}
            />
          }} />
          <Tabs.Screen name="history" options={{
            tabBarIcon: () => <MaterialIcons name="history" size={32} />
          }} />

          <Tabs.Screen name="dashboard" options={{
            href: null,
            tabBarIcon: () => <FontAwesome name="dashboard" size={32} />
          }} />
          <Tabs.Screen name="historydetail" options={{
            href: null,
            tabBarIcon: () => <MaterialIcons name="my-location" size={32} />
          }} />
          <Tabs.Screen name="historysearch" options={{
            href: null,
            tabBarIcon: () => <MaterialIcons name="my-location" size={32} />
          }} />

    </Tabs>
  )
}
