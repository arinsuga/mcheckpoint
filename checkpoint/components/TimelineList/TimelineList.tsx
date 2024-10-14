import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from '../Icon';

const data = [
    {
        time: '11:35',
        type: 'Checkin',
        title: 'RT. Pak Benyanto',
        subtitle: 'Chapter 1: Introduction',
        location: 'Room 6-205',
    },
    {
        time: '11:35',
        type: 'Checkout',
        title: 'RT. Pak Benyanto',
        subtitle: 'Chapter 1: Introduction',
        location: 'Room 6-205',
    },
    {
        time: '11:35',
        type: 'Checkin',
        title: 'RT. Pak Benyanto',
        subtitle: 'Chapter 1: Introduction',
        location: 'Room 6-205',
    },
    {
        time: '11:35',
        type: 'Checkout',
        title: 'RT. Pak Benyanto',
        subtitle: 'Chapter 1: Introduction',
        location: 'Room 6-205',
    },
    {
        time: '11:35',
        type: 'Checkin',
        title: 'RT. Pak Benyanto',
        subtitle: 'Chapter 1: Introduction',
        location: 'Room 6-205',
    },
    {
        time: '11:35',
        type: 'Checkout',
        title: 'RT. Pak Benyanto',
        subtitle: 'Chapter 1: Introduction',
        location: 'Room 6-205',
    },
];

/**
 * TODO: Buat TimelineItemProps type
 */
const TimelineItem = ({item}) => {

    const color = () => {
        if(item.type === 'Checkin') {
            return {
                bg: '#d16224',
                text: 'white',
                icon: 'white',
                type: '#d16224',
            }
        }
        if(item.type === 'Checkout') {
            return {
                bg: 'white',
                text: '#212525',
                icon: '#88889e',
                type: '#BCC1CD',
            }
        }
    }
    return (
        <TouchableOpacity style={styles.itemContainer} activeOpacity={0.8}>
            <View style={styles.itemLeft}>
                <Text style={{fontWeight: 'bold'}}>11:35</Text>
                <Text style={{color: color()?.type}}>Checkin</Text>
            </View>
            <View style={styles.itemRight}>
                <View style={[styles.card, {backgroundColor: color()?.bg}]}>
                    <View>
                        <Text style={[styles.itemTitle, {color: color()?.text}]}>{item.title}</Text>
                        <Text style={[styles.itemSubtitle, {color: color()?.text}]}>{item.subtitle}</Text>
                    </View>
                    <View style={styles.wrapIcon}>
                        <Icon.Location color={color()?.icon} size={16}/>
                        <Text style={{color: color()?.text}}>{item.location}</Text>
                    </View>
                    <View style={styles.wrapIcon}>
                        <Icon.Location color={color()?.icon} size={16}/>
                        <Text style={{color: color()?.text}}>{item.location}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const Header = () => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.timeCol}>
                <Text style={styles.headerTitle}>Time</Text>
            </View>
            <View style={styles.actCol}>
                <Text style={styles.headerTitle}>Activity</Text>
            </View>
            <View style={styles.filterCol}>
                <Text style={styles.headerTitle}>Icon</Text>
            </View>
        </View>
    )
}
const TimelineList = () => {
    return (
        <View>
            <FlatList
                ListHeaderComponent={Header}
                data={data}
                renderItem={TimelineItem}
                contentContainerStyle={{paddingBottom: 150}}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default TimelineList

/**
 * TODO: pindahkan penggunaan color ke design system / constant color (Global color schema)
 */
const styles = StyleSheet.create({
    headerContainer: {flex: 1, flexDirection: 'row', alignItems: 'center'},
    headerTitle: {color: '#BCC1CD', fontWeight: 'bold'},
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
})