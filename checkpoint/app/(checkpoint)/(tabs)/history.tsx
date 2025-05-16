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
import Dates from "@/constants/Dates";

//Interfaces
import ITimeLine from "@/interfaces/ITimeLine";
import ICheckpointHistory from "@/interfaces/ICheckpointHistory";

//Serivces
import { getUsername } from "@/services/AuthService";
import TimeLineService from "@/services/TimeLineService";
import { historyByUserIdCheckpointDate, historyByUserIdCheckpointPeriod } from '@/services/CheckpointService';
import { create } from "axios";

export default function History() {
    const [currentDate, setCurrentDate] = useState(moment());
    const [selectedDate, setSelectedDate] = useState(currentDate.clone());
    const [isWaiting, setIsWaiting] = useState(true);
    const [authenticated, setAuthenticated] = useState(true);
    const [timeLineList, setTimeLineList] = useState<ITimeLine[]>([]);
    const [showPeriod, setShowPeriod] = useState(false);
    const { Authenticate } = useAuth();

    const handleSelectedDate = useCallback(async (date: moment.Moment) => {

        //check Authentication
        Authenticate && Authenticate();

        setIsWaiting(true);
        setTimeLineList([]);

        const userName = await getUsername() as string
        const data = await getTimelineByDate(userName, date);
        
        setIsWaiting(false);
        setTimeLineList(data);
        setSelectedDate(date);

    }, []);

    const getTimelineByDate = async (userName: string, date: moment.Moment): Promise<ITimeLine[]> => {


      try {

        const dataHistory: ICheckpointHistory[] = await historyByUserIdCheckpointDate(userName, date, 'view');;
        const data = TimeLineService.fillTimeLine(dataHistory);


        return data
      } catch (error: any) {

        console.error("Error fetching checkpoint history:", error);
        return [];
        
      }

    }

    const createPDF = async (data: ICheckpointHistory[]): Promise<boolean> => {

        try {

          const htmlContent = await AttendHistory(data);
          const { uri } = await Print.printToFileAsync({ html: htmlContent });
          console.log('PDF saved at:', uri);
          await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });

          return true
        } catch(error) {

          console.error("Error creating PDF:", error);
          return false;
        }


    }

    const handleCreatePDF = async () => {

      let data: ICheckpointHistory[] = [];
      setShowPeriod(true);

    }

    const handleCreatePDFOk = async (dateFrom: string, dateTo: string) => {

      setShowPeriod(false);
      
      const userName = await getUsername() as string
      const data = await getHistoryByPeriod(userName, moment(dateFrom, Dates.format.date), moment(dateTo, Dates.format.date));
      const result = await createPDF(data);

    }

    const handleCreatePDFCancel = async () => {

      setShowPeriod(false);

    }

    const getHistoryByPeriod = async (userName: string, startdt: moment.Moment, enddt: moment.Moment): Promise<ICheckpointHistory[]> => {


      try {

        const data: ICheckpointHistory[] = await historyByUserIdCheckpointPeriod(userName, startdt, enddt, 'view');

        return data
      } catch (error: any) {

        console.error("Error fetching checkpoint history:", error);
        return [];
        
      }

    }

    useEffect(() => {
      const fetchData = async () => {

        setTimeLineList([]);
        setIsWaiting(true);

        const userName = await getUsername() as string
        const data = await getTimelineByDate(userName, selectedDate);

        setTimeLineList(data);
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

        <DialogDatePeriod visible={showPeriod} actionOk={handleCreatePDFOk} actionCancel={handleCreatePDFCancel} />
      </SafeAreaView>
    );
}


const styles = StyleSheet.create({

});