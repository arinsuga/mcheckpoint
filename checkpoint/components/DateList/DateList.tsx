import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View,FlatList } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import moment from 'moment';


/**
 * TODO: Buat DateListItemProps type
 */
function DateListItem({ item, selected, onPress, ...rest }) {
    return (
        <TouchableOpacity onPress={() => {
            if (onPress && typeof onPress === 'function') onPress(item);
        }}
            key={item.day_number}
            style={[styles.item, selected && styles.selectedItem]}>
            <Text style={[{ fontSize: 12, color: '#BCC1CD' }, selected && styles.selectedItemText]}>{item.day_name}</Text>
            <Text style={[{ fontSize: 16, color: '#212525', fontWeight: 'bold' }, selected && styles.selectedItemText]}>{item.day_number}</Text>
        </TouchableOpacity>
    )
}
type IDateItem = {
    day_number: number;
    day_name: string;
}
const DateList = () => {

    const [selected, setSelected] = useState(20)

    /**
     * TODO: ganti pakai package, atau generate days before & after menggunakan moment.js
     */
    const days: Array<IDateItem> = useMemo(() => {
        return [
            {
                day_number: 17,
                day_name: 'S'
            },
            {
                day_number: 18,
                day_name: 'S'
            },
            {
                day_number: 19,
                day_name: 'S'
            },
            {
                day_number: 20,
                day_name: 'S'
            },
            {
                day_number: 21,
                day_name: 'S'
            },
            {
                day_number: 22,
                day_name: 'M'
            },
            {
                day_number: 23,
                day_name: 'T'
            },
            {
                day_number: 24,
                day_name: 'W',
                selected: true,
            },
            {
                day_number: 25,
                day_name: 'T'
            },
            {
                day_number: 26,
                day_name: 'F'
            },
            {
                day_number: 27,
                day_name: 'S'
            },
            {
                day_number: 28,
                day_name: 'S'
            },
            {
                day_number: 29,
                day_name: 'S'
            },
        ]
    }, []);
    /**
     * 
     * TODO: performace, ketika select hindari re-render semua list item
     */
    const onItemPress = (targetItem: IDateItem) => {
        setSelected(targetItem.day_number)
    };

    return (
        <View style={{ width: Dimensions.get('screen').width, minHeight: 57}}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={days}
                renderItem={({ item, ...rest }) =>
                    <DateListItem
                        item={item} {...rest}
                        selected={item.day_number === selected}
                        onPress={onItemPress}
                    />
                }
                extraData={selected}/>
        </View>
    )
}

export default DateList

const styles = StyleSheet.create({
    item: {
        minWidth: 40,
        minHeight: 57,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 8,
    },
    selectedItemText: { color: 'white' },
    selectedItem: {
        backgroundColor: '#d16224',
        borderRadius: 7,
    }
})