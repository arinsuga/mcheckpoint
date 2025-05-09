import React, {
    useState
} from 'react';
import {
    View,
    Modal,
    Text,
    TouchableOpacity,
    StyleSheet,
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
import Dates from '@/constants/Dates';

interface IDialogProps {
    visible?: boolean;
    actionOk: (dateFrom: string, dateTo: string) => Promise<void>;
    actionCancel: () => Promise<void>;
}

const DialogDatePeriod = ({ visible = false, actionOk, actionCancel }: IDialogProps) => {
    const [dateFrom, setDateFrom] = useState<string>(moment().format(Dates.format.date));
    const [dateTo, setDateTo] = useState(moment().format(Dates.format.date));
    
    const dlgBoxWidth = Dimensions.get('screen').width * 0.9;
    const dlgBoxHeight = Dimensions.get('screen').height * 0.35;
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

            { /** Dialog Box Overlay */ }
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.bgBlueTransparent,
            }}>

                { /** Dialog Box Container */ }
                <View style={{
                    flex: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: dlgBoxWidth,
                    height: dlgBoxHeight,
                    backgroundColor: Colors.white,
                    borderRadius: 10
                }}>

                    { /** Dialog Box Header */ }
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

                        <Text style={{ color: Colors.white }}>Pilih Periode</Text>

                    </View>

                    { /** Dialog Box Body */ }
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: dlgBoxWidth,
                        height: dlgBoxBodyHeight,
                        padding: 15,
                    }}>

                        <FieldDateRange label="From" currentValue={ dateFrom } onChangeText={(nextText: string) =>setDateFrom(nextText)} />
                        <FieldDateRange label="To" currentValue={ dateTo } onChangeText={(nextText: string) => setDateTo(nextText)} />

                    </View>

                    { /** Dialog Box Footer */ }
                    <View style={{
                            flex: 0,
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            width: dlgBoxWidth,
                            height: dlgBoxFooterHeight,
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10
                        }}>

                        <TouchableOpacity
                            onPress={() => {
                                setDateFrom(moment().format('DD/MM/YYYY'));
                                setDateTo(moment().format('DD/MM/YYYY'));
                                actionCancel();
                            }}
                            style={[
                                Styles.btn, styles.DialogButton
                            ]}
                        >
                            <Text style={Styles.btnText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => actionOk(dateFrom, dateTo)}
                            style={[
                                Styles.btn, styles.DialogButton
                            ]}
                        >
                            <Text style={Styles.btnText}>Ok</Text>
                        </TouchableOpacity>

                    </View>



                </View>

            </View>


        </Modal>

    );
};

export default DialogDatePeriod;

const styles = StyleSheet.create({
    DialogButton: {
        width: '30%',
        backgroundColor: Colors.orange,
    }

});