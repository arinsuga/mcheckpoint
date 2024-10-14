import { Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Checkout() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <Text>CHECKOUT</Text> 
      <TouchableOpacity
          onPress={() => {
              router.push("/dashboard");
          }}
      >
        <Text>Goto Dashboard</Text>
      </TouchableOpacity>



    </View>
  );
}
