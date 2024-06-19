import { useNavigation } from "@react-navigation/native";
import { View, useTheme } from "native-base";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

type HeaderType = {
    rightIcon?: boolean;
    title:String
};

export const Header:React.FC<HeaderType> = ({title, rightIcon}) => {

    const navigation = useNavigation();
    const theme = useTheme();

    return(
        <View style={styles.header}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.leftIcon}>
                <Entypo name="chevron-left" color={theme.colors.lightBlack} size={28} />
            </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
            {rightIcon}
    </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 80,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    leftIcon: {
        position: "absolute",
        left: 0,
        alignItems: "center",
        justifyContent: "center",
    },
    rightIcon: {
        position: "absolute",
        right: 0,
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitleContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "900",
    },
})