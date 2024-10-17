import { Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";


export default function Pinloc() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <Text>CHECKIN</Text> 

    </View>
  );
}
