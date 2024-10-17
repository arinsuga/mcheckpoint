
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
        }}
    >
      
          <Tabs.Screen name="index" options={{
            headerShown: true,
            tabBarIcon: () => <MaterialIcons name="home" size={32} color={ Colors.orange } />
          }} />
          <Tabs.Screen name="pinloc" options={{
            headerShown: true,
            tabBarIcon: () => <MaterialIcons name="my-location" size={56} color={ Colors.orange }
              style={[{ position: "absolute", top: -30, backgroundColor: Colors.white, borderRadius: 50 }]}
            />
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
