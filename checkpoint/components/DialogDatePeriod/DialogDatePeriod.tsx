import React, {
    useState
} from 'react';
import {
    View,
    Modal,
    Text,
    TouchableOpacity,
    Platform,
    Dimensions
} from 'react-native';

//Packages
import moment from 'moment';

//Components
import FieldDateRange from '@/components/FieldDateRange/FieldDateRange';

//Constants
import { Colors } from '@/constants/Colors';
import FormStyles from '@/constants/FormStyles';
import Styles from '@/constants/Styles';

interface IDialogProps {
    visible?: boolean;
    actionOk: (dateFrom: moment.Moment, dateTo: moment.Moment) => Promise<void>;
    actionCancel: () => Promise<void>;
}

const DialogDatePeriod = ({ visible = false, actionOk, actionCancel }: IDialogProps) => {
    const [dateFrom, setDateFrom] = useState(moment());
    const [dateTo, setDateTo] = useState(moment());
    const dlgBoxWidth = Dimensions.get('screen').width * 0.9;
    const dlgBoxHeight = Dimensions.get('screen').height * 0.4;
    const dlgBoxHeaderHeight = dlgBoxHeight * 0.2;
    const dlgBoxBodyHeight = (dlgBoxHeight * 0.5);
    const dlgBoxFooterHeight = dlgBoxHeight * 0.3;


    return (

        <Modal
            animationType='slide'
            transparent={true}
            visible={visible}
            onRequestClose={() => console.log('Modal has been closed.')}
        >

            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.bgBlueTransparent,
            }}>

                <View style={{
                    flex: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: dlgBoxWidth,
                    height: dlgBoxHeight,
                    backgroundColor: Colors.white,
                    borderRadius: 10
                }}>

                    <View style={{
                        flex: 0,
                        justifyContent: 'center',
                        width: dlgBoxWidth,
                        height: dlgBoxHeaderHeight,
                        backgroundColor: Colors.orange,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        paddingLeft: 20,
                    }}>

                        <Text style={{ color: Colors.white }}>Select Period</Text>

                    </View>

                    <View style={{
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        width: dlgBoxWidth,
                        height: dlgBoxBodyHeight,
                    }}>

                        <FieldDateRange />
                        <FieldDateRange />

                    </View>

                    <View style={{
                        flex: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: dlgBoxWidth,
                        height: dlgBoxFooterHeight,
                    }}>

                    </View>



                </View>

            </View>


        </Modal>

    );
};

export default DialogDatePeriod;