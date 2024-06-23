import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Actionsheet, AlertDialog, Button, Text, View, useDisclose, useTheme } from "native-base";
import { useRef, useState } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { SvgUri } from "react-native-svg";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useDispatch } from "react-redux";
import { Header } from "../../components/Header";
import { useI18n } from "../../hooks/useI18n";
import { RootStackParamList } from "../../types/react-navigation";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";

type SettingsScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Settings"
>;
const mockLanguageData = [
    {lang: "tr", svg_url: "https://hatscripts.github.io/circle-flags/flags/tr.svg"},
    {lang: "en", svg_url: "https://hatscripts.github.io/circle-flags/flags/gb.svg"}
]

export default function SettingsScreen() {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const { t, i18n } = useI18n("SettingsScreen");
    const theme = useTheme();
    const dispatch = useDispatch();

    const { isOpen, onClose, onOpen } = useDisclose(false);
    const { isOpen: isLanguageVisible, onOpen: onOpenLanguage, onClose: onCloseLanguage } = useDisclose(false);

    const cancelRef = useRef(null);

    function handleLogout() {

    }

    function handleSelectLanguage(lang: string){
        i18n.changeLanguage(lang);
    }

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
        <SafeAreaView style={{ backgroundColor: theme.colors.white, flex: 1 }}>
           <Header style={{ marginTop: 16 }} title={t("settings")}/>

            <View style={styles.cardsContainer}>
                <ItemRender onPress={() => navigation.navigate("Account")} text={t("account")}
                    icon={<MaterialCommunityIcons name="account" color="white" size={24} />} />

                <ItemRender onPress={onOpenLanguage} text={t("changeLanguage")}
                    icon={<FontAwesome name="language" color="white" size={24} />} />

                <ItemRender onPress={() => navigation.navigate("KvkkModal")} text={t("kvkk")}
                    icon={<MaterialCommunityIcons name="file-document-outline" color="white" size={24} />} />

                <ItemRender onPress={() => navigation.navigate("Blocked")} text={t("blocked")}
                    icon={<FontAwesome6Icon name="ban" color="white" size={24} />} />
                
                <TouchableOpacity 
                onPress={onOpen}
                style={[styles.card, {position:"absolute", bottom: 20, left:0, right:0}]}>
                    <View style={styles.cardContent}>
                        <View style={[styles.iconContainer]} bgColor="danger.600">
                            <MaterialIcons name="logout" color="white" size={24} />
                        </View>
                        <Text style={[styles.cardText]} color="danger.600">{t("logout")}</Text>
                    </View>
                    <TouchableOpacity style={styles.chevronContainer}>
                        <Entypo name="chevron-right" color={theme.colors.lightText} size={24} />
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Header>{t("dialogTitle")}</AlertDialog.Header>
                    <AlertDialog.Body>
                        {t("dialogBody")}
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>
                            <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                            {t("cancel")}
                            </Button>
                            <Button colorScheme="danger" onPress={handleLogout}>
                            {t("yes")}
                            </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>

            <Actionsheet isOpen={isLanguageVisible} onClose={onCloseLanguage}>
                <Actionsheet.Content>
                    {mockLanguageData.map((item, index) => (
                        <Actionsheet.Item key={index}>
                            <TouchableOpacity style={styles.languageTextContainer}
                            onPress={() => handleSelectLanguage(item.lang)}>
                                <SvgUri uri={item.svg_url} width="32" height="32" />
                                <Text ml="12px" fontSize="15px" fontWeight="bold">{t(item.lang)}</Text>    
                            </TouchableOpacity>
                        </Actionsheet.Item>
                    ))}
                </Actionsheet.Content>
            </Actionsheet>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    cardsContainer: {
        marginTop: 8,
        flex: 1,
        marginHorizontal: 16,
        gap: 16
    },
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
    languageTextContainer: {
        flexDirection: "row",
        alignItems: 'center',
    }
});