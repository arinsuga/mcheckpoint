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
        <TouchableOpacity style={[styles.itemContainer, {backgroundColor: color()?.bg}]} activeOpacity={0.8}>
            <View onLayout={onLayout}>
                <View>
                    <Text style={[styles.itemTitle, { color: color()?.text, }]}>
                        {item.type}
                    </Text>
                </View>

                {
                    item.image &&
                    <View style={{ flex: 1 }}>
                        <FastImage
                            source={{ uri: item.image, priority: FastImage.priority.normal }}
                            resizeMode={ FastImage.resizeMode.contain }
                            style={{
                                width: '100%',
                                marginTop: 10,
                                height: item.image  ? parentheight/2 : 0,
                            }}
                        />
                    </View>
                }


                <View style={styles.item}>
                    <Icon.Date color={color()?.icon} size={18}/>
                    <View>
                        <Text style={{ color: color()?.text }}>{item.date}</Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <Icon.Time color={color()?.icon} size={18}/>
                    <View>
                        <Text style={{ color: color()?.text }}>{item.time}</Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <Icon.Note color={color()?.icon} size={18}/>
                    <View style={{ flex: 1, }}>
                        <Text style={{ color: color()?.text }}>{item.description}</Text>
                    </View>
                </View>

                <View style={styles.item}>
                    <Icon.Location color={color()?.icon} size={18}/>
                    <View style={{ flex: 1, }}>
                        <Text style={{ color: color()?.text, overflow: 'scroll' }}>{item.address}</Text>
                    </View>
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


            </View>
        </TouchableOpacity>
    )
});

export default TimelineItem;

const styles = StyleSheet.create({
    itemContainer: {
        flex:1,
        flexDirection: 'column',
        borderLeftWidth: 3,
        borderLeftColor: Colors.white,
        borderRadius: 10,
        paddingHorizontal: 18,
        paddingTop: 10,
        paddingBottom: 20,
        marginBottom: 20
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        columnGap: 10
    },
});
