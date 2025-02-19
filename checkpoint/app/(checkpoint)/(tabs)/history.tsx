import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";

//plugins
import moment from "moment";

//Components
import DateList from "@/components/DateList/DateList";
import TimelineList from "@/components/TimelineList/TimelineList";

//Constants
import { Colors } from "@/constants/Colors";

//Interfaces
import ITimeLine from "@/interfaces/ITimeLine";
import ICheckpointHistory from "@/interfaces/ICheckpointHistory";

//Serivces
import { getUsername } from "@/services/AuthService";
import { historyByUserIdCheckpointDate } from '@/services/ChekpointService';


export default function History() {
    const [currentDate, setCurrentDate] = useState(moment());
    const [selectedDate, setSelectedDate] = useState(currentDate.clone());
    const [dataList, setDataList] = useState<ITimeLine[]>([]);

    const fillDataLIst = (dataList: ICheckpointHistory[]): ITimeLine[] => {
        let data: ITimeLine[] = [];

        if ((dataList) && (dataList.length > 0)) {

            dataList.map((item) => {
                data.push({
                    time: item.checkin_time,
                    type: 'Checkin',
                    title: item.name,
                    subtitle: item.checkin_description,
                    location: item.checkin_address
                });
        
                if (item.checkout_time) {

                    data.push({
                        time: item.checkout_time,
                        type: 'Checkout',
                        title: item.name,
                        subtitle: item.checkout_description,
                        location: item.checkout_address
                    });

                }
        
            });

        }
  
        return data;
    }


    const useDataList = async (date: moment.Moment): Promise<ITimeLine[]> => {

      const response = await historyByUserIdCheckpointDate({
        userName: await getUsername() as string,
        checkpointDate: date,
        history_media: 'view'
      });

      const data = fillDataLIst(response.data.data.attend_list);
      setDataList(data);

      console.log(`useDataList [${date}]...`);
      console.log(response.data.data.attend_list);

      return data;
    }

    const handleSelectedDate = async (date: moment.Moment) => {

        const data = await useDataList(date);
        setSelectedDate(date);
        setDataList(data);
    }


    useEffect(() => {
      useDataList(selectedDate);      
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
          <TimelineList dataList={dataList} />
        </View>
      </SafeAreaView>
    );
}

