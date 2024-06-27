import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, Text, View, useTheme } from "native-base";
import { useState } from "react";
import { Dimensions, FlatList, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import TextArea from "../components/input/TextArea";
import TextInput from "../components/input/TextInput";
import { useI18n } from "../hooks/useI18n";
import { RootStackParamList } from "../types/react-navigation";
import { BLUE1, MARGIN_HORİZONTAL } from "../utils/utils";

type CreateRoomScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Explore">;

const { width, height } = Dimensions.get("screen");

export default function CreateRoomScreen() {
    const navigation = useNavigation<CreateRoomScreenNavigationProp>();
    const { t } = useI18n("CreateRoomScreen");
    const theme = useTheme();
    const dispatch = useDispatch();

    const [room, setRoom] = useState("");
    const [description, setDescription] = useState("");
    const [selectedDuration, setSelectedDuration] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("");
    const [selectedPrivacy, setSelectedPrivacy] = useState("");

    const mockDurationData = [
        { id: "1", duration: 20 },
        { id: "2", duration: 30 },
        { id: "3", duration: 45 },
        { id: "4", duration: 60 },
    ];

    const mockLevelData = [
        { id: "1", level: "Beginner" },
        { id: "2", level: "Intermediate" },
        { id: "3", level: "Advanced" },
        { id: "4", level: "No Matter" },
    ];

    const mockQuotaData = [
        { id: "1", quota: 5 },
        { id: "2", quota: 6 },
        { id: "3", quota: 7 },
        { id: "4", quota: 8 },
    ];

    const mockPrivacyData = [
        { id: "1", privacy: "Herkese Açık" },
        { id: "2", privacy: "Gizli" },
    ];

    function handleSelectDuration(durationId: string) {
        if (selectedDuration == durationId) {
            setSelectedDuration("");
        } else {
            setSelectedDuration(durationId);
        }
    }

    function handleSelectLevel(levelId: string) {
        if (selectedLevel == levelId) {
            setSelectedLevel("");
        } else {
            setSelectedLevel(levelId);
        }
    }

    function handleSelectPrivacy(privacyId: string) {
        if (selectedPrivacy == privacyId) {
            setSelectedPrivacy("");
        } else {
            setSelectedPrivacy(privacyId);
        }
    }

    const RenderDuration = ({ item }: any) => {
        return (
            <TouchableOpacity
                onPress={() => handleSelectDuration(item.id)}
                style={[
                    styles.durationButton,
                    {
                        borderColor: selectedDuration == item.id ? BLUE1 : theme.colors.lightText,
                    },
                ]}
            >
                <Text style={styles.durationText}>{item.duration} dk</Text>
            </TouchableOpacity>
        );
    };

    const RenderLevel = ({ item }: any) => (
        <TouchableOpacity
            onPress={() => handleSelectLevel(item.id)}
            style={[
                styles.levelButton,
                {
                    borderColor: selectedLevel === item.id ? BLUE1 : theme.colors.lightText,
                },
            ]}
        >
            <Text style={styles.levelText}>{item.level}</Text>
        </TouchableOpacity>
    );

    const RenderQuota = ({ item }: any) => {
        return (
            <TouchableOpacity
                onPress={() => handleSelectDuration(item.id)}
                style={[
                    styles.quotaButton,
                    {
                        borderColor: selectedDuration == item.id ? BLUE1 : theme.colors.lightText,
                    },
                ]}
            >
                <Text style={styles.quotaText}>{item.quota}</Text>
            </TouchableOpacity>
        );
    };

    const RenderPrivacy = ({ item }: any) => {
        return (
            <TouchableOpacity
                onPress={() => handleSelectPrivacy(item.id)}
                style={[
                    styles.privacyButton,
                    {
                        borderColor: selectedPrivacy == item.id ? BLUE1 : theme.colors.lightText,
                    },
                ]}
            >
                <Text style={styles.privacyText}>{item.privacy}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={[styles.safeAreaView, { backgroundColor: theme.colors.white }]}>
            <Header title={t("createRoom")} />
            <View mt="16px">
                <ScrollView showsVerticalScrollIndicator={false} mt="32px" style={{ height: height * 0.65 }}>
                    <TextInput value={room} onChangeText={setRoom} placeholder={t("roomName")} />

                    <View mt="32px">
                        <TextArea value={description} onChangeText={setDescription} placeholder={t("roomDescription")} />
                    </View>

                    <View>
                        <Text mt="32px" style={styles.sectionTitle}>{t("roomDuration")}</Text>
                        <View mt="8px" style={styles.listContainer}>
                            <FlatList
                                horizontal
                                data={mockDurationData}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={RenderDuration}
                            />
                        </View>
                    </View>

                    <View mt="32px">
                        <Text style={styles.sectionTitle}>{t("roomLevel")}</Text>
                        <View mt="8px" style={styles.listContainer}>
                            <FlatList
                                data={mockLevelData}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={RenderLevel}
                                numColumns={2}
                            />
                        </View>
                    </View>

                    <View mt="32px">
                        <Text style={styles.sectionTitle}>{t("roomQuota")}</Text>
                        <View mt="8px" style={styles.listContainer}>
                            <FlatList
                                horizontal
                                data={mockQuotaData}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={RenderQuota}
                            />
                        </View>
                    </View>

                    <View mt="32px">
                        <Text style={styles.sectionTitle}>{t("roomPrivacy")}</Text>
                        <View mt="8px" style={styles.listContainer}>
                            <FlatList
                                horizontal
                                data={mockPrivacyData}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={RenderPrivacy}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>

            <View style={styles.buttonContainer}>
                <Button title={t("createRoomBtn")} onPress={() => console.log("asd")} style={styles.createButton} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        paddingHorizontal: MARGIN_HORİZONTAL,
    },
    durationButton: {
        borderWidth: 1,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth: 6,
        paddingVertical: 2,
        width: width * 0.18,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginRight: width * 0.025,
    },
    durationText: {
        fontWeight: "900",
        fontSize: 16,
    },
    levelButton: {
        borderWidth: 1,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth: 5,
        paddingVertical: 4,
        width: width * 0.4,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginRight: width * 0.025,
        marginVertical: width * 0.0125,
    },
    levelText: {
        fontWeight: "900",
        fontSize: 16,
    },
    quotaButton: {
        borderWidth: 1,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth: 6,
        paddingVertical: 2,
        width: width * 0.18,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginRight: width * 0.025,
    },
    quotaText: {
        fontWeight: "900",
        fontSize: 16,
    },
    privacyButton: {
        borderWidth: 1,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth: 6,
        paddingVertical: 4,
        width: width * 0.35,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginRight: width * 0.025,
    },
    privacyText: {
        fontWeight: "900",
        fontSize: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "900",
    },
    listContainer: {
        alignItems: "flex-start",
    },
    buttonContainer: {
        position: "relative",
        bottom: -48,
        left: 0,
        right: 0,
        alignSelf: "center",
        width: width,
    },
    createButton: {
        width: width - 32,
        alignSelf: "center",
    },
});
