import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Icon from "@/components/Icon/Icon";
import { refreshAuthToken } from "@/services/AuthService";

export default function Home() {
  const [token, setToken] = useState('');

  const handleRefreshToken = async () => {


    const refreshToken = await refreshAuthToken();

    setToken(refreshToken);

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
        <Text>{token}</Text>
        <Icon.Home />
        <TouchableOpacity style={ { backgroundColor: 'red' } } onPress={ handleRefreshToken }>
          <Text>Get Refresh Token for Testing</Text>
        </TouchableOpacity>


    </View>
  );
}
