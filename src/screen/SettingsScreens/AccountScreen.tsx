import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, View, useTheme } from "native-base";
import { Dimensions, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useDispatch } from "react-redux";
import { Header } from "../../components/Header";
import { useI18n } from "../../hooks/useI18n";
import { RootStackParamList } from "../../types/react-navigation";
import { MARGIN_HORİZONTAL } from "../../utils/utils";

type SettingsScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Account"
>;

export default function AccountScreen() {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const { t } = useI18n("AccountScreen");
    const { width, height } = Dimensions.get("screen");
    const theme = useTheme();
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.white }]}>
            <Header title={t("account")}/>

            <TouchableOpacity 
            onPress={() => navigation.push("UpdateProfile")}
            style={styles.card}>
                <View style={styles.cardContent}>
                    <View style={[styles.iconContainer, { backgroundColor: "#0366fc" }]}>
                        <FontAwesome6 name="user-pen" color="white" size={20} />
                    </View>
                    <View style={styles.cardTextContainer}>
                        <Text style={styles.cardText}>{t("updateProfile")}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.chevron}>
                    <Entypo name="chevron-right" color={theme.colors.lightBlack} size={28} />
                </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={() => navigation.push("UpdatePassword")}
            style={styles.card}>
                <View style={styles.cardContent}>
                    <View style={[styles.iconContainer, { backgroundColor: "#2f00ff" }]}>
                        <MaterialIcons name="password" color="white" size={20} />
                    </View>
                    <View style={styles.cardTextContainer}>
                        <Text style={styles.cardText}>{t("updatePassword")}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.chevron}>
                    <Entypo name="chevron-right" color={theme.colors.lightBlack} size={28} />
                </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={() => navigation.push("Complaiment")}
            style={styles.card}>
                <View style={styles.cardContent}>
                    <View style={[styles.iconContainer, { backgroundColor: "#fbff00" }]}>
                        <FontAwesome name="warning" color="white" size={20} />
                    </View>
                    <View style={styles.cardTextContainer}>
                        <Text style={styles.cardText}>{t("complaiment")}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.chevron}>
                    <Entypo name="chevron-right" color={theme.colors.lightBlack} size={28} />
                </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={() => navigation.push("Blocked")}
            style={styles.card}>
                <View style={styles.cardContent}>
                    <View style={[styles.iconContainer, { backgroundColor: "#00ff33" }]}>
                        <FontAwesome6 name="ban" color="white" size={20} />
                    </View>
                    <View style={styles.cardTextContainer}>
                        <Text style={styles.cardText}>{t("blocked")}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.chevron}>
                    <Entypo name="chevron-right" color={theme.colors.lightBlack} size={28} />
                </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
                <View style={styles.cardContent}>
                    <View style={[styles.iconContainer, { backgroundColor: "#ff0000" }]}>
                        <MaterialIcons name="clear-all" color="white" size={28} />
                    </View>
                    <View style={styles.cardTextContainer}>
                        <Text style={styles.cardText}>{t("sortDiscover")}</Text>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
                <View style={styles.cardContent}>
                    <View style={[styles.iconContainer, { backgroundColor: "#ff3300" }]}>
                        <MaterialCommunityIcons name="close-circle-outline" color="white" size={28} />
                    </View>
                    <View style={styles.cardTextContainer}>
                        <Text style={styles.cardText}>{t("closeAccount")}</Text>
                    </View>
                </View>
            </TouchableOpacity>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: MARGIN_HORİZONTAL,
    },
    header: {
        height: 80,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    backButton: {
        position: "absolute",
        left: 0,
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: {
        alignItems: "center",
        justifyContent: "center",
    },
    headerText: {
        fontSize: 24,
        fontWeight: "900",
    },
    card: {
        marginTop: 24,
        backgroundColor: "#f0fbfc",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 12,
    },
    cardContent: {
        flexDirection: "row",
    },
    iconContainer: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 180,
    },
    cardTextContainer: {
        marginLeft: 16,
        justifyContent: "center",
    },
    cardText: {
        fontSize: 18,
        fontWeight: "700",
    },
    chevron: {
        alignItems: "center",
        justifyContent: "center",
    },
});
