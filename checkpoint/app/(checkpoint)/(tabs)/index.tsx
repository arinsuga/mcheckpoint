import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  StyleProp,
  ViewStyle,
} from "react-native";

//Packages
import { useRouter, Router } from "expo-router";

//Components
import Logo from "@/components/Logo/Logo";
import Icon from "@/components/Icon/Icon";

//Services
import { refreshAuthToken, getUsername } from "@/services/AuthService";
import { check } from '@/services/CheckpointService';

//Interfaces
import ICheckpoint from "@/interfaces/ICheckpoint";

//Constants
import { Colors } from "@/constants/Colors";

export default function Home() {
    const [action, setAction] = useState<'checkin' | 'checkout' | ''>('');  

    const router: Router = useRouter();

    const getStyles = (action: 'checkin' | 'checkout' | '') => {

      const styles = StyleSheet.create({

        checkButton: {
          flex: 1,
          position: "absolute",
          justifyContent: 'center',
          alignItems: 'center',
          width: Dimensions.get('window').width*0.3,
          padding: 10,
          borderRadius: 10,
          bottom: 30,
          right: 30,
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
            <Text style={{ marginBottom: 40 }}>1.1.0</Text>
        </View>

              {

                action == 'checkin' || action == 'checkout' ?
                <TouchableOpacity
                    onPress={ async() => router.push('/pinloc')} 
                    style={ getStyles(action).checkButton }
                >
                  <Text style={{color: Colors.white}}>{ action == 'checkin' ? 'Checkin' : 'Checkout' }</Text>
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
