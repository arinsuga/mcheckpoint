import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";

//Packages
import { useRouter, Router } from "expo-router";
import { hideMessage } from 'react-native-flash-message';

//Components
import Logo from "@/components/Logo/Logo";
import Icon from "@/components/Icon/Icon";

//Services
import { getUsername } from "@/services/AuthService";
import { check } from '@/services/CheckpointService';

//Constants
import { Colors } from "@/constants/Colors";

export default function Home() {
    const [action, setAction] = useState<'checkin' | 'checkout' | ''>('');  

    const router: Router = useRouter();

    const getStyles = (action: 'checkin' | 'checkout' | '') => {

      const buttonContainerWidth = Dimensions.get('window').width;
      const buttonWidth = buttonContainerWidth*0.4;
      const buttonLeftPosition = (buttonContainerWidth - buttonWidth)/2;
      const styles = StyleSheet.create({

        checkButton: {
          flex: 1,
          flexDirection: 'row',
          position: "absolute",
          justifyContent: 'center',
          alignItems: 'center',
          width: buttonWidth,
          paddingVertical: 10,
          borderRadius: 10,
          bottom: 30,
          left: buttonLeftPosition,
          backgroundColor: action == 'checkin' ? Colors.green : action == 'checkout' ? Colors.red : Colors.grey,
        }

      });

      return styles
    }

    useEffect(() => {

      const fetchData = async () => {

        const userName = await getUsername();
        const checkResult = await check(userName as string)

        if (checkResult) {

          setAction(checkResult.action);

        }

      }
      fetchData();


    }, []);

    return (
      <>
        <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >

            <Logo size="s" />
            </View>
        </View>

              {

                action == 'checkin' || action == 'checkout' ?
                <TouchableOpacity
                    onPress={ async() => {
                      hideMessage();
                      router.push('/pinloc');
                    }} 
                    style={ getStyles(action).checkButton }
                >
                  { action == 'checkin' ? <Icon.Checkin size={28} color={ Colors.white } /> :
                  <Icon.Checkout size={28} color={ Colors.white } /> }
                  <Text style={{color: Colors.white, fontSize: 15, marginLeft: 10}}>{ action == 'checkin' ? 'Checkin' : 'Checkout' }</Text>
                </TouchableOpacity> :
                <View
                    style={[
                      getStyles(action).checkButton,
                      {
                        paddingTop: 5,
                        paddingBottom: 5,
                      }
                    ]}
                >
                  <ActivityIndicator  size={30} color={ Colors.white } />
                </View>

              }


        
      </>
    );
}
