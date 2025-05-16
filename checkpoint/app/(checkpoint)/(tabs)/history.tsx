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
import TimeLineService from "@/services/TimeLineService";
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
        const response = await historyByUserIdCheckpointDate(userName, date, 'view');

        if (response.status == 200) {

          if (response.data.data.attend_list) {
            dataHistory =  response.data.data.attend_list;
          }

        } else {

          dataHistory = [];

        }

        const data = TimeLineService.fillTimeLine(dataHistory);

        setCheckpointHistory(dataHistory);
        setTimeLineList(data);

        return true
      } catch (error: any) {

        console.error("Error fetching checkpoint history:", error);
        return false;
        
      }

    }

    const CreatePDF = async (data: ICheckpointHistory[]) => {

        const htmlContent = await AttendHistory(data);

        
        const { uri } = await Print.printToFileAsync({ html: htmlContent });
        console.log('PDF saved at:', uri);
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });

    }

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