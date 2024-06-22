import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Actionsheet, Text, View, useTheme } from "native-base";
import { useState } from "react";
import { Dimensions, Image, SafeAreaView, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { SvgUri } from "react-native-svg";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useDispatch } from "react-redux";
import { Header } from "../../components/Header";
import { useI18n } from "../../hooks/useI18n";
import { RootStackParamList } from "../../types/react-navigation";
import { BLUE1, BLUE2, LIGHT_RED, MARGIN_HORİZONTAL } from "../../utils/utils";

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
    const [isLogoutVisible, setIsLogoutVisible] = useState(false);
    const [isLanguageVisible, setIsLanguageVisible] = useState(false);

    const [selectLanguageId, setSelectLanguageId] = useState("");

    const toggleSwitch = () => setMailEnabled(previousState => !previousState);

    const mockLanguageData = [
        {id:"1", title: "Turkish", svg_url: "https://hatscripts.github.io/circle-flags/flags/tr.svg"},
        {id:"2", title: "English", svg_url: "https://hatscripts.github.io/circle-flags/flags/gb.svg"}
    ]

    function handleSelectLanguage(id: string){
        setSelectLanguageId(id);
    }

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

                <TouchableOpacity 
                onPress={() => setIsLanguageVisible(true)}
                style={styles.card}>
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

                {/* <TouchableOpacity style={styles.card}>
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
                </TouchableOpacity> */}

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
                

                <TouchableOpacity 
                onPress={() => setIsLogoutVisible(true)}
                style={[styles.card, {position:"absolute", bottom:32, left:0, right:0}]}>
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

              {/*  LOGOUT ActionSheets */}
              <Actionsheet isOpen={isLogoutVisible} onClose={() => setIsLogoutVisible(false)}>
                    <Actionsheet.Content style={styles.actionSheetContent}>
                        <Actionsheet.Item style={[styles.actionSheetItem, {height: height * 0.3}]}>
                        
                            <TouchableOpacity 
                            onPress={() => setIsLogoutVisible(false)}
                            style={[styles.continueButton, {width: width * 0.8}]}>
                                <Text style={styles.continueButtonText}>DEVAM</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.logoutButton}>
                                <Text style={styles.logoutButtonText}>ÇIKIŞ</Text>
                            </TouchableOpacity>
                        
                        </Actionsheet.Item>
                    </Actionsheet.Content>
                </Actionsheet>

              {/*  LANGUAGE ActionSheets */}
              <Actionsheet isOpen={isLanguageVisible} onClose={() => setIsLanguageVisible(false)}>
                    <Actionsheet.Content style={styles.languageActionSheetContent}>
                        <Actionsheet.Item style={[styles.actionSheetItem, { height: height * 0.3,justifyContent: 'flex-start', }]}>
                        {mockLanguageData.map((item, index) => (
                            <TouchableOpacity 
                            onPress={() => handleSelectLanguage(item.id)}
                            key={index} style={[styles.languageItem, 
                            {backgroundColor: selectLanguageId == item.id ? "#c4dbff" : "white"}]}>
                                <View style={styles.flagContainer}>
                                    <SvgUri style={styles.flag} uri={item.svg_url} width="32" height="32" />
                                </View>
                                <View style={styles.languageTextContainer}>
                                    <Text style={[styles.languageText, {color: theme.colors.titleText,}]}>{item.title}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                        </Actionsheet.Item>
                    </Actionsheet.Content>
                    </Actionsheet>
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
    },
    actionSheetContent: {
        height: Dimensions.get("screen").height * 0.2,
      },
    languageActionSheetContent: {
        height: Dimensions.get("screen").height * 0.4,
      },
      actionSheetItem: {
        alignItems: 'center',
      },
      continueButton: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: BLUE2,
        borderBottomWidth: 5,
        borderBottomColor: BLUE2,
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: BLUE1,
      },
      continueButtonText: {
        fontSize: 18,
        fontWeight: '900',
        color: 'white',
      },
      logoutButton: {
        marginTop: 32,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      },
      logoutButtonText: {
        fontSize: 18,
        fontWeight: '900',
        color: LIGHT_RED,
      },
      languageItem: {
        width: Dimensions.get("screen").width * 0.8,
        flexDirection: 'row',
        paddingVertical:8,
        paddingHorizontal:12,
        borderRadius:8,
        marginVertical: 12,
      },
      flagContainer: {
        width: '20%',
      },
      flag: {
        marginLeft: 8,
      },
      languageTextContainer: {
        width: '80%',
        alignItems: 'flex-start',
        justifyContent: 'center',
      },
      languageText: {
        fontSize: 20,
        fontWeight: '900',
        
      },
});
