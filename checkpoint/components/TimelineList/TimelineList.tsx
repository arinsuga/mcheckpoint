import React, { useState, useRef } from 'react'
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native'
import moment from 'moment';

//Constats
import { Colors } from '@/constants/Colors';

//Interfaces
import ITimeLine from '@/interfaces/ITimeLine';

//Components
import TimelineHeader from './TimelineHeader';
import TimelineItem from './TimelineItem';

interface IDataListProps {
    data: ITimeLine[];
    date: moment.Moment;
    isRefreshing: boolean;
    onRefresh: (data: moment.Moment) => Promise<void>;
}

const TimelineList = ({ data, date, isRefreshing = false, onRefresh }: IDataListProps) => {
    // const [isRefreshing, setIsRefreshing] = React.useState(false);
    const flatRefresh = React.useRef<RefreshControl>(null);

    const handleFlatRefresh = () => {
        
        onRefresh(date);

    }

    return (
        <View>
            {
                data &&
                <FlatList
                    // ListHeaderComponent={TimelineHeader}
                    data={data}
                    renderItem={({ item }) => <TimelineItem item={item} />}
                    contentContainerStyle={{paddingBottom: 150}}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={handleFlatRefresh}
                            colors={[Colors.orange]}
                        />
                    }
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
