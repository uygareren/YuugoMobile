import { Text, useTheme } from "native-base";
import { Dimensions, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

type SelectCardProps = {
    isSelected: boolean;
    onPress: () => void;
    children?: React.ReactElement;
    text: string;
    containerStyle?: ViewStyle;
}

export const SelectCard = ({ isSelected, onPress, children=undefined, text, containerStyle={} }: SelectCardProps) => {
    const width = Dimensions.get("screen").width;
    const theme = useTheme();

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                ...styles.container,
                borderColor: isSelected ? "#db37ce" : "grey",
                backgroundColor: isSelected ? "#fac5f5" : "white",
                ...containerStyle
            }}
        >
            <Text fontWeight="300" fontSize={"18px"} textAlign="center" color="black" >
                {text}
            </Text>
            {children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderBottomWidth:6,
        padding: 12,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
    }
});