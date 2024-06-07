import { useTheme } from "native-base";
import React from "react";
import { ActivityIndicator, StyleProp, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { BUTTON_RADIUS } from "../utils/utils";

interface ButtonCompProps {
    onPress: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    loading?: boolean;
}

export const ButtonComp: React.FC<ButtonCompProps> = ({onPress, containerStyle, textStyle, loading}) => {

    const theme = useTheme();

    return(
        <TouchableOpacity
            onPress={onPress}
            style={[{marginTop:32, paddingVertical:16, alignItems:"center", justifyContent:"center",
                borderRadius:BUTTON_RADIUS, backgroundColor:"blue"}, containerStyle]}
        >
            {loading ? (
                <ActivityIndicator size={24} color="white"/>
            ):(
                <Text style={[{color:theme.colors.white, fontWeight:"600", fontSize:16}, textStyle]}>
                    Devam Et
                </Text>
            )}
            
        </TouchableOpacity> 
    )
}
