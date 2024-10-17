import { useRouter, Link } from "expo-router";
import { Button, Text, View } from "react-native";
import { useAuth } from "@/contexts/Authcontext";

export default function Home() {

  const { authState } = useAuth();
  const router = useRouter()

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

        <Text>INDEX / HOME</Text>

    </View>
  );
}
