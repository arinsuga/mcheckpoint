import React, { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";

//Packages
import moment from "moment";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

//Context
import { useAuth } from "@/contexts/Authcontext";

//Components
import Relogin from "@/components/Relogin/Relogin";
import DateList from "@/components/DateList/DateList";
import TimelineList from "@/components/TimelineList/TimelineList";
import WaitingIndicator from "@/components/WaitingIndicator/WaitingIndicator";

//Constants
import { Colors } from "@/constants/Colors";
import Styles from "@/constants/Styles";

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
    const [isWaiting, setIsWaiting] = useState(true);
    const [authenticated, setAuthenticated] = useState(true);
    const { Authenticate } = useAuth();

    const fillDataLIst = (dataList: ICheckpointHistory[]): ITimeLine[] => {
        let data: ITimeLine[] = [];

        if ((dataList) && (dataList.length > 0)) {
            dataList.map((item) => {
                data.push({
                    id: uuidv4(),
                    type: 'Checkin',
                    date: item.checkin_date,
                    time: item.checkin_time,
                    datetime: item.checkin_datetime,
                    latitude: item.checkin_latitude,
                    longitude: item.checkin_longitude,
                    milliseconds: item.checkin_milliseconds,
                    title: item.checkin_title,
                    subtitle: item.checkin_subtitle,
                    address: item.checkin_address,
                    description: item.checkin_description,
                    image: item.checkin_image,
                });
        
                if (item.checkout_time) {

                    data.push({
                        id: uuidv4(),
                        type: 'Checkout',
                        date: item.checkout_date,
                        time: item.checkout_time,
                        datetime: item.checkout_datetime,
                        latitude: item.checkout_latitude,
                        longitude: item.checkout_longitude,
                        milliseconds: item.checkout_milliseconds,
                        title: item.checkout_title,
                        subtitle: item.checkout_subtitle,
                        address: item.checkout_address,
                        description: item.checkout_description,
                        image: item.checkout_image,
                    });

                }
        
            });

        }
  
        return data;
    }

    const useDataList = async (date: moment.Moment): Promise<ITimeLine[]> => {


      try {

        setDataList([]);
        const response = await historyByUserIdCheckpointDate({
          userName: await getUsername() as string,
          checkpointDate: date,
          history_media: 'view'
        });

        if (response.status != 200) {

          setAuthenticated(false);
          setIsWaiting(false);
          return [];
        }

        const data = fillDataLIst(response.data.data.attend_list);
        setDataList(data);
        setIsWaiting(false);

        return data;

      } catch (error: any) {

        // console.log('history - ERROR');
        // console.log(error);

        // console.log('history - ERROR DETAIlS')
        // console.log({status: error.status, message: error.message});

        setIsWaiting(false);
        return []
        
      }

    }

    const handleSelectedDate = useCallback(async (date: moment.Moment) => {

        setIsWaiting(true);
        const data = await useDataList(date);

        setSelectedDate(date);

    }, []); 


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

        <WaitingIndicator isWaiting={isWaiting} />

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
          <Relogin display={ !authenticated && !isWaiting } />

        </View>
      </SafeAreaView>
    );
}


const styles = StyleSheet.create({

});