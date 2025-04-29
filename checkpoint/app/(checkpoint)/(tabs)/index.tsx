import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Icon from "@/components/Icon/Icon";
import { refreshAuthToken } from "@/services/AuthService";
import { Colors } from "@/constants/Colors";

export default function Home() {
  const [token, setToken] = useState('');

  const handleRefreshToken = async () => {


    const refreshToken = await refreshAuthToken();

    setToken(refreshToken as string);

  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

        <Text>INDEX / HOME</Text>
        <Text>Beta version</Text>
        <Icon.Home />


    </View>
  );
}
