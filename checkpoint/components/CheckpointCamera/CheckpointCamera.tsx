import {
    View,
    Text,
    Dimensions
} from 'react-native'

const CheckpointCamera = () => {
  return (
    <View>
      <Text>CheckpointCamera</Text>
    </View>
  )
}

export default CheckpointCamera

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      position: 'absolute',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
      backgroundColor: 'transparent',
      width: Dimensions.get('window').width,
      bottom: 60,
    },
    message: {
      textAlign: 'center',
      paddingBottom: 10,
    },
    camera: {
      flex: 1,
    },
    button: {
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
  });