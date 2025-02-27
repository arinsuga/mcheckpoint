import React, { useEffect } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

//Constats
import { Colors } from '@/constants/Colors';

//Interfaces
import ITimeLine from '@/interfaces/ITimeLine';

//Components
import TimelineHeader from './TimelineHeader';
import TimelineItem from './TimelineItem';

interface IDataListProps {
    dataList: ITimeLine[];
}

const TimelineList = ({ dataList }: IDataListProps) => {

    // console.log(`TimelineList - dataList...`);
    // console.log(dataList);


    return (
        <View>
            {
                dataList &&
                <FlatList
                    ListHeaderComponent={TimelineHeader}
                    data={dataList}
                    renderItem={({ item }) => <TimelineItem item={item} />}
                    contentContainerStyle={{paddingBottom: 150}}
                    showsVerticalScrollIndicator={false}
                />
            }
        </View>
    )
}

export default TimelineList

const styles = StyleSheet.create({
    headerContainer: {flex: 1, flexDirection: 'row', alignItems: 'center'},
    headerTitle: {color: Colors.orange, fontWeight: 'bold'},
    timeCol: {flex:1, padding: 8, alignItems: 'center'},
    actCol: {flex:4, padding: 8, paddingLeft: 16},
    filterCol: {flex:1, paddingRight: 16, alignItems: 'flex-end'},
    itemContainer: {flexDirection: 'row'},
    itemLeft: {flex: 1, alignItems: 'center'},
    itemRight: {flex:4, paddingHorizontal: 12, paddingBottom: 20, borderLeftWidth: 3, borderLeftColor: 'white'},
    card: { backgroundColor: '#d16224', borderRadius: 10, padding: 24, rowGap: 10},
    itemTitle: {color: 'white', fontSize: 16, fontWeight: 'bold'},
    itemSubtitle: {color: 'white', fontSize: 12, fontWeight: '500'},
    wrapIcon: {flexDirection: 'row', alignItems: 'center', columnGap: 14},
});
