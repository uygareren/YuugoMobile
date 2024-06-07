import { Button as NButton, useTheme } from "native-base";
import React from "react";
import { ActivityIndicator, StyleProp, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { BUTTON_RADIUS } from "../utils/utils";

interface ButtonCompProps {
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    loading?: boolean;
    title: string
}

export const Button: React.FC<ButtonCompProps> = ({
    onPress, style, textStyle={}, loading=false, title
}) => {

    const theme = useTheme();

    return(
        <NButton style={style} backgroundColor="primary.500" onPress={onPress} isLoading={loading} _text={{style: textStyle}}>
            {title}
        </NButton>
    )
}
