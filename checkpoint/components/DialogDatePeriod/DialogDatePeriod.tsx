import React, {
    useState
} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';

//Packages
import moment from 'moment';

//Constants
import { Colors } from '@/constants/Colors';
import FormStyles from '@/constants/FormStyles';
import Styles from '@/constants/Styles';

interface IDialogProps {
    actionOk: (dateFrom: moment.Moment, dateTo: moment.Moment) => Promise<void>;
    actionCancel: () => Promise<void>;
}

const DialogDatePeriod = ({ actionOk, actionCancel }: IDialogProps) => {
    const [dateFrom, setDateFrom] = useState(moment());
    const [dateTo, setDateTo] = useState(moment());
    const dialogBoxWidth = Dimensions.get('screen').width * 0.9;


    return (
        <View style={{
            position: 'absolute',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            top: 0,
            left: 0,
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
        }}>

            <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width,
                backgroundColor: Colors.blue,
                opacity: 0.5,
            }} />

            <View style={{
                width: dialogBoxWidth,
                height: Dimensions.get('screen').height * 0.25,
                backgroundColor: Colors.white,
                borderRadius: 10,
            }}>
            

                <View style={{
                    width: dialogBoxWidth,
                    backgroundColor: Colors.orange,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    padding: 10
                }}>
                    <Text style={{ color: Colors.white }}>Pilih Periode : </Text>
                </View>

                <View style={{
                    width: dialogBoxWidth,
                    backgroundColor: Colors.blue
                }}>

                </View>


            </View>



        </View>

    );
};

export default DialogDatePeriod;