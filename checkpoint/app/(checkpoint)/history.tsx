import { Text, View } from "react-native";

import { Link } from "expo-router";

export default function History() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >


        <Text>HISTORY</Text>
        <Link href="/historydetail"><Text>Goto History Details</Text></Link>
        <Link href="/historysearch"><Text>Goto History Search</Text></Link>

    </View>
  );
}

