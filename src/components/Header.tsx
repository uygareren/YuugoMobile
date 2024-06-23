import { useNavigation } from "@react-navigation/native";
import { Icon, Text, View } from "native-base";
import React from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';

interface HeaderType {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    title:String
    style?: ViewStyle
};

export const Header:React.FC<HeaderType> = ({title,leftIcon, rightIcon, style}) => {
    const navigation = useNavigation();

    return(
        <View style={style} flexDir="row" mr="16px" ml="16px" mb="16px" alignItems="center" justifyContent="space-between">
            <View flexDir="row" alignItems="center">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}>
                    <Icon as={<Entypo name="chevron-left" />} size="24px" />
                </TouchableOpacity>
                <Text fontSize="18px" textAlign="center" alignSelf="center" >{title}</Text>
            </View>
            <View >
                {rightIcon}
            </View>
        </View>
    )
}