import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";

//plugins
import moment from "moment";

//Components
import DateList from "@/components/DateList/DateList";
import DateListNotuse from "@/components/DateList/DateListNotuse";
import TimelineList from "@/components/TimelineList/TimelineList";

//Constants
import { Colors } from "@/constants/Colors";

export default function History() {
    const [currentDate, setCurrentDate] = useState(moment());

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}
    >
      {/* SECTION HEADER */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12}}>
        <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 8}}>
          <Text style={{fontSize: 36, fontWeight: 'bold'}}>24</Text>
          <View style={{flexDirection:'column'}}>
            <Text style={{color: Colors.grey, fontWeight: 'bold'}}>Wed</Text>
            <Text style={{color: Colors.grey, fontWeight: 'bold'}}>Jan 2020</Text>
          </View>
        </View>
        <Text style={{fontWeight: 'bold', color: Colors.orange, fontSize: 16}}>Today</Text>
      </View>
      {/* SECTION HEADER */}

      {/* DATE LIST FILTER */}
      <DateList date={currentDate}  />
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

