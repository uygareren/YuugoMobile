import { useNavigation } from "@react-navigation/native";
import { Icon, View, Text } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';

type HeaderType = {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    title:String
};

export const Header:React.FC<HeaderType> = ({title,leftIcon, rightIcon}) => {
    const navigation = useNavigation();

    return(
        <View flexDir="row" alignItems="center" justifyContent="space-between" mr="16px" ml="16px" mb="16px" >
            <TouchableOpacity
                onPress={() => navigation.goBack()}>
                <Icon as={<Entypo name="chevron-left" />} size="24px" />
            </TouchableOpacity>    
            <Text fontSize="20px" textAlign="center">{title}</Text>
            <View >
                {rightIcon}
            </View>
        </View>
    )
}