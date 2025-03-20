import React, { useEffect } from "react";
import { Text, View } from "react-native";
import Icon from "@/components/Icon/Icon";

export default function Home() {

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

        <Text>INDEX / HOME</Text>
        <Icon.Home />


    </View>
  );
}
