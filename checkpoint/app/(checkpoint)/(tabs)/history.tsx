import React, { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";

//Packages
import moment from "moment";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import * as Print from 'expo-print'
import { shareAsync } from "expo-sharing";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

//Context
import { useAuth } from "@/contexts/Authcontext";

//Components
import Relogin from "@/components/Relogin/Relogin";
import DateList from "@/components/DateList/DateList";
import TimelineList from "@/components/TimelineList/TimelineList";
import WaitingIndicator from "@/components/WaitingIndicator/WaitingIndicator";
import DialogDatePeriod from "@/components/DialogDatePeriod/DialogDatePeriod";

//Templates
import AttendHistory from "@/templates/attends/AttendHistory";

//Constants
import Styles from "@/constants/Styles";
import { Colors } from "@/constants/Colors";

//Interfaces
import ITimeLine from "@/interfaces/ITimeLine";
import ICheckpointHistory from "@/interfaces/ICheckpointHistory";

//Serivces
import { getUsername } from "@/services/AuthService";
import { historyByUserIdCheckpointDate } from '@/services/CheckpointService';

export default function History() {
    const [currentDate, setCurrentDate] = useState(moment());
    const [selectedDate, setSelectedDate] = useState(currentDate.clone());
    const [isWaiting, setIsWaiting] = useState(true);
    const [authenticated, setAuthenticated] = useState(true);
    const [timeLineList, setTimeLineList] = useState<ITimeLine[]>([]);
    const [checkpointHistory, setCheckpointHistory] = useState<ICheckpointHistory[]>([]);
    const [showPeriod, setShowPeriod] = useState(false);
    const { Authenticate } = useAuth();

    const handleSelectedDate = useCallback(async (date: moment.Moment) => {

        //check Authentication
        Authenticate && Authenticate();

        setIsWaiting(true);

        const userName = await getUsername() as string
        const success = await getHistoryByDate(userName, date);
        
        setIsWaiting(false);
        setSelectedDate(date);

    }, []);

    const getHistoryByDate = async (userName: string, date: moment.Moment): Promise<boolean> => {


      try {

        setTimeLineList([]);
        setCheckpointHistory([]);

        let dataHistory: ICheckpointHistory[] = [];
        const response = await historyByUserIdCheckpointDate({
          userName,
          checkpointDate: date,
          history_media: 'view'
        });

        if (response.status == 200) {

          if (response.data.data.attend_list) {
            dataHistory =  response.data.data.attend_list;
          }

        } else {

          dataHistory = [];

        }

        const data = fillTimeLine(dataHistory);

        setCheckpointHistory(dataHistory);
        setTimeLineList(data);

        return true
      } catch (error: any) {

        console.error("Error fetching checkpoint history:", error);
        return false;
        
      }

    }

    const fillTimeLine = (timeLineList: ICheckpointHistory[]): ITimeLine[] => {
        let data: ITimeLine[] = [];

        if ((timeLineList) && (timeLineList.length > 0)) {
            timeLineList.map((item) => {
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

    const CreatePDF = async (data: ICheckpointHistory[]) => {

        const htmlContent = await AttendHistory(data);

        
        const { uri } = await Print.printToFileAsync({ html: htmlContent });
        console.log('PDF saved at:', uri);
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });

    }

    // const useDataListPDF = async (username: string, dateFrom: string, dateTo: string): Promise<boolean> => {


    //   try {

    //     setTimeLineList([]);
    //     setCheckpointHistory([]);

    //     const dataHistory = await useCheckpointHistoryByPeriod(username, dateFrom, dateTo);
    //     const data = fillTimeLine(dataHistory);

    //     setCheckpointHistory(dataHistory);
    //     setTimeLineList(data);

    //     return true
    //   } catch (error: any) {

    //     return false;
        
    //   }

    // }

    const handleCreatePDF = async () => {

      let data: ICheckpointHistory[] = [];
      setShowPeriod(true);

    }

    const handleCreatePDFOk = async (dateFrom: string, dateTo: string) => {

      console.log(dateFrom, dateTo);

      setShowPeriod(false);

    }

    const handleDialogCancel = async () => {

      setShowPeriod(false);

    }

    useEffect(() => {
      const fetchData = async () => {
        setIsWaiting(true);

        const userName = await getUsername() as string
        await getHistoryByDate(userName, selectedDate);

        setIsWaiting(false);
      };

      fetchData();
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
            <Text style={{fontSize: 36, fontWeight: 'bold'}}>{ selectedDate ? selectedDate.format('DD') : 'N/A' }</Text>
            <View style={{flexDirection:'column'}}>
              <Text style={{color: Colors.grey, fontWeight: 'bold'}}>{ selectedDate.format('dddd') } - { currentDate.format('YYYY-MM-DD') === selectedDate.format('YYYY-MM-DD') ? 'Today' : '' }</Text>
              <Text style={{color: Colors.grey, fontWeight: 'bold'}}>{ selectedDate.format('MMM') } { selectedDate.format('YYYY') }</Text>
            </View>
          </View>
          <TouchableOpacity style={ [Styles.btn, { backgroundColor: Colors.danger }] } onPress={ () => handleCreatePDF() }>

            <Text style={ Styles.btnText }>PDF</Text>

          </TouchableOpacity>

        </View>

        {/* DATE LIST FILTER */}
        <DateList date={currentDate} onSelectedDate={handleSelectedDate}  />
        
        {/* DIVIDER */}
        <View style={{backgroundColor: Colors.white, height: 1}}></View>
        
        {/* DATA LIST */}
        <View style={{paddingHorizontal: 12}}>

          <TimelineList data={timeLineList} />
          <Relogin display={ !authenticated && !isWaiting } />
        </View>

        <DialogDatePeriod visible={showPeriod} actionOk={handleCreatePDFOk} actionCancel={handleDialogCancel} />
      </SafeAreaView>
    );
}


const styles = StyleSheet.create({

});