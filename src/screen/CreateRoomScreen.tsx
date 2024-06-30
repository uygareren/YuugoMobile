import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, Text, View, useTheme, useToast } from "native-base";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import TextArea from "../components/input/TextArea";
import TextInput from "../components/input/TextInput";
import { useI18n } from "../hooks/useI18n";
import { RootStackParamList } from "../types/react-navigation";
import { BLUE1, BLUE2, MARGIN_HORİZONTAL, handleSelectBackgrounColor, handleSelectBorderColor } from "../utils/utils";
import { RootStateType } from "../store/store";
import { SvgUri } from "react-native-svg";
import api from "../api/api";
import SelectInput from "../components/input/SelectInput";

type CreateRoomScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Explore">;

const { width, height } = Dimensions.get("screen");

export default function CreateRoomScreen() {
    const navigation = useNavigation<CreateRoomScreenNavigationProp>();
    const { t } = useI18n("CreateRoomScreen");
    const i18nInterests = useI18n("interests");
    const theme = useTheme();
    const dispatch = useDispatch();
    const toast = useToast();
    const jwt = useSelector<RootStateType>(state => state.account.jwt);
    const userInfo = useSelector<RootStateType, any>(state => state.account.userInfo);

    const [room, setRoom] = useState("");
    const [description, setDescription] = useState("");
    const [selectedDuration, setSelectedDuration] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("");
    const [selectedPrivacy, setSelectedPrivacy] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [selectedQuota, setSelectedQuota] = useState(0);
    const [selectedInterest, setSelectedInterest] = useState("");

    const [interests, setInterests] = useState([]);

    const mockDurationData = [
        { id: "1", duration: 20 },
        { id: "2", duration: 30 },
        { id: "3", duration: 45 },
        { id: "4", duration: 60 },
    ];

    const mockLevelData = [
        { id: "beginner", level: "Beginner" },
        { id: "intermediate", level: "Intermediate" },
        { id: "advanced", level: "Advanced" },
        { id: "4", level: "Farketmez" },
    ];

    const mockQuotaData = [2,3,4,5,6,7,8,9,10];

    useEffect(() => {
        init()
    }, []);

    async function init() {
        try {
            const resp = await api.get("/user/interests/type");
            console.log("data", resp.data.data);
            setInterests(resp.data.data.map((v: any) => ({
                label: i18nInterests.t(v.name),
                value: v.id
            })));
        } catch (error) {
            console.log(error);
        }
    }

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

    function handleCreateRoom() {
        if(selectedLanguage == null) {
            // toast show error
            toast.show({
                title: "Dilinizi seçiniz"
            });
            return
        }

        if(selectedInterest == "") {
            // toast show error
            toast.show({
                title: "Konuyu seçiniz"
            });
            return
        }

        let request = {
            languageId: selectedLanguage,
            interestId: selectedInterest,
            chatName: room,
            description,
            maxUserCount: selectedQuota,
            countDownMinute: selectedDuration,
            isPrivate: selectedPrivacy
        }
    }

    const RenderDuration = ({ item }: any) => {
        return (
            <TouchableOpacity
                onPress={() => handleSelectDuration(item.id)}
                style={[
                    styles.durationButton,
                    {
                        borderColor: selectedDuration == item.id ? theme.colors.primary[500] : theme.colors.lightText,
                    },
                ]}
            >
                <Text style={styles.durationText}>{item.duration} dk</Text>
            </TouchableOpacity>
        );
    };

    const RenderLevel = ({ item }: any) => {
        const isSelected = selectedLevel == item.id;
        const bgColor = handleSelectBackgrounColor(item.id);
        const borderColor = handleSelectBorderColor(item.id);
        return (
            <TouchableOpacity onPress={() => handleSelectLevel(item.id)}>
                <View borderWidth="1px" borderBottomWidth="6px" borderTopWidth="1px" 
                borderColor={isSelected ? bgColor : "lightText"} mr="16px" mb="8px"
                py="4px" px="7px" borderRadius="8px" alignSelf="flex-start" 
                bgColor={isSelected ? borderColor : "white"}>
                    <Text fontSize="14.5px" fontWeight="extrabold" color={isSelected ? "white" : undefined}
                    textTransform="capitalize">{item.level}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const RenderQuota = ({ item }: any) => {
        return (
            <TouchableOpacity
                onPress={() => setSelectedQuota(item)}
                style={[
                    styles.durationButton,
                    {
                        width: width * 0.14,
                        borderColor: selectedQuota == item ? theme.colors.primary[500] : theme.colors.lightText,
                    },
                ]}
            >
                <Text style={styles.durationText}>{item}</Text>
            </TouchableOpacity>
        );
    };

    const RenderLanguages = ({ item }: any) => {
        return (
            <TouchableOpacity
                onPress={() => setSelectedLanguage(item.languageId)}
                style={[
                    {
                        borderWidth: 2, borderRadius: 50,
                        borderColor: selectedLanguage == item.languageId ? theme.colors.primary[500] : theme.colors.lightText,
                    },
                ]}
            >
                <SvgUri width="52" height="52" uri={item.image} />
            </TouchableOpacity>
        );
    };

    const RenderPrivacy = ({ item }: any) => {
        return (
            <TouchableOpacity onPress={() => handleSelectPrivacy(item.id)}
            style={[styles.durationButton,
                    {
                        borderColor: selectedPrivacy == item.id ? theme.colors.primary[500] : theme.colors.lightText,
                    },
                ]}
            >
                <Text style={styles.durationText}>{t(item.text)}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={[styles.safeAreaView, { backgroundColor: theme.colors.white }]}>
            <Header title={t("createRoom")} style={{ marginTop: 16 }} />
            
            <ScrollView showsVerticalScrollIndicator={false} mx="16px">
                <TextInput value={room} onChangeText={setRoom} placeholder={t("roomName")} />

                <View mt="16px">
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

                <View mt="24px">
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
                    <Text style={styles.sectionTitle}>Dilinizi Seçiniz</Text>
                    <View mt="8px" style={styles.listContainer}>
                        <FlatList
                            horizontal
                            data={userInfo?.languages || []}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={RenderLanguages}
                        />
                    </View>
                </View>

                <View mt="32px">
                    <Text style={styles.sectionTitle}>{t("roomQuota")}</Text>
                    <View mt="8px" style={styles.listContainer}>
                        <FlatList
                            data={mockQuotaData}
                            numColumns={5}
                            contentContainerStyle={{gap: 16}}
                            keyExtractor={(item) => item.toString()}
                            renderItem={RenderQuota}
                        />
                    </View>
                </View>

                <View mt="32px">
                    <Text style={styles.sectionTitle} mb="8px">{t("roomInterest")}</Text>
                    <SelectInput value={selectedInterest} onValueChange={setSelectedInterest} items={interests} />
                </View>

                <View mt="32px">
                    <Text style={styles.sectionTitle}>{t("roomPrivacy")}</Text>
                    <View mt="8px" flexDir="row">
                        <RenderPrivacy item={{id: 1, text: "public"}} />
                        <RenderPrivacy item={{id: 2, text: "private"}} />
                    </View>
                </View>
            <Button title={t("createRoomBtn")} onPress={handleCreateRoom} mt="16px" mb="16px"  />
            </ScrollView>
        
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
    durationButton: {
        borderWidth: 1,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth: 6,
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginRight: width * 0.025,
    },
    durationText: {
        fontWeight: "900",
        fontSize: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "500",
    },
    listContainer: {
        alignItems: "flex-start",
    }
});
