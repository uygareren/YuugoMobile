import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, View, useTheme } from "native-base";
import { useState } from "react";
import { Dimensions, Image, SafeAreaView, StyleSheet, Switch, TouchableOpacity } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useDispatch } from "react-redux";
import { Header } from "../../components/Header";
import { useI18n } from "../../hooks/useI18n";
import { RootStackParamList } from "../../types/react-navigation";
import { MARGIN_HORİZONTAL } from "../../utils/utils";

type SettingsScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Settings"
>;

export default function SettingsScreen() {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const { t } = useI18n("SettingsScreen");
    const { width, height } = Dimensions.get("screen");
    const theme = useTheme();
    const dispatch = useDispatch();

    const [mailEnabled, setMailEnabled] = useState(false);

    const toggleSwitch = () => setMailEnabled(previousState => !previousState);

    return (
        <SafeAreaView style={[styles.safeAreaView, { backgroundColor: theme.colors.white }]}>
           <Header title={t("settings")}/>

            <View style={styles.profileContainer}>
                <View style={styles.profileImageContainer}>
                    <Image source={require("../../../assets/images/bird.jpeg")}
                        style={styles.profileImage} resizeMode="cover"/>
                </View>
                <View style={styles.profileNameContainer}>
                    <Text style={styles.profileName}>Jenny Wilson</Text>
                </View>
            </View>

            <View style={styles.cardsContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("Account")} style={styles.card}>
                    <View style={styles.cardContent}>
                        <View style={[styles.iconContainer, { backgroundColor: "#0366fc" }]}>
                            <MaterialCommunityIcons name="account" color="white" size={24} />
                        </View>
                        <View style={styles.cardTextContainer}>
                            <Text style={styles.cardText}>{t("account")}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("Account")} style={styles.chevronContainer}>
                        <Entypo name="chevron-right" color={theme.colors.lightBlack} size={28} />
                    </TouchableOpacity>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card}>
                    <View style={styles.cardContent}>
                        <View style={[styles.iconContainer, { backgroundColor: "#fc8803" }]}>
                            <FontAwesome name="language" color="white" size={24} />
                        </View>
                        <View style={styles.cardTextContainer}>
                            <Text style={styles.cardText}>{t("changeLanguage")}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.chevronContainer}>
                        <Entypo name="chevron-right" color={theme.colors.lightBlack} size={28} />
                    </TouchableOpacity>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card}>
                    <View style={styles.cardContent}>
                        <View style={[styles.iconContainer, { backgroundColor: "#fc03ad" }]}>
                            <FontAwesome name="ticket" color="white" size={24} />
                        </View>
                        <View style={styles.cardTextContainer}>
                            <Text style={styles.cardText}>{t("ticket")}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.chevronContainer}>
                        <Entypo name="chevron-right" color={theme.colors.lightBlack} size={28} />
                    </TouchableOpacity>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card}>
                    <View style={styles.cardContent}>
                        <View style={[styles.iconContainer, { backgroundColor: "#03fc7f" }]}>
                            <MaterialCommunityIcons name="file-document-outline" color="white" size={24} />
                        </View>
                        <View style={styles.cardTextContainer}>
                            <Text style={styles.cardText}>{t("kvkk")}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.chevronContainer}>
                        <Entypo name="chevron-right" color={theme.colors.lightBlack} size={28} />
                    </TouchableOpacity>
                </TouchableOpacity>
                
                <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center",marginTop:16, paddingHorizontal:12}}>
                    <Text style={{marginRight:16, ...styles.cardText}}>{t("mailNotification")}</Text>
                    <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={mailEnabled ? "#81b0ff" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={mailEnabled}
                style={styles.switch}
            />
                </View>
                

                <TouchableOpacity style={[styles.card, {position:"absolute", bottom:32, left:0, right:0}]}>
                    <View style={styles.cardContent}>
                        <View style={[styles.iconContainer, { backgroundColor: "#fc0318" }]}>
                            <MaterialIcons name="logout" color="white" size={24} />
                        </View>
                        <View style={styles.cardTextContainer}>
                            <Text style={styles.cardText}>{t("logout")}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.chevronContainer}>
                        <Entypo name="chevron-right" color={theme.colors.lightBlack} size={28} />
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        paddingHorizontal: MARGIN_HORİZONTAL,
    },
    
    profileContainer: {
        marginTop: 32,
        paddingVertical: 24,
        flexDirection: "row",
        borderRadius: 52,
        paddingHorizontal: 16,
    },
    profileImageContainer: {
        width: 80,
        height: 80,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 180,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 180,
    },
    profileNameContainer: {
        marginLeft: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    profileName: {
        fontSize: 20,
        fontWeight: "900",
        color: "black",
    },
    cardsContainer: {
        marginTop: 24,
        flex:1
    },
    card: {
        marginTop: 12,
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
    chevronContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    switch: {
        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]
    }
});
