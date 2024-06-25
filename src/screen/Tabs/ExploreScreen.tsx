import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, View, useTheme } from "native-base";
import { useState } from "react";
import { Dimensions, FlatList, Pressable, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { SvgUri } from "react-native-svg";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { useDispatch } from "react-redux";
import { Header } from "../../components/Header";
import { useI18n } from "../../hooks/useI18n";
import { RootStackParamList } from "../../types/react-navigation";
import { BLUE1, CARDBLUE1, CARDBLUE2, CARDPURPLE1, CARDPURPLE2, CARDRED1, CARDRED2, MARGIN_HORİZONTAL } from "../../utils/utils";

type ExploreScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Explore">;

export default function ExploreScreen() {
    const navigation = useNavigation<ExploreScreenNavigationProp>();
    const { t } = useI18n("AccountScreen");
    const {width, height} = Dimensions.get("screen");
    const theme = useTheme();
    const dispatch = useDispatch();

    const [isFilterExpanded, setIsFilterExpanded] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("1");

    console.log("isfilter", isFilterExpanded);

    const mockData = [
        { id: '1', label: 'Önerilen' },
        { id: '2', label: 'Tarihe Göre En Yeni' },
        { id: '3', label: 'Tarihe Göre En Eski' },
        { id: '4', label: 'Seviyeye Göre En Yüksek' },
        { id: '5', label: 'Seviyeye Göre En Düşük' },
        { id: '6', label: 'Dile Göre' },
    ];

    const mockChatData = [
        {
            id: 1,
            title: "Chat Title 1",
            duration: "30 Dakika",
            slots: "4 Kontenjan",
            levelId: "1",
            levelName: "Beginner",
            flagUri: "https://hatscripts.github.io/circle-flags/flags/tr.svg"
        },
        {
            id: 2,
            title: "Chat Title 2",
            duration: "45 Dakika",
            slots: "6 Kontenjan",
            levelId: "2",
            levelName: "Intermediate",
            flagUri: "https://hatscripts.github.io/circle-flags/flags/tr.svg"
        },
        {
            id: 3,
            title: "Chat Title 3",
            duration: "60 Dakika",
            slots: "8 Kontenjan",
            levelId: "3",
            levelName: "Advanced",
            flagUri: "https://hatscripts.github.io/circle-flags/flags/tr.svg"
        },
        {
            id: 4,
            title: "Chat Title 4",
            duration: "30 Dakika",
            slots: "5 Kontenjan",
            levelId: "1",
            levelName: "Beginner",
            flagUri: "https://hatscripts.github.io/circle-flags/flags/tr.svg"
        },
        {
            id: 5,
            title: "Chat Title 5",
            duration: "45 Dakika",
            slots: "7 Kontenjan",
            levelId: "2",
            levelName: "Intermediate",
            flagUri: "https://hatscripts.github.io/circle-flags/flags/tr.svg"
        },
        {
            id: 6,
            title: "Chat Title 6",
            duration: "60 Dakika",
            slots: "9 Kontenjan",
            levelId: "3",
            levelName: "Advanced",
            flagUri: "https://hatscripts.github.io/circle-flags/flags/tr.svg"
        },
        {
            id: 7,
            title: "Chat Title 7",
            duration: "30 Dakika",
            slots: "3 Kontenjan",
            levelId: "1",
            levelName: "Beginner",
            flagUri: "https://hatscripts.github.io/circle-flags/flags/tr.svg"
        },
        {
            id: 8,
            title: "Chat Title 8",
            duration: "45 Dakika",
            slots: "6 Kontenjan",
            levelId: "2",
            levelName: "Intermediate",
            flagUri: "https://hatscripts.github.io/circle-flags/flags/tr.svg"
        },
        {
            id: 9,
            title: "Chat Title 9",
            duration: "60 Dakika",
            slots: "8 Kontenjan",
            levelId: "3",
            levelName: "Advanced",
            flagUri: "https://hatscripts.github.io/circle-flags/flags/tr.svg"
        },
        {
            id: 10,
            title: "Chat Title 10",
            duration: "30 Dakika",
            slots: "4 Kontenjan",
            levelId: "1",
            levelName: "Beginner",
            flagUri: "https://hatscripts.github.io/circle-flags/flags/tr.svg"
        }
    ];
    

    function handleSelectFilter(id: string){
        if(selectedFilter == id){
            setSelectedFilter("");
        }else{
            setSelectedFilter(id);
        }
    }

    function handleSelectBackgrounColor(levelId: string){
        switch(levelId){
            case "1":
                return CARDBLUE1
            case "2":
                return CARDPURPLE1
            case "3":
                return CARDRED1
        }
    }
    function handleSelectBorderColor(levelId: string){
        switch(levelId){
            case "1":
                return CARDBLUE2
            case "2":
                return CARDPURPLE2
            case "3":
                return CARDRED2
        }
    }

    const RenderFilterCard = ({ item }: any) => {
        return (
            <TouchableOpacity 
            onPress={() => handleSelectFilter(item.id)}
            style={[styles.itemContainer, {
                backgroundColor: item.id == selectedFilter ? BLUE1 : '#f2f3f5'
            }]}>
                <Text style={[styles.itemText, {
                    color: item.id == selectedFilter ? "white" : '#000000'
                }]}>{item.label}</Text>
            </TouchableOpacity>
        )
    }

    const RenderChatRoomCard = ({item}: any) => {
        return(
            <Pressable 
            onPress={() => navigation.push("RoomDetail")}
            style={{borderWidth:0.8, paddingHorizontal:12, paddingVertical:16, borderRadius:12, 
                borderLeftWidth:1.5, borderRightWidth:1.5, borderBottomWidth:6, borderColor: handleSelectBorderColor(item.levelId),
                backgroundColor: handleSelectBackgrounColor(item.levelId), marginVertical:8
            }}>
                <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                    
                    <View style={{maxWidth: width*0.7, }}>
                        <Text style={{fontSize:20, fontWeight:"900", color:theme.colors.white}}>{item.title}</Text>
                    </View>
                    <View>
                        <SvgUri uri={item.flagUri} width="24" height="24" />
                    </View>

                </View>

                <View style={{flexDirection:"row",alignItems:"center", marginTop:12, }}>
                    <View>
                        <AntDesign name="clockcircleo" color={theme.colors.white} size={24}/>    
                    </View>    
                    <View style={{marginLeft:8}}>
                        <Text style={{fontSize:14, fontWeight:"400", marginLeft:6, color:theme.colors.white}}>{item.duration}</Text>
                    </View>
                </View>
                <View style={{flexDirection:"row", justifyContent:"space-between",alignItems:"center", marginTop:12, }}>
                    <View style={{flexDirection:"row",alignItems:"center", width:width*0.6}}>
                        <View>
                            <FontAwesome6 name="people-group" color={theme.colors.white} size={24}/>    
                        </View>    
                        <View style={{marginLeft:8}}>
                            <Text style={{fontSize:14, fontWeight:"400", color:theme.colors.white}}>{item.slots}</Text>
                        </View>
                    </View>
                    <View style={{borderWidth:1, borderBottomWidth:3, borderTopWidth:1, 
                        borderColor:"white", paddingVertical:2, paddingHorizontal:4, borderRadius:8}}>
                        <Text style={{fontSize:12, fontWeight:"900", color:theme.colors.white}}>{item.levelName}</Text>
                    </View>
                </View>

            </Pressable>
        )
    }

    return (
        <SafeAreaView style={[styles.safeAreaView, { backgroundColor: theme.colors.white }]}>
            <Header title={"Keşfet"} />

            <Pressable style={{ borderWidth: 1.5, borderTopWidth: 1, borderBottomWidth: 4, borderColor: theme.colors.lightText, padding: 12, borderRadius: 8, marginTop: 16, flexDirection: "row", alignItems: "center" }}>
                <FontAwesome name="search" color={"black"} size={20} />
                <Text style={{ fontSize: 16, marginLeft: 8, fontWeight: "900" }}>Oda veya Kullanıcı Ara..</Text>
            </Pressable>

            <View mt="16px" style={{ borderWidth: 0, paddingVertical:8, paddingHorizontal:4, borderRadius:8, 
                backgroundColor: isFilterExpanded ? "#f7fcfc" : "white"}}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: "800" }}>Odaları Filterele</Text>
                    </View>
                    <Pressable onPress={() => setIsFilterExpanded(!isFilterExpanded)}>
                        {isFilterExpanded ? (
                            <Feather name="chevron-up" color={theme.colors.black} size={24} />
                        ) : (
                            <Feather name="chevron-down" color={theme.colors.black} size={24} />
                        )}
                    </Pressable>
                </View>
                {isFilterExpanded ? (
                    <View style={styles.container}>
                        <FlatList
                            data={mockData}
                            renderItem={RenderFilterCard}
                            keyExtractor={item => item.id}
                            numColumns={2} // Adjust number of columns as needed
                            contentContainerStyle={styles.listContainer}
                        />
                    </View>
                ) : null}
                
                <View mt="16px" style={{paddingVertical:16}}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={mockChatData}
                        keyExtractor={item => item.id.toString()}
                        renderItem={RenderChatRoomCard}
                    />
                  
                
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        paddingHorizontal: MARGIN_HORİZONTAL,
    },
    unblockButton: {
        borderWidth: 1,
        borderBottomWidth: 5,
        borderRadius: 8,
        paddingHorizontal: 6,
        paddingVertical: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        marginTop: 4,
    },
    listContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop: 4,
    },
    itemContainer: {
        backgroundColor: '#f2f3f5', // coolGray.100 equivalent
        marginHorizontal: 4,
        marginTop: 6,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
    },
    itemText: {
        fontSize: 15,
        fontWeight: '900',
        color: '#000000', // theme.colors.black equivalent
    },
});
