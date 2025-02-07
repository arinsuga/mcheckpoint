import { StyleSheet, Platform, Dimensions, StatusBar } from "react-native"

import { Colors } from "./Colors";

const Styles = StyleSheet.create({

    rootContainer: {
  
      flex: 1,
      justifyContent: "flex-end",
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  
    },
  
    activityContainer: {
  
      flex: 1,
      justifyContent: "center",
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  
    },
  
    container: {
      paddingBottom: 50,
      paddingLeft: 30,
      paddingRight: 30,
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

    btn: {
      alignItems: 'center',
      padding: 15,
      color: Colors.white,
      borderRadius: 5,
  
    },
  
    btnLogin: {
      
      backgroundColor: Colors.bgOrange,
  
    },
  
    btnText: {
      color: Colors.white,
    },
  
    
    inputIcon: {
  
      position: "absolute",
      bottom: 10
  
    },
  
    textInputGroup: {
      borderBottomWidth: 1,
      borderBottomColor: Colors.greyLight,
      marginBottom: 5,
      width: '75%'
    },
  
    textInput: {
  
      fontSize: 17,
      color: Colors.black,
      paddingLeft: 30,
      paddingTop: 30,
  
    },
  
  });

export default Styles;