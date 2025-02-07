
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import { Colors } from '@/constants/Colors';

const WaitingIndicator = ({isWaiting}: {isWaiting: boolean}) => {
  return (

      <View style={{
        display: isWaiting ? 'flex' : 'none',
        position: 'absolute',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        top: '50%',
        left: '50%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
        zIndex: 999,
      }}>
        <ActivityIndicator size={80} color={ Colors.orange } />
        <Text>Memuat...</Text>
      </View>
    
  )
}

export default WaitingIndicator