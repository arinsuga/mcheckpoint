
import { Text } from "react-native";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from 'react-native-gesture-handler';


import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Colors } from "@/constants/checkpoint/Colors";
import { useAuth } from "@/contexts/Authcontext";
import Login from "../login";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";


const CustomDrawerContent = (props: any) => {
    const { Logout } = useAuth();

  return (

      <DrawerContentScrollView {...props}
        style={{
        }}
      >

        <DrawerItem
            icon={({color, size}) => (
              <Ionicons
                name="power"
                size={24}
                color={Colors.orange}
              />
            )}
            label={"Logout"}
            onPress={() => (Logout && Logout())}
        />

      </DrawerContentScrollView>

    );

}

export default function AppLayout() {
  const { authState, Logout } = useAuth();
  const router = useRouter();

  if (!authState?.authenticated) {

      console.log('Not authenticated');
      return <Login />;

  } else {

      console.log('authenticatedXXX');
    
      return (

        <GestureHandlerRootView >
            <Drawer drawerContent={ (props) => <CustomDrawerContent {...props} /> }
                screenOptions={{
                  title: "",
                  headerTintColor: Colors.white,
                  headerShown: true,
                  headerStyle: {
                    height: 100,
                    backgroundColor: Colors.orange
                  }
            }}>

                <Drawer.Screen name="(tabs)" />

            </Drawer>
        </GestureHandlerRootView>

      )
  }
}
