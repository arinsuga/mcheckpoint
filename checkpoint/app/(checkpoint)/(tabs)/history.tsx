import { Text, View } from "react-native";

import { Link } from "expo-router";
import DateList from "@/components/DateList/DateList";
import TimelineList from "@/components/TimelineList/TimelineList";

export default function History() {
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

