import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, LayoutChangeEvent } from "react-native";
import WebView from "react-native-webview";

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
    const [parentheight, setParentHeight] = useState(0);


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

    const onLayout = (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        setParentHeight(height);
    }

    return (
        <TouchableOpacity style={styles.itemContainer} activeOpacity={0.8}>
            <View style={styles.itemLeft}>
                <Text style={{fontWeight: 'bold'}}>{ item.time }</Text>
                <Text style={{color: color()?.type}}>{ item.type }</Text>
            </View>
            <View style={styles.itemRight}>
                <View style={{ backgroundColor: Colors.orange, borderRadius: 10, padding: 24, rowGap: 5 }} onLayout={onLayout}>
                    <View>
                        <Text style={{ color: Colors.white, fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
                        { item.subtitle && <Text style={{ color: Colors.white, fontSize: 12, fontWeight: '500' }}>{item.subtitle}</Text> }
                        <Text style={{ color: Colors.white, fontSize: 12, fontWeight: '500' }}>{item.description}</Text>
                    </View>
                    <Image
                        source={{ uri: item.image }}
                        style={{
                            width: '100%',
                            height: parentheight/2,
                            marginTop: 10,
                        }}
                        blurRadius={10}
                        resizeMode="cover"
                    />
                    <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 14 }}>
                        <Icon.Location color={Colors.white} size={16}/>
                        <View>
                            <Text style={{color: Colors.white}}>{item.address}</Text>
                        </View>
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
    itemRight: {flex:3, paddingBottom: 20, borderLeftWidth: 3, borderLeftColor: 'white'},
});
