import { useFocusEffect, useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {

  const router = useRouter()

  useFocusEffect(() => {

   router.replace('/login');
   
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
