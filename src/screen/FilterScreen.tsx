import { useNavigation } from "@react-navigation/native";
import { Actionsheet, Text, View, useTheme } from "native-base";
import { useState } from "react";
import { Dimensions, FlatList, Modal, ScrollView, TouchableOpacity } from "react-native";
import { SvgUri } from "react-native-svg";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { useDispatch } from "react-redux";
import CheckBox from "../components/CheckBox";
import { useI18n } from "../hooks/useI18n";
import { CARDPURPLE1, LIGHT_BLACK } from "../utils/utils";

export default function FilterScreen() {
    const navigation = useNavigation();
    const { t } = useI18n("AccountScreen");
    const { width, height } = Dimensions.get("screen");
    const theme = useTheme();
    const dispatch = useDispatch();

    const [isSelectedSortVisible, setIsSelectedSortVisible] = useState(false);
    const [selectedSort, setSelectedSort] = useState("1");

    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [isLanguageVisible, setIsLanguageVisible] = useState(false);
    const [isTopicVisible, setIsTopicVisible] = useState(false);
    const [isLevelVisible, setIsLevelVisible] = useState(false);
    const [isRoomFlowVisible, setIsRoomFlowVisible] = useState(false);

    const [languageCheckBox, setLanguageCheckBox] = useState<any>({});
    const [topicCheckBox, setTopicCheckBox] = useState<any>({});

    const mockData = [
        { id: '1', label: 'Önerilen' },
        { id: '2', label: 'Tarihe Göre En Yeni' },
        { id: '3', label: 'Tarihe Göre En Eski' },
        { id: '4', label: 'Seviyeye Göre En Yüksek' },
        { id: '5', label: 'Seviyeye Göre En Düşük' },
        { id: '6', label: 'Dile Göre' },
    ];

    const mockLanguageData = [
        {
            id: "1",
            logoUrl: "https://hatscripts.github.io/circle-flags/flags/tr.svg",
            title: "Turkish"
        },
        {
            id: "2",
            logoUrl: "https://hatscripts.github.io/circle-flags/flags/gb.svg",
            title: "English"
        },
        {
            id: "3",
            logoUrl: "https://hatscripts.github.io/circle-flags/flags/tr.svg",
            title: "German"
        },
    ];

    const mockTopicData = [
        {
            id: "1",
            title: "Spor"
        },
        {
            id: "2",
            title: "Tarih"
        },
        {
            id: "3",
            title: "Siyaset"
        },
    ];

    function handleSelectSort(selectedId: string) {
        setSelectedSort(selectedId);
        setIsSelectedSortVisible(false);
    }

    const handleLanguageCheckBoxChange = (id: string) => {
        setLanguageCheckBox((prev: any) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleTopicCheckBoxChange = (id: string) => {
        setTopicCheckBox((prev: any) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const RenderLanguage = ({ item }:any) => {
        return (
            <View>
               <TouchableOpacity 
               onPress={() => handleLanguageCheckBoxChange(item.id)}
               style={{
                flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: 0, paddingVertical: 4,
                marginVertical: 4
            }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <SvgUri uri={item.logoUrl} width={24} height={24} />
                    <View style={{ maxWidth: width * 0.5, marginLeft: 12 }}>
                        <Text style={{ fontSize: 18, fontWeight: "900", color: LIGHT_BLACK }}>{item.title}</Text>
                    </View>
                </View>
                <CheckBox value={!!languageCheckBox[item.id]} onValueChange={() => handleLanguageCheckBoxChange(item.id)} />
                    
            </TouchableOpacity> 
            <View style={{ height: 0.8, backgroundColor: theme.colors.lightText, width: "100%" }} />

            </View>
            
        );
    };

    const RenderTopic = ({ item }:any) => {
        return (
            <View>
               <TouchableOpacity 
               onPress={() => handleTopicCheckBoxChange(item.id)}
               style={{
                flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: 0, paddingVertical: 4,
                marginVertical: 4
            }}>
                <View style={{ flexDirection: "row", alignItems: "center", paddingLeft:12 }}>
                        <Text style={{ fontSize: 18, fontWeight: "900", color: LIGHT_BLACK }}>{item.title}</Text>
                </View>
                <CheckBox value={!!topicCheckBox[item.id]} onValueChange={() => handleTopicCheckBoxChange(item.id)} />
                    
            </TouchableOpacity> 
            <View style={{ height: 0.8, backgroundColor: theme.colors.lightText, width: "100%" }} />

            </View>
            
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <TouchableOpacity onPress={() => setIsSelectedSortVisible(true)} style={{ borderWidth: 1 }}>
                <Text>Sırala</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsFilterVisible(true)} style={{ borderWidth: 1 }}>
                <Text>Filter</Text>
            </TouchableOpacity>

            <Actionsheet isOpen={isSelectedSortVisible} onClose={() => setIsSelectedSortVisible(false)}>
                <Actionsheet.Content>
                    <Actionsheet.Item style={{ width: width, alignItems: "center" }}>
                        {mockData.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => handleSelectSort(item.id)}
                                style={{
                                    flexDirection: "row", width: width - 32, marginVertical: 4, paddingVertical: 4,
                                    alignItems: "center", justifyContent: "space-between"
                                }}>
                                <Text style={{ fontSize: 20, fontWeight: "900", color: LIGHT_BLACK }}>{item.label}</Text>
                                <View style={{
                                    width: 22, height: 22, alignItems: "center", justifyContent: "center",
                                    borderRadius: 360, borderWidth: 3, borderColor: LIGHT_BLACK
                                }}>
                                    {item.id === selectedSort && (
                                        <View style={{ width: 10, height: 10, borderRadius: 360, backgroundColor: LIGHT_BLACK }} />
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </Actionsheet.Item>
                </Actionsheet.Content>
            </Actionsheet>

            <Modal visible={isFilterVisible} animationType="slide" onRequestClose={() => setIsFilterVisible(false)}>
                <ScrollView style={{ flex: 1, paddingHorizontal: 16, paddingTop:16 }}>
                    <View style={{
                       flexDirection: "row", justifyContent: "space-between", alignItems: "center",
                       marginTop: 2, paddingVertical: 8
                    }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TouchableOpacity onPress={() => setIsFilterVisible(false)}>
                                <AntDesign name="close" color={LIGHT_BLACK} size={24} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 22, color: LIGHT_BLACK, marginLeft: 16, marginTop: 5 }}>Filtrele</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: "900", color: CARDPURPLE1 }}>Temizle</Text>
                        </View>
                    </View>

                    <View mt="8px" mx="8px">
                        <View>
                            <TouchableOpacity
                                onPress={() => setIsLanguageVisible(true)}
                                style={{
                                    flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: 0,
                                    paddingVertical: 8, marginTop: 12
                                }}>
                                <View>
                                    <Text style={{ fontSize: 18, fontWeight: "900", color: LIGHT_BLACK }}>
                                        Dil Seç
                                    </Text>
                                </View>
                                <View>
                                    <Entypo name="chevron-right" color={LIGHT_BLACK} size={20} />
                                </View>
                            </TouchableOpacity>
                            <View style={{ height: 0.8, backgroundColor: theme.colors.lightText, width: "100%" }} />
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => setIsTopicVisible(true)}
                                style={{
                                    flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: 0,
                                    paddingVertical: 8, marginTop: 12
                                }}>
                                <View>
                                    <Text style={{ fontSize: 18, fontWeight: "900", color: LIGHT_BLACK }}>
                                        Konu Seç
                                    </Text>
                                </View>
                                <View>
                                    <Entypo name="chevron-right" color={LIGHT_BLACK} size={20} />
                                </View>
                            </TouchableOpacity>
                            <View style={{ height: 0.8, backgroundColor: theme.colors.lightText, width: "100%" }} />
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => setIsLevelVisible(true)}
                                style={{
                                    flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: 0,
                                    paddingVertical: 8, marginTop: 12
                                }}>
                                <View>
                                    <Text style={{ fontSize: 18, fontWeight: "900", color: LIGHT_BLACK }}>
                                        Seviye Seç
                                    </Text>
                                </View>
                                <View>
                                    <Entypo name="chevron-right" color={LIGHT_BLACK} size={20} />
                                </View>
                            </TouchableOpacity>
                            <View style={{ height: 0.8, backgroundColor: theme.colors.lightText, width: "100%" }} />
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => setIsRoomFlowVisible(true)}
                                style={{
                                    flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: 0,
                                    paddingVertical: 8, marginTop: 12
                                }}>
                                <View>
                                    <Text style={{ fontSize: 18, fontWeight: "900", color: LIGHT_BLACK }}>
                                        Sohbet Akışı
                                    </Text>
                                </View>
                                <View>
                                    <Entypo name="chevron-right" color={LIGHT_BLACK} size={20} />
                                </View>
                            </TouchableOpacity>
                            <View style={{ height: 0.8, backgroundColor: theme.colors.lightText, width: "100%" }} />
                        </View>
                    </View>
                </ScrollView>
            </Modal>

            <Modal visible={isLanguageVisible} animationType="none" onRequestClose={() => setIsLanguageVisible(false)}>
                <View mt="16px" style={{ flex: 1, paddingHorizontal: 16, }}>

                <View style={{
                        flexDirection: "row", justifyContent: "space-between", alignItems: "center",
                        marginTop: 2, paddingVertical: 8
                    }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TouchableOpacity onPress={() => setIsLanguageVisible(false)}>
                                <AntDesign name="left" color={LIGHT_BLACK} size={24} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 22, color: LIGHT_BLACK, marginLeft: 16, marginTop: 5 }}>Dil Seç</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: "900", color: CARDPURPLE1 }}>Temizle</Text>
                        </View>
                    </View>

                    <View style={{marginTop:16, paddingHorizontal:8}}>
                        <FlatList
                            data={mockLanguageData}
                            keyExtractor={item => item.id.toString()}
                            renderItem={RenderLanguage}
                        />
                        
                    </View>
                    
                </View>
            </Modal>

            <Modal visible={isTopicVisible} animationType="none" onRequestClose={() => setIsTopicVisible(false)}>
            <View mt="16px" style={{ flex: 1, paddingHorizontal: 16, }}>

                <View style={{
                        flexDirection: "row", justifyContent: "space-between", alignItems: "center",
                        marginTop: 2, paddingVertical: 8
                    }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TouchableOpacity onPress={() => setIsLanguageVisible(false)}>
                                <AntDesign name="left" color={LIGHT_BLACK} size={24} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 22, color: LIGHT_BLACK, marginLeft: 16, marginTop: 5 }}>Dil Seç</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: "900", color: CARDPURPLE1 }}>Temizle</Text>
                        </View>
                    </View>

                    <View style={{marginTop:16, paddingHorizontal:8}}>
                        <FlatList
                            data={mockTopicData}
                            keyExtractor={item => item.id.toString()}
                            renderItem={RenderTopic}
                        />
                        
                    </View>
                    
                </View>
            </Modal>

            <Modal visible={isLevelVisible} animationType="none" onRequestClose={() => setIsLevelVisible(false)}>
            </Modal>

            <Modal visible={isRoomFlowVisible} animationType="none" onRequestClose={() => setIsRoomFlowVisible(false)}>
            </Modal>
        </View>
    );
}
