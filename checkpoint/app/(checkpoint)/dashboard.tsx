import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

export default function Dashboard() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <Text>DASHBOARD</Text> 
      <TouchableOpacity
          onPress={() => {
              router.back();
          }}
      >
        <Text>Backto Checkout</Text>
      </TouchableOpacity>

      <TouchableOpacity
          onPress={() => {
              router.push("/checkin");
          }}
      >
        <Text>Goto Checkin</Text>
      </TouchableOpacity>

    </View>
  );
}
