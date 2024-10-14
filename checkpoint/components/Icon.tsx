import React from 'react';
import {
    FontAwesome,
    Ionicons,
    MaterialIcons,
    Foundation,
    AntDesign,
} from '@expo/vector-icons';

import { Text, StyleProp, ViewStyle } from 'react-native';
import { Colors } from '@/constants/checkpoint/Colors';


const defaultSize = 32;
const defaultColor = Colors.orange;


interface IconProps {
    size?: number;
    color?: string;
    style?: StyleProp<ViewStyle>;
}

export const IconHome = ({size = defaultSize, color = defaultColor, style}: IconProps) => {
    return <Ionicons name="home" size={size} color={color} style={style} />;
}

export const IconHistory = ({size = defaultSize, color = defaultColor, style}: IconProps) => {
    return <MaterialIcons name="history" size={size} color={color} style={style} />;
}

export const IconLocation = ({size = defaultSize, color = defaultColor, style}: IconProps) => {
    return <Ionicons name="location-sharp" size={size} color={color} style={style} />;
}

export const IconPower = ({size = defaultSize, color = defaultColor, style}: IconProps) => {
    return <Ionicons name="power" size={size} color={color} style={style} />;
}

export const IconCamera = ({size = defaultSize, color = defaultColor, style}: IconProps) => {
    return <Ionicons name="camera" size={size} color={color} style={style} />;
}

export const IconCameraRotate = ({size = defaultSize, color=defaultColor, style}: IconProps) => {
    return <Ionicons name="camera-reverse" size={size} color={color} style={style} />
}

export const IconCapture = ({size = defaultSize, color=defaultColor, style}: IconProps) => {
    return <Foundation name="record" size={size} color={color} style={style} />
}

export const IconDashboard = ({size = defaultSize, color=defaultColor, style}: IconProps) => {
    return <FontAwesome name="dashboard" size={size} color={color} style={style} />
}

export const IconDetail = ({size = defaultSize, color=defaultColor, style}: IconProps) => {
    return <AntDesign name="bars" size={size} color={color} style={style} />
}

export const IconSearch = ({size = defaultSize, color=defaultColor, style}: IconProps) => {
    return <Ionicons name="search" size={size} color={color} style={style} />
}

export const IconImage = ({size = defaultSize, color=defaultColor, style}: IconProps) => {
    return <Ionicons name="image-outline" size={size} color={color} style={style} />
}

const Icon = {
    Home: IconHome,
    History: IconHistory,
    Location: IconLocation,
    Power: IconPower,
    Camera: IconCamera,
    CameraRotate: IconCameraRotate,
    Capture: IconCapture,
    Dashboard: IconDashboard,
    Detail: IconDetail,
    Search: IconSearch,
    Image: IconImage,
}

export default Icon