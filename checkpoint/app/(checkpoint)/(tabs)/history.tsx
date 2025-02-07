import React from "react";
import { Text, View } from "react-native";
import DateList from "@/components/DateList/DateList";
import TimelineList from "@/components/TimelineList/TimelineList";
import WaitingIndicator from "@/components/WaitingIndicator/WaitingIndicator";

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
    <View
      style={{
        flex: 1,
        // padding: 12,
        backgroundColor: '#eef1f5',
        rowGap: 12,
      }}
    >
      {/* SECTION HEADER */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12}}>
        <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 8}}>
          <Text style={{fontSize: 44, fontWeight: 'bold'}}>24</Text>
          <View style={{flexDirection:'column'}}>
            <Text style={{color: '#BCC1CD', fontWeight: 'bold'}}>Wed</Text>
            <Text style={{color: '#BCC1CD', fontWeight: 'bold'}}>Jan 2020</Text>
          </View>
        </View>
        <Text style={{fontWeight: 'bold', color: '#D16224', fontSize: 16}}>Today</Text>
      </View>
      {/* SECTION HEADER */}

      {/* DATE LIST FILTER */}
      <DateList/>
      {/* DATE LIST FILTER */}
      
      {/* DIVIDER */}
      <View style={{backgroundColor: 'white', height: 1}}></View>
      {/* DIVIDER */}
      
      <View style={{paddingHorizontal: 12}}>
        <TimelineList />
      </View>
    </View>
  );
}

