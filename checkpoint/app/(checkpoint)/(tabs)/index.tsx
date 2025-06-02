import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";

//Components
import Logo from "@/components/Logo/Logo";
import Icon from "@/components/Icon/Icon";

//Services
import { refreshAuthToken } from "@/services/AuthService";
import { Colors } from "@/constants/Colors";

export default function Home() {
  const [token, setToken] = useState('');

  const handleRefreshToken = async () => {


    const refreshToken = await refreshAuthToken();

    setToken(refreshToken as string);

  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >

        <Logo size="s" />
        </View>
        <Text style={{ marginBottom: 40 }}>1.0.0 - Beta!</Text>


    </View>
  );
}
