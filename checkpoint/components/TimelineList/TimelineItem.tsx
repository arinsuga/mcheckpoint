import React, { useState, memo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, LayoutChangeEvent } from "react-native";

//Packages
import FastImage from "react-native-fast-image";

//Components
import Icon from '@/components/Icon/Icon';
//Constants
import { Colors } from "@/constants/Colors";
//Interfaces
import ITimeLine from "@/interfaces/ITimeLine";

type TimelineItemProps = {
    item: ITimeLine
}
const TimelineItem = memo(({item}: TimelineItemProps) => {
    const [parentheight, setParentHeight] = useState(0);


    const color = () => {
        if(item.type === 'Checkin') {
            return {
                bg: Colors.orange,
                text: Colors.white,
                icon: Colors.white,
                type: Colors.orange,
                border: Colors.white,
            }
        }
        if(item.type === 'Checkout') {
            return {
                bg: Colors.whiteDark,
                text: Colors.greyDark,
                icon: Colors.greyDark,
                type: Colors.greyDark,
                border: Colors.orange,
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
                <Text style={{fontWeight: 'bold'}}>{ item.date }</Text>
                <Text style={{fontWeight: 'bold'}}>{ item.time }</Text>
                <Text style={{color: color()?.type}}>{ item.type }</Text>
            </View>
            <View style={styles.itemRight}>
                <View style={{ backgroundColor: color()?.bg, borderRadius: 10, padding: 24, rowGap: 5 }} onLayout={onLayout}>
                    <View>
                        {
                            item.title &&
                            <Text style={{ color: color()?.text, fontSize: 16, fontWeight: 'bold' }}>
                                {item.title}
                            </Text>
                        }
                        {
                            item.subtitle &&
                            <Text style={{ color: color()?.text, fontSize: 12, fontWeight: '500' }}>{item.subtitle}</Text>
                        }
                        <Text style={{ color: color()?.text, fontSize: 12, fontWeight: '500' }}>{item.description}</Text>
                    </View>

                    {/* <CachedImage
                        source={{ uri: item.image }}
                        cacheKey={item.id}
                        style={{
                            width: '100%',
                            height: parentheight/2,
                            marginTop: 10,
                        }}
                    /> */}

                    {
                        item.image &&
                        <FastImage
                            source={{ uri: item.image, priority: FastImage.priority.normal }}
                            resizeMode={ FastImage.resizeMode.contain }
                            style={{
                                width: '100%',
                                marginTop: 10,
                                height: item.image  ? parentheight/2 : 0,
                            }}
                        />
                    }

                    <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 14 }}>
                        <Icon.Location color={color()?.icon} size={16}/>
                        <View>
                            <Text style={{ color: color()?.text }}>{item.address}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
});

export default TimelineItem;

const styles = StyleSheet.create({
    itemContainer: {flexDirection: 'row'},
    itemLeft: {flex: 1, alignItems: 'center', justifyContent: 'flex-start'},
    itemRight: {flex:3, paddingBottom: 20, borderLeftWidth: 3, borderLeftColor: Colors.white},
});
