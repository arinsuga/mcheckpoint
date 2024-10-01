import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{
        headerShown: false,
        title: ""
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
