import { View } from "native-base";
import React from "react";
import { StyleSheet, Text } from "react-native";

type HeaderType = {
    leftIcon?: React.ReactNode;
    rightIcon?: boolean;
    title:String
};

export const Header:React.FC<HeaderType> = ({title,leftIcon, rightIcon}) => {
    return(
        <View style={styles.header}>
            {leftIcon}
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