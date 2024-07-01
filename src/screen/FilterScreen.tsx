import { useNavigation } from "@react-navigation/native";
import { Text, View, useTheme } from "native-base";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, Modal, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SvgUri } from "react-native-svg";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { useDispatch, useSelector } from "react-redux";
import CheckBox from "../components/CheckBox";
import { useI18n } from "../hooks/useI18n";
import { LIGHT_BLACK } from "../utils/utils";
import { Header } from "../components/Header";
import { RootStateType } from "../store/store";
import api from "../api/api";

interface FilterListCompProps {
    onPress: () => void;
    title: string;
}
const mockLevelData = ["beginner", "intermediate", "advanced"];

export default function FilterScreen() {
    const navigation = useNavigation();
    const { t } = useI18n("AccountScreen");
    const i18nFlags = useI18n("language");
    const i18nInterests = useI18n("interests");
    const { width, height } = Dimensions.get("screen");
    const theme = useTheme();
    const dispatch = useDispatch();

    const [interests, setInterests] = useState<any[]>([]);

    const [isLanguageVisible, setIsLanguageVisible] = useState(false);
    const [isTopicVisible, setIsTopicVisible] = useState(false);
    const [isLevelVisible, setIsLevelVisible] = useState(false);
    const [isRoomFlowVisible, setIsRoomFlowVisible] = useState(false);

    const [languageCheckBox, setLanguageCheckBox] = useState<any>({});
    const [topicCheckBox, setTopicCheckBox] = useState<any>({});
    const [levelCheckBox, setLevelCheckBox] = useState<any>({});
    const [roomFlowCheckBox, setRoomFlowCheckBox] = useState<any>({});

    const languages = useSelector<RootStateType, any[]>(state => state.account.userInfo?.languages as any[]);

    useEffect(() => {
        init();
    }, []);

    async function init() {
        try {
            const resp = await api.get("/user/interests/type");

            setInterests(resp.data.data.map((v: any) => ({
                label: i18nInterests.t(v.name),
                value: v.id
            })));
        } catch (error) {
            console.log(error);
        }
    }

    const mockRoomFlowData = [
        {
            id: "1",
            label: "Başlamış Odalar"
        },
        {
            id: "2",
            label: "Başlamamış Odalar"
        }
    ];

    function handleLanguageCheckBoxChange(id: string) {
        setLanguageCheckBox((prev: any) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    function handleTopicCheckBoxChange(id: number) {
        setTopicCheckBox((prev: any) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    function handleLevelCheckBoxChange(id: string) {
        setLevelCheckBox((prev: any) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    function handleRoomFlowCheckBoxChange(id: string) {
        setRoomFlowCheckBox((prev: any) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    function handleClearAll() {
        setLanguageCheckBox({});
        setTopicCheckBox({});
        setLevelCheckBox({});
        setRoomFlowCheckBox({});
    }

    const RenderLanguage = ({ item }: any) => {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => handleLanguageCheckBoxChange(item.languageId)}
                    style={styles.touchableOpacity}>
                    <View flexDir="row" alignItems="center">
                        <SvgUri uri={item.image} width={24} height={24} />
                        <View ml="12px" style={[ { maxWidth: width * 0.5 }]}>
                            <Text style={styles.text}>{i18nFlags.t(item.languageName)}</Text>
                        </View>
                    </View>
                    <CheckBox value={!!languageCheckBox[item.id]} onValueChange={() => handleLanguageCheckBoxChange(item.id)} />
                </TouchableOpacity>
                <View style={[styles.divider, { backgroundColor: theme.colors.lightText }]} />
            </View>
        );
    };

    const RenderTopic = ({ item }: any) => {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => handleTopicCheckBoxChange(item.id)}
                    style={styles.touchableOpacity}>
                    <View style={styles.innerViewWithPadding}>
                        <Text style={styles.text}>{item.label}</Text>
                    </View>
                    <CheckBox value={topicCheckBox[item.value]} onValueChange={() => handleTopicCheckBoxChange(item.value)} />
                </TouchableOpacity>
                <View style={[styles.divider, { backgroundColor: theme.colors.lightText }]} />
            </View>
        );
    };

    const RenderLevel = ({ item }: any) => {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => handleLevelCheckBoxChange(item)}
                    style={styles.touchableOpacity}>
                    <View style={styles.innerViewWithPadding}>
                        <Text textTransform="capitalize" style={styles.text}>{item}</Text>
                    </View>
                    <CheckBox value={levelCheckBox[item]} onValueChange={() => handleLevelCheckBoxChange(item)} />
                </TouchableOpacity>
                <View style={[styles.divider, { backgroundColor: theme.colors.lightText }]} />
            </View>
        );
    };

    const RenderRoomFlow = ({ item }: any) => {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => handleRoomFlowCheckBoxChange(item.id)}
                    style={styles.touchableOpacity}>
                    <View style={styles.innerViewWithPadding}>
                        <Text style={styles.text}>{item.label}</Text>
                    </View>
                    <CheckBox value={!!roomFlowCheckBox[item.id]} onValueChange={() => handleRoomFlowCheckBoxChange(item.id)} />
                </TouchableOpacity>
                <View style={[styles.divider, { backgroundColor: theme.colors.lightText }]} />
            </View>
        );
    };

    const FilterListComp = ({ onPress, title }: FilterListCompProps) => {
        return (
            <View>
                <TouchableOpacity onPress={onPress} style={styles.touchableOpacity}>
                    <Text style={styles.text}>
                        {title}
                    </Text>    
                    <Entypo name="chevron-right" color={LIGHT_BLACK} size={20} />
                </TouchableOpacity>
                <View style={[styles.divider, { backgroundColor: theme.colors.lightText }]} />
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <Header title="Filtrele" style={{marginTop: 16}}
            rightIcon={<TouchableOpacity onPress={handleClearAll}>
                    <Text color="primary.500" style={styles.clearText}>Hepsini Temizle</Text>
                </TouchableOpacity>} 
            />

            <View mx="16px" style={{ gap: 12 }}>
                <FilterListComp onPress={() => setIsLanguageVisible(true)} title={"Dil Seç"} />
                <FilterListComp onPress={() => setIsTopicVisible(true)} title={"Konu Seç"} />
                <FilterListComp onPress={() => setIsLevelVisible(true)} title={"Seviye Seç"} />
                <FilterListComp onPress={() => setIsRoomFlowVisible(true)} title={"Sohbet Akışı"} />
            </View>

            <Modal visible={isLanguageVisible} animationType="slide" onRequestClose={() => setIsLanguageVisible(false)}>
                <View style={[styles.modalView, { marginTop: 16 }]}>
                    <View style={styles.modalHeader}>
                        <View style={styles.headerLeft}>
                            <TouchableOpacity onPress={() => setIsLanguageVisible(false)}>
                                <AntDesign name="close" color={LIGHT_BLACK} size={24} />
                            </TouchableOpacity>
                            <Text style={styles.modalHeaderText}>Dil Seç</Text>
                        </View>
                        <TouchableOpacity onPress={() => setLanguageCheckBox({})}>
                            <Text color="primary.500" style={styles.clearText}>Temizle</Text>
                        </TouchableOpacity>
                    </View>
                        <FlatList
                            data={languages || [{ id: 1, languageName: "england", languageId: 0, image: "https://hatscripts.github.io/circle-flags/flags/gb.svg" }]}
                            keyExtractor={item => item.id.toString()}
                            renderItem={RenderLanguage}
                        />
                </View>
            </Modal>

            <Modal visible={isTopicVisible} animationType="slide" onRequestClose={() => setIsTopicVisible(false)}>
                <View style={[styles.modalView, { marginTop: 16 }]}>
                    <View style={styles.modalHeader}>
                        <View style={styles.headerLeft}>
                            <TouchableOpacity onPress={() => setIsTopicVisible(false)}>
                                <AntDesign name="close" color={LIGHT_BLACK} size={24} />
                            </TouchableOpacity>
                            <Text style={styles.modalHeaderText}>Konu Seç</Text>
                        </View>
                        <TouchableOpacity onPress={() => setTopicCheckBox({})}>
                            <Text color="primary.500" style={styles.clearText}>Temizle</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={interests}
                        keyExtractor={item => item.id}
                        renderItem={RenderTopic}
                    />
                </View>
            </Modal>

            <Modal visible={isLevelVisible} animationType="slide" onRequestClose={() => setIsLevelVisible(false)}>
                <View style={[styles.modalView]}>
                    <View style={styles.modalHeader}>
                        <View style={styles.headerLeft}>
                            <TouchableOpacity onPress={() => setIsLevelVisible(false)}>
                                <AntDesign name="close" color={LIGHT_BLACK} size={24} />
                            </TouchableOpacity>
                            <Text style={styles.modalHeaderText}>Seviye Seç</Text>
                        </View>
                        <TouchableOpacity onPress={() => setLevelCheckBox({})}>
                            <Text color="primary.500" style={styles.clearText}>Temizle</Text>
                        </TouchableOpacity>
                    </View>
                        <FlatList
                            data={mockLevelData}
                            keyExtractor={item => item.toString()}
                            renderItem={RenderLevel}
                        />
                    
                </View>
            </Modal>
            <Modal visible={isRoomFlowVisible} animationType="slide" onRequestClose={() => setIsRoomFlowVisible(false)}>
                <View style={[styles.modalView, { marginTop: 16 }]}>
                    <View style={styles.modalHeader}>
                        <View style={styles.headerLeft}>
                            <TouchableOpacity onPress={() => setIsRoomFlowVisible(false)}>
                                <AntDesign name="close" color={LIGHT_BLACK} size={24} />
                            </TouchableOpacity>
                            <Text style={styles.modalHeaderText}>Seviye Seç</Text>
                        </View>
                        <TouchableOpacity onPress={() => setRoomFlowCheckBox({})}>
                            <Text color="primary.500" style={styles.clearText}>Temizle</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={mockRoomFlowData}
                        keyExtractor={item => item.id.toString()}
                        renderItem={RenderRoomFlow}
                    />
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        paddingTop: 16,
    },
    touchableOpacity: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 0,
        paddingVertical: 12,
    },
    text: {
        fontSize: 16.5,
        fontWeight: "900",
        color: LIGHT_BLACK
    },
    divider: {
        height: 0.8,
        width: "100%"
    },
    innerViewWithPadding: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 19,
        color: LIGHT_BLACK,
        marginLeft: 16,
        marginTop: 5,
    },
    modalView: {
        flex: 1,
        paddingHorizontal: 16,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    modalHeaderText: {
        fontSize: 19,
        color: LIGHT_BLACK,
        marginLeft: 16,
        marginTop: 5,
    },
    clearText: {
        fontSize: 15.5,
        fontWeight: '900',
    },
});