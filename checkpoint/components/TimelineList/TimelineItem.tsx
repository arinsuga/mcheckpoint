import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

//Components
import Icon from '@/components/Icon/Icon';
//Constants
import { Colors } from "@/constants/Colors";
//Interfaces
import ITimeLine from "@/interfaces/ITimeLine";

type TimelineItemProps = {
    item: ITimeLine
}

const TimelineItem = ({item}: TimelineItemProps) => {

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
                <Text style={{fontWeight: 'bold'}}>{ item.time }</Text>
                <Text style={{color: color()?.type}}>{ item.type }</Text>
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
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default TimelineItem;

const styles = StyleSheet.create({
    itemContainer: {flexDirection: 'row'},
    itemLeft: {flex: 1, alignItems: 'center'},
    itemRight: {flex:4, paddingHorizontal: 12, paddingBottom: 20, borderLeftWidth: 3, borderLeftColor: 'white'},
    card: { backgroundColor: '#d16224', borderRadius: 10, padding: 24, rowGap: 10},
    itemTitle: {color: 'white', fontSize: 16, fontWeight: 'bold'},
    itemSubtitle: {color: 'white', fontSize: 12, fontWeight: '500'},
    wrapIcon: {flexDirection: 'row', alignItems: 'center', columnGap: 14},
});
