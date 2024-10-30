import React from 'react';
import {
    AntDesign,
    FontAwesome,
    FontAwesome5,
    Ionicons,
    Feather,
    MaterialCommunityIcons,
    Entypo,
    MaterialIcons,
    SimpleLineIcons,
    Octicons,
    Foundation,
    EvilIcons,
} from '@expo/vector-icons';

import { Text, StyleProp, ViewStyle } from 'react-native';
import { Colors } from '@/constants/checkpoint/Colors';


export const Icons = {
    MaterialCommunityIcons,
    MaterialIcons,
    Ionicons,
    Feather,
    FontAwesome,
    FontAwesome5,
    AntDesign,
    Entypo,
    SimpleLineIcons,
    Octicons,
    Foundation,
    EvilIcons,
}

const defaultSize = 32;
const defaultColor = Colors.orange;


interface IconProps {
    size?: number;
    color?: string;
    style?: StyleProp<ViewStyle>;
}

export const Home = ({size = defaultSize, color = defaultColor, style}: IconProps) => {
    return <Ionicons name="home" size={size} color={color} style={style} />;
}

export const History = ({size = defaultSize, color = defaultColor, style}: IconProps) => {
    return <MaterialIcons name="history" size={size} color={color} style={style} />;
}

export const Location = ({size = defaultSize, color = defaultColor, style}: IconProps) => {
    return <Ionicons name="location-sharp" size={size} color={color} style={style} />;
}

export const Power = ({size = defaultSize, color = defaultColor, style}: IconProps) => {
    return <Ionicons name="power" size={size} color={color} style={style} />;
}

const Icon = {
    Home: Home,
    History: History,
    Location: Location,
    Power: Power,
}

export default Icon