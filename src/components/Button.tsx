import { Button as NButton, useTheme } from "native-base";
import React from "react";
import { ActivityIndicator, StyleProp, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { BUTTON_RADIUS } from "../utils/utils";

interface ButtonCompProps {
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    loading?: boolean;
    title: string;
    mt?: string;
    mb?: string;
    ml?: string;
    mr?: string;
}

export const Button: React.FC<ButtonCompProps> = ({
    onPress, style, textStyle={}, loading=false, title, mt="0px", mb="0px", ml="0px", mr="0px"
}) => {

    const theme = useTheme();

    return(
        <NButton mt={mt} mb={mb} ml={ml} mr={mr}
        style={style} backgroundColor="primary.500" onPress={onPress} isLoading={loading} _text={{style: textStyle}}>
            {title}
        </NButton>
    )
}
