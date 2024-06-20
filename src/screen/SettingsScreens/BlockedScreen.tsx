import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, View, useTheme } from "native-base";
import { Dimensions, FlatList, Image, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { Header } from "../../components/Header";
import { useI18n } from "../../hooks/useI18n";
import { RootStackParamList } from "../../types/react-navigation";
import { MARGIN_HORİZONTAL } from "../../utils/utils";

type BlockedScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Blocked"
>;

export default function BlockedScreen() {

    const navigation = useNavigation<BlockedScreenNavigationProp>();
    const { t } = useI18n("BlockedScreen");
    const { width } = Dimensions.get("screen");
    const theme = useTheme();
    const dispatch = useDispatch();

    const mockData = [
        {
            id: 1,
            username: "uygareren11",
            image: require("../../../assets/images/bird.jpeg"),
        },
        {
            id: 2,
            username: "johndoe123",
            image: require("../../../assets/images/bird.jpeg"),
        },
        {
            id: 3,
            username: "janedoe456",
            image: require("../../../assets/images/bird.jpeg"),
        }
    ];

    const RenderBlocked = ({ item }: any) => {
        return (
            <View style={styles.blockedItem}>
                <View style={styles.imageContainer}>
                    <Image source={item.image} style={styles.image} />
                </View>
                <View style={styles.usernameContainer}>
                    <Text style={[styles.usernameText, { color: theme.colors.black }]}>{item.username}</Text>
                </View>
                <TouchableOpacity style={styles.unblockButton}>
                    <Text style={styles.unblockButtonText}>{t("removeBlock")}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={[styles.safeAreaView, { backgroundColor: theme.colors.white }]}>
            <Header title={t("title")} />
            <View>
                <FlatList
                    data={mockData}
                    keyExtractor={item => item.id.toString()}
                    renderItem={RenderBlocked}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        paddingHorizontal: MARGIN_HORİZONTAL,
    },
    blockedItem: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 24,
    },
    imageContainer: {
        width: Dimensions.get("screen").width * 0.15,
        borderRadius: 360,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: Dimensions.get("screen").width * 0.15,
        height: Dimensions.get("screen").width * 0.15,
        borderRadius: 360,
    },
    usernameContainer: {
        width: Dimensions.get("screen").width * 0.42,
        marginLeft: Dimensions.get("screen").width * 0.05,
        paddingHorizontal: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    usernameText: {
        fontSize: 15,
        fontWeight: "800",
    },
    unblockButton: {
        marginLeft: Dimensions.get("screen").width * 0.07,
        borderWidth: 1,
        borderBottomWidth: 6,
        borderColor: "#db37ce",
        borderRadius: 8,
        paddingHorizontal: 6,
        height: Dimensions.get("screen").width * 0.1,
        alignItems: "center",
        justifyContent: "center",
    },
    unblockButtonText: {
        fontSize: 13,
        fontWeight: "900",
    },
});
