import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import DateList from "@/components/DateList/DateList";
import DateListNotuse from "@/components/DateList/DateListNotuse";
import TimelineList from "@/components/TimelineList/TimelineList";

//Components
import { Colors } from "@/constants/Colors";

//Services
import { getToken, getRefreshToken } from "@/services/AuthService";


export default function History() {

  React.useEffect(() => {
    

    (async () => {

      console.log('History');
      const token = await getToken();
      const refreshToken = await getRefreshToken();
      console.log({
        token,
        refreshToken
      });
    

    })();


    
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        rowGap: 12,
      }}
    >
      {/* SECTION HEADER */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12}}>
        <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 8}}>
          <Text style={{fontSize: 44, fontWeight: 'bold'}}>24</Text>
          <View style={{flexDirection:'column'}}>
            <Text style={{color: Colors.grey, fontWeight: 'bold'}}>Wed</Text>
            <Text style={{color: Colors.grey, fontWeight: 'bold'}}>Jan 2020</Text>
          </View>
        </View>
        <Text style={{fontWeight: 'bold', color: Colors.orange, fontSize: 16}}>Today</Text>
      </View>
      {/* SECTION HEADER */}

      {/* DATE LIST FILTER */}
      <DateList />
      {/* DATE LIST FILTER */}
      
      {/* DIVIDER */}
      <View style={{backgroundColor: Colors.white, height: 1}}></View>
      {/* DIVIDER */}
      
      <View style={{paddingHorizontal: 12}}>
        <TimelineList />
      </View>
    </SafeAreaView>
  );
}

