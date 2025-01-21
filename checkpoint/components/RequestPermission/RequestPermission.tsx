import { Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

interface IRequestPermissionProps {
  askPermission: () => Promise<void>
}
const RequestPermission = ({ askPermission }: IRequestPermissionProps) => {

  return (
    <View>
      <Text>Camera and / or Location Permission Denied</Text>
      <TouchableOpacity onPress={askPermission}><Text>Request Permission</Text></TouchableOpacity>
    </View>
  );
}

export default RequestPermission
