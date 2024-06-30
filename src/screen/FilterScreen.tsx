import { useNavigation } from "@react-navigation/native";
import { Actionsheet, Text, View, useTheme } from "native-base";
import { useState } from "react";
import { Dimensions, FlatList, Modal, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SvgUri } from "react-native-svg";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { useDispatch } from "react-redux";
import CheckBox from "../components/CheckBox";
import { useI18n } from "../hooks/useI18n";
import { CARDPURPLE1, LIGHT_BLACK } from "../utils/utils";

interface FilterListCompProps {
    onPress: () => void;
    title: string;
}

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
    const [levelCheckBox, setLevelCheckBox] = useState<any>({});
    const [roomFlowCheckBox, setRoomFlowCheckBox] = useState<any>({});

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
    
    const mockLevelData = [
        {
            id: "1",
            level: "Başlangıç Seviye"
        },
        {
            id: "2",
            level: "Orta Seviye"
        },
        {
            id: "3",
            level: "İleri Seviye"
        },
        {
            id: "4",
            level: "Farketmez"
        },
    ];

    const mockRoomFlowData = [
        {
            id: "1",
            label: "Başlamış Odalar"
        },
        {
            id: "2",
            label: "Başlamamış Odalar"
        },
        {
            id: "3",
            label: "Farketmez"
        },
       
    ];

    function handleSelectSort(selectedId: string) {
        setSelectedSort(selectedId);
        setIsSelectedSortVisible(false);
    }

    function handleLanguageCheckBoxChange(id: string){
        setLanguageCheckBox((prev: any) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    function handleTopicCheckBoxChange(id: string){
        setTopicCheckBox((prev: any) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    function handleLevelCheckBoxChange(id: string){
        setLevelCheckBox((prev: any) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    function handleRoomFlowCheckBoxChange(id: string){
        setRoomFlowCheckBox((prev: any) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    function handleClearAll(){
        setLanguageCheckBox({});
        setTopicCheckBox({});
        setLevelCheckBox({});
        setRoomFlowCheckBox({});
    }

    const RenderLanguage = ({ item }:any) => {
        return (
            <View>
                <TouchableOpacity 
                    onPress={() => handleLanguageCheckBoxChange(item.id)}
                    style={styles.touchableOpacity}>
                    <View style={styles.innerView}>
                        <SvgUri uri={item.logoUrl} width={24} height={24} />
                        <View style={[styles.textView, { maxWidth: width * 0.5 }]}>
                            <Text style={styles.text}>{item.title}</Text>
                        </View>
                    </View>
                    <CheckBox value={!!languageCheckBox[item.id]} onValueChange={() => handleLanguageCheckBoxChange(item.id)} />
                </TouchableOpacity> 
                <View style={[styles.divider, { backgroundColor: theme.colors.lightText }]} />
            </View>
        );
    };

    const RenderTopic = ({ item }:any) => {
        return (
            <View>
                <TouchableOpacity 
                    onPress={() => handleTopicCheckBoxChange(item.id)}
                    style={styles.touchableOpacity}>
                    <View style={styles.innerViewWithPadding}>
                        <Text style={styles.text}>{item.title}</Text>
                    </View>
                    <CheckBox value={!!topicCheckBox[item.id]} onValueChange={() => handleTopicCheckBoxChange(item.id)} />
                </TouchableOpacity> 
                <View style={[styles.divider, { backgroundColor: theme.colors.lightText }]} />
            </View>
        );
    };

    const RenderLevel = ({ item }:any) => {
        return (
            <View>
                <TouchableOpacity 
                    onPress={() => handleLevelCheckBoxChange(item.id)}
                    style={styles.touchableOpacity}>
                    <View style={styles.innerViewWithPadding}>
                        <Text style={styles.text}>{item.level}</Text>
                    </View>
                    <CheckBox value={!!levelCheckBox[item.id]} onValueChange={() => handleLevelCheckBoxChange(item.id)} />
                </TouchableOpacity> 
                <View style={[styles.divider, { backgroundColor: theme.colors.lightText }]} />
            </View>
        );
    
    };

    const RenderRoomFlow = ({ item }:any) => {
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

    const FilterListComp = ({onPress, title}: FilterListCompProps) => {
        return(
            <View>
            <TouchableOpacity onPress={onPress} style={styles.touchableOpacity}>
                <View>
                    <Text style={styles.text}>
                        {title}
                    </Text>
                </View>
                <View>
                    <Entypo name="chevron-right" color={LIGHT_BLACK} size={20} />
                </View>
            </TouchableOpacity>
            <View style={[styles.divider, { backgroundColor: theme.colors.lightText }]} />
        </View>
        )
    }

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
                <Actionsheet.Item style={[styles.actionsheetItem, { width }]}>
                    {mockData.map((item: any) => (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => handleSelectSort(item.id)}
                            style={[styles.touchableOpacity, { width: width - 32 }]}>
                            <Text style={styles.text}>{item.label}</Text>
                            <View style={styles.checkBoxOuter}>
                                {item.id === selectedSort && (
                                    <View style={styles.checkBoxInner} />
                                )}
                            </View>
                        </TouchableOpacity>
                    ))}
                </Actionsheet.Item>
            </Actionsheet.Content>
        </Actionsheet>
        <Modal visible={isFilterVisible} animationType="slide" onRequestClose={() => setIsFilterVisible(false)}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => setIsFilterVisible(false)}>
                <AntDesign name="close" color={LIGHT_BLACK} size={24} />
              </TouchableOpacity>
              <Text style={styles.headerText}>Filtrele</Text>
            </View>
            <TouchableOpacity onPress={handleClearAll}>
              <Text style={styles.clearAllText}>Hepsini Temizle</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.filterList}>
            <FilterListComp onPress={() => setIsLanguageVisible(true)} title={"Dil Seç"} />
            <FilterListComp onPress={() => setIsTopicVisible(true)} title={"Konu Seç"} />
            <FilterListComp onPress={() => setIsLevelVisible(true)} title={"Seviye Seç"} />
            <FilterListComp onPress={() => setIsRoomFlowVisible(true)} title={"Sohbet Akışı"} />
          </View>
        </ScrollView>
      </Modal>

      <Modal visible={isLanguageVisible} animationType="none" onRequestClose={() => setIsLanguageVisible(false)}>
      <View style={[styles.modalView, { marginTop:16}]}>
          <View style={styles.modalHeader}>
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => setIsLanguageVisible(false)}>
                <AntDesign name="left" color={LIGHT_BLACK} size={24} />
              </TouchableOpacity>
              <Text style={styles.modalHeaderText}>Dil Seç</Text>
            </View>
            <TouchableOpacity onPress={() => setLanguageCheckBox({})}>
              <Text style={styles.clearText}>Temizle</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.listView}>
            <FlatList
              data={mockLanguageData}
              keyExtractor={item => item.id.toString()}
              renderItem={RenderLanguage}
            />
          </View>
        </View>
      </Modal>

      <Modal visible={isTopicVisible} animationType="none" onRequestClose={() => setIsTopicVisible(false)}>
      <View style={[styles.modalView, { marginTop:16}]}>
          <View style={styles.modalHeader}>
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => setIsTopicVisible(false)}>
                <AntDesign name="left" color={LIGHT_BLACK} size={24} />
              </TouchableOpacity>
              <Text style={styles.modalHeaderText}>Konu Seç</Text>
            </View>
            <TouchableOpacity onPress={() => setTopicCheckBox({})}>
              <Text style={styles.clearText}>Temizle</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.listView}>
            <FlatList
              data={mockTopicData}
              keyExtractor={item => item.id.toString()}
              renderItem={RenderTopic}
            />
          </View>
        </View>
      </Modal>

      <Modal visible={isLevelVisible} animationType="none" onRequestClose={() => setIsLevelVisible(false)}>
      <View style={[styles.modalView, { marginTop:16}]}>
          <View style={styles.modalHeader}>
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => setIsLevelVisible(false)}>
                <AntDesign name="left" color={LIGHT_BLACK} size={24} />
              </TouchableOpacity>
              <Text style={styles.modalHeaderText}>Seviye Seç</Text>
            </View>
            <TouchableOpacity onPress={() => setLevelCheckBox({})}>
              <Text style={styles.clearText}>Temizle</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.listView}>
            <FlatList
              data={mockLevelData}
              keyExtractor={item => item.id.toString()}
              renderItem={RenderLevel}
            />
          </View>
        </View>
      </Modal>

      <Modal visible={isRoomFlowVisible} animationType="none" onRequestClose={() => setIsRoomFlowVisible(false)}>
        <View style={[styles.modalView, { marginTop:16}]}>
          <View style={styles.modalHeader}>
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => setIsRoomFlowVisible(false)}>
                <AntDesign name="left" color={LIGHT_BLACK} size={24} />
              </TouchableOpacity>
              <Text style={styles.modalHeaderText}>Seviye Seç</Text>
            </View>
            <TouchableOpacity onPress={() => setRoomFlowCheckBox({})}>
              <Text style={styles.clearText}>Temizle</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.listView}>
            <FlatList
              data={mockRoomFlowData}
              keyExtractor={item => item.id.toString()}
              renderItem={RenderRoomFlow}
            />
          </View>
        </View>
      </Modal>
        </View>
    );
}


const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    touchableOpacity: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 0,
        paddingVertical: 16,
        marginTop: 12

    },
    text: {
        fontSize: 18,
        fontWeight: "900",
        color: LIGHT_BLACK
    },
    divider: {
        height: 0.8,
        width: "100%"
    },
    
    innerView: {
        flexDirection: "row",
        alignItems: "center"
    },
    innerViewWithPadding: {
        flexDirection: "row",
        alignItems: "center",
    },
    textView: {
        marginLeft: 12
    },
    actionsheetItem: {
        alignItems: 'center'
    },
    checkBoxOuter: {
        width: 22,
        height: 22,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 360,
        borderWidth: 3,
        borderColor: LIGHT_BLACK
    },
    checkBoxInner: {
        width: 10,
        height: 10,
        borderRadius: 360,
        backgroundColor: LIGHT_BLACK
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
      },
      headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      headerText: {
        fontSize: 22,
        color: LIGHT_BLACK,
        marginLeft: 16,
        marginTop: 5,
      },
      clearAllText: {
        fontSize: 16,
        fontWeight: '900',
        color: CARDPURPLE1,
      },
      filterList: {
        marginTop: 8,
        marginHorizontal: 8,
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
        fontSize: 22,
        color: LIGHT_BLACK,
        marginLeft: 16,
        marginTop: 5,
      },
      clearText: {
        fontSize: 16,
        fontWeight: '900',
        color: CARDPURPLE1,
      },
      listView: {
        marginTop: 16,
        paddingHorizontal: 8,
      },
   
})