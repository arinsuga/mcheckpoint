import { Colors } from "@/constants/checkpoint/Colors";
import { useAuth } from "@/contexts/Authcontext";
import { Stack, useFocusEffect, useRouter } from "expo-router";
import { Button, Text } from "react-native";


export default function RootLayout() {
  const { authState, Logout } = useAuth();
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen name="login" options={{
        headerShown: false,
        title: "",
        statusBarStyle: 'light',
        statusBarColor: Colors.whiteLight,
      }} />

      <Stack.Screen name="index" options={{
        headerRight: () => <Button
          title="Logout"
          onPress={() => {
            Logout();

            console.log('=======================');
            console.log('handleLogout:');
            console.log('=======================');
            console.log(authState);
      
            router.replace('/')
          }}
        />
      }} />
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="history" />
      <Stack.Screen name="historydetail" />
      <Stack.Screen name="historysearch" />
      <Stack.Screen name="checkin" />
      <Stack.Screen name="checkout" />
    </Stack>
  );
}
