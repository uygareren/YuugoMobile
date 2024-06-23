import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, View, useTheme } from "native-base";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useDispatch } from "react-redux";
import { Header } from "../../components/Header";
import { useI18n } from "../../hooks/useI18n";
import { RootStackParamList } from "../../types/react-navigation";

type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Account">;

export default function AccountScreen() {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const { t } = useI18n("AccountScreen");
    const theme = useTheme();
    const dispatch = useDispatch();

    const ItemRender = ({ onPress, text, icon }: any) => (
        <TouchableOpacity 
        onPress={onPress}
        style={styles.card}>
            <View style={styles.cardContent}>
                <View style={[styles.iconContainer]} bgColor="primary.400">
                    {icon}
                </View>
                <Text style={styles.cardText}>{text}</Text>
            </View>
            <TouchableOpacity style={styles.chevronContainer}>
                <Entypo name="chevron-right" color={theme.colors.lightText} size={24} />
            </TouchableOpacity>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.white }}>
            <Header title={t("account")}/>
            <View marginX="16px" style={{ gap: 16 }}>
                <ItemRender onPress={() => navigation.push("UpdateProfile")} text={t("updateProfile")}
                icon={<FontAwesome6 name="user-pen" color="white" size={20} />} />
                <ItemRender onPress={() => navigation.push("UpdatePassword")} text={t("updatePassword")}
                icon={<MaterialIcons name="password" color="white" size={24} />} />
                <ItemRender onPress={() => navigation.push("Complaiment")} text={t("complaiment")}
                icon={<FontAwesome name="warning" color="white" size={24} />} />
                <ItemRender onPress={() => navigation.push("Blocked")} text={t("blocked")}
                icon={<FontAwesome6 name="ban" color="white" size={24} />} />
                <ItemRender onPress={() => {}} text={t("sortDiscover")}
                icon={<MaterialIcons name="clear-all" color="white" size={28} />} />
                <ItemRender onPress={() => navigation.push("CloseAccount")} text={t("closeAccount")}
                icon={<MaterialCommunityIcons name="close-circle-outline" color="white" size={24} />} />
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    card: {
        borderLeftWidth: 0.7,
        borderRightWidth: 0.7,
        borderBottomWidth:6,
        borderColor:"#bbb",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 12,
    },
    cardContent: {
        flexDirection: "row",
        alignItems: "center"
    },
    iconContainer: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        padding: 7.5
    },
    cardText: {
        fontSize: 15,
        fontWeight: "700",
        marginLeft: 8
    },
    chevronContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
});
