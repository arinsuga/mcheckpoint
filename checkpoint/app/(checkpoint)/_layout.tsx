import { Colors } from "@/constants/checkpoint/Colors";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{
        headerShown: false,
        title: "",
        statusBarStyle: 'light',
        statusBarColor: Colors.whiteLight,
      }} />
      <Stack.Screen name="index" />
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="history" />
      <Stack.Screen name="historydetail" />
      <Stack.Screen name="historysearch" />
      <Stack.Screen name="checkin" />
      <Stack.Screen name="checkout" />
    </Stack>
  );
}
