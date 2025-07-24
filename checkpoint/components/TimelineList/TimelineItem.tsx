import React, { useState, memo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, LayoutChangeEvent } from "react-native";

//Packages
import FastImage from "react-native-fast-image";

//Components
import Icon from '@/components/Icon/Icon';

//Constants
import { Colors } from "@/constants/Colors";
import Styles from '@/constants/Styles';

//Interfaces
import ITimeLine from "@/interfaces/ITimeLine";

type TimelineItemProps = {
    item: ITimeLine
}
const TimelineItem = memo(({item}: TimelineItemProps) => {
    const [parentheight, setParentHeight] = useState(0);
    const [isShowImage, setIsShowImage] = useState(false);


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
                bg: Colors.grey,
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

    const handleShowImage = () => {
        setIsShowImage(!isShowImage);
        console.log('show image');
    }   

    return (
        <TouchableOpacity style={[styles.itemContainer, {backgroundColor: color()?.bg}]} activeOpacity={0.8}>
            <View onLayout={onLayout}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                }}>
                    <Text style={[styles.itemTitle, { color: color()?.text, }]}>
                        {item.type}
                    </Text>
                    <TouchableOpacity style={[
                        Styles.btn,
                        {
                            flex: .6,
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            backgroundColor: item.type == 'Checkin' ? Colors.yellow : Colors.greyDark,
                            paddingHorizontal: 10,
                            paddingVertical: 5
                        }
                    ]} onPress={ () => handleShowImage() }>


                        <Text style={ [
                            Styles.btnText,
                            {
                                color: item.type == 'Checkin' ? Colors.black : Colors.white,
                                marginRight: 5,
                            }
                        ] }>
                            { isShowImage ? 'Hide Image' : 'Show Image' }
                        </Text>
                        {
                            isShowImage ?
                            <Icon.ArrowUp color={item.type == 'Checkin' ? Colors.black : Colors.white} size={18}/>
                            :
                            <Icon.ArrowDown color={item.type == 'Checkin' ? Colors.black : Colors.white} size={18}/>

                        }
                        

                    </TouchableOpacity>
                    
                </View>

                {
                    item.image && isShowImage &&
                    <View style={{
                        flex: 1,
                        backgroundColor: Colors.greyDark,
                        marginBottom: 15,
                        borderRadius: 5,
                    }}>
                        <FastImage
                            source={{ uri: item.image, priority: FastImage.priority.normal }}
                            resizeMode={ FastImage.resizeMode.contain }
                            style={{
                                width: '100%',
                                margin: 5,
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
