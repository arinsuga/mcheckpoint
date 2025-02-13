import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";

//plugins
import moment from "moment";

//Components
import DateList from "@/components/DateList/DateList";
import TimelineList from "@/components/TimelineList/TimelineList";

//Constants
import { Colors } from "@/constants/Colors";

//Serives
import { getUsername } from "@/services/AuthService";
import { checkinHistory } from '@/services/ChekpointService';


export default function History() {
    const [currentDate, setCurrentDate] = useState(moment());
    const [selectedDate, setSelectedDate] = useState(currentDate.clone());
    const [dataList, setDataList] = useState<any | null>(null);


    const useDataList = async () => {

      const data = await checkinHistory({
        userName: await getUsername() as string,
        startdt: selectedDate,
        enddt: selectedDate,
        history_media: 'view'
      });

      console.log(`inside useDataList... ${selectedDate.format('YYYY-MM-DD')}`);
      console.log(data.data.data);

    }

    const handleSelectedDate = async (date: moment.Moment) => {

        setSelectedDate(date);
        useDataList();

    }


    useEffect(() => {

      useDataList();

    }, []);

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
            <Text style={{fontSize: 36, fontWeight: 'bold'}}>{ selectedDate.format('DD') }</Text>
            <View style={{flexDirection:'column'}}>
              <Text style={{color: Colors.grey, fontWeight: 'bold'}}>{ selectedDate.format('dddd') }</Text>
              <Text style={{color: Colors.grey, fontWeight: 'bold'}}>{ selectedDate.format('MMM') } { selectedDate.format('YYYY') }</Text>
            </View>
          </View>
          <Text style={{fontWeight: 'bold', color: Colors.orange, fontSize: 16}}>
            { currentDate.format('YYYY-MM-DD') === selectedDate.format('YYYY-MM-DD') ? 'Today' : '' }
          </Text>
        </View>

        {/* DATE LIST FILTER */}
        <DateList date={currentDate} onSelectedDate={handleSelectedDate}  />
        
        {/* DIVIDER */}
        <View style={{backgroundColor: Colors.white, height: 1}}></View>
        
        {/* DATA LIST */}
        <View style={{paddingHorizontal: 12}}>
          <TimelineList />
        </View>
      </SafeAreaView>
    );
}

