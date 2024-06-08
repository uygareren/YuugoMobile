import { Button as NButton, useTheme } from "native-base";
import React from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { BUTTON_BORDER_RADIUS, LIGHT_GRAY } from "../utils/utils";

interface ButtonCompProps {
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    loading?: boolean;
    isActive?: boolean;
    title: string;
    mt?: string;
    mb?: string;
    ml?: string;
    mr?: string;
}

export const Button: React.FC<ButtonCompProps> = ({
    onPress, style, isActive, textStyle={}, loading=false, title, mt="0px", mb="0px", ml="0px", mr="0px"
}) => {

    const theme = useTheme();

    return(
        <NButton mt={mt} mb={mb} ml={ml} mr={mr} py={"20px"} borderRadius={BUTTON_BORDER_RADIUS}
        style={style} backgroundColor={isActive ? "#db37ce" : LIGHT_GRAY }  onPress={onPress} isLoading={loading} _text={{style: textStyle}}>
            {title}
        </NButton>
    )
}
