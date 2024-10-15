import { Text, View } from "react-native";

import { Link } from "expo-router";

export default function Historydetail() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>HISTORY DETAILS</Text>
      <Link href="/historysearch"><Text>Goto History Search</Text></Link>

    </View>
  );
}

