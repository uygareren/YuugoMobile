import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Avatar, Text, View, useTheme, Pressable, Skeleton } from "native-base";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { SvgUri } from "react-native-svg";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { useDispatch, useSelector } from "react-redux";
import { useI18n } from "../../hooks/useI18n";
import { RootStackParamList } from "../../types/react-navigation";
import { BLUE1, CARDBLUE1, CARDBLUE2, CARDPURPLE1, CARDPURPLE2, CARDRED1, CARDRED2, MARGIN_HORİZONTAL } from "../../utils/utils";
import { RootStateType } from "../../store/store";
import api from "../../api/api";
import { ChatRoomsType } from "../../types/response/response";
import { chatSliceActions } from "../../store/slices/chatSlice";

type ExploreScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Explore">;

export default function ExploreScreen() {
    const navigation = useNavigation<ExploreScreenNavigationProp>();
    const { t } = useI18n("AccountScreen");
    const i18nInterests = useI18n("interests");
    const {width, height} = Dimensions.get("screen");
    const theme = useTheme();
    const dispatch = useDispatch();

    const chats = useSelector<RootStateType, ChatRoomsType[]>(state => state.chat.chats);
    const loading = useSelector<RootStateType, boolean>(state => state.chat.loading);
    const jwt = useSelector<RootStateType>(state => state.account.jwt);

    useEffect(() => {
        getChats()
    }, []);

    async function getChats() {
        try {
            dispatch(chatSliceActions.setLoading(true));
            const resp = await api.post("/chat", {}, {
                headers: {
                    authorization: `Bearer ${jwt}`
                }
            });

            let data = resp.data.data;

            dispatch(chatSliceActions.setChats(data));
        } catch (error) {
            console.log("error", error);
        }
    }

    const mockData = [
        { id: '1', label: 'Önerilen' },
        { id: '2', label: 'Tarihe Göre En Yeni' },
        { id: '3', label: 'Tarihe Göre En Eski' },
        { id: '4', label: 'Seviyeye Göre En Yüksek' },
        { id: '5', label: 'Seviyeye Göre En Düşük' },
        { id: '6', label: 'Dile Göre' },
    ];

    function handleSelectBackgrounColor(levelId: string){
        switch(levelId){
            case "beginner":
                return CARDBLUE1
            case "intermediate":
                return CARDPURPLE1
            case "advanced":
                return CARDRED1
            default: 
                return "#0076CE"
        }
    }

    const RenderChatRoomCard = ({item}: { item: ChatRoomsType }) => {
        const color = handleSelectBackgrounColor(item.chatLanguageLevel);

        return(
            <Pressable 
            onPress={() => navigation.push("RoomDetail")} mx="16px"
            borderWidth="0.8px" px="12px" py="16px" borderRadius="12px" borderLeftWidth="1.5px" borderRightWidth="1.5px"
            borderBottomWidth="6px" borderColor={color} background={color}>
                <View flexDir="row" justifyContent="space-between" >
                    <View>
                        <Text fontSize="20px" fontWeight="extrabold" color="#fcfcfc">{item.chatName}</Text>
                        <Text fontSize="15px" fontWeight="bold" color="white">{i18nInterests.t(item.interestName)}</Text>
                    </View>
                    <SvgUri uri={item.languageImage} width="24" height="24" />
                </View>

                <View flexDir="row" alignItems="center" mt="16px">
                    <Avatar size="24px" source={{uri: item.avatarUrl}} />
                    <Text color="white" ml="8px" fontWeight="bold">{item.username}</Text>
                </View>

                <View flexDir="row" alignItems="center" mt="8px">
                    <AntDesign name="clockcircleo" color={theme.colors.white} size={24}/>
                    <Text fontSize="14px" fontWeight="400" ml="8px" color="white">{item.countDownMinute - item.minutePass} dakika</Text>
                </View>

                <View flexDir="row" justifyContent="space-between" alignItems="center" mt="8px">
                    <View flexDir="row" alignItems="center" >    
                        <FontAwesome6 name="people-group" color={theme.colors.white} size={24}/>        
                        <Text ml="8px" fontSize="14px" fontWeight="normal" color="white">
                            {item.userCount + " / " + item.maxUserCount}
                        </Text>
                    </View>
                    <View borderWidth="1px" borderBottomWidth="3px" borderTopWidth="1px" borderColor="white"
                    py="2px" px="4px" borderRadius="8px">
                        <Text fontSize="12.5px" color="white" fontWeight="extrabold" textTransform="capitalize">{item.chatLanguageLevel || "Farketmez"}</Text>
                    </View>
                </View>

            </Pressable>
        )
    }

    if(loading) {
        return (
            <View flex={1} bgColor="white">
                <SafeAreaView>
                    <View mt="16px" mx="16px">
                        <Skeleton alignSelf="flex-start" borderRadius="8px" height="40px" mb="16px" />
                        <View flexDir="row" mb="16px" >
                            <Skeleton borderRadius="8px" height="40px" width="1/5" mr="16px" />
                            <Skeleton borderRadius="8px" height="40px" width="1/4" />
                        </View>
                        <View borderRadius="12px" py="16px" borderWidth="1px" 
                        borderColor="coolGray.300" px="12px" mb="16px">
                            <View flexDir="row" justifyContent="space-between">
                                <View flexDir="column" flex={1}>
                                    <Skeleton height="15px" borderRadius="20px" width="1/2" />
                                    <Skeleton height="12px" borderRadius="20px" width="1/3" mt="8px" />
                                </View>
                                <Skeleton startColor="primary.500" width="28px" height="28px" borderRadius="100px" />
                            </View>
                            <View flexDir="row" alignItems="center" mt="12px">
                                <Skeleton startColor="secondary.500" width="24px" height="24px" borderRadius="100px" />
                                <Skeleton height="11px" borderRadius="20px" width="1/4" ml="4px" />
                            </View>
                            <View flexDir="row" alignItems="center" mt="12px">
                                <Skeleton width="24px" height="24px" borderRadius="5px" />
                                <Skeleton height="11px" borderRadius="20px" width="1/4" ml="4px" />
                            </View>
                            <View flexDir="row" justifyContent="space-between" alignItems="flex-end">
                                <View flexDir="row" alignItems="center" mt="12px">
                                    <Skeleton width="24px" height="24px" borderRadius="5px" />
                                    <Skeleton height="11px" borderRadius="20px" width="1/4" ml="4px" />
                                </View>
                                    <Skeleton height="25px" borderRadius="10px" width="1/3" />
                            </View>
                        </View>

                        <View borderRadius="12px" py="16px" borderWidth="1px" 
                        borderColor="coolGray.300" px="12px" mb="16px">
                            <View flexDir="row" justifyContent="space-between">
                                <View flexDir="column" flex={1}>
                                    <Skeleton height="15px" borderRadius="20px" width="1/2" />
                                    <Skeleton height="12px" borderRadius="20px" width="1/3" mt="8px" />
                                </View>
                                <Skeleton startColor="primary.500" width="28px" height="28px" borderRadius="100px" />
                            </View>
                            <View flexDir="row" alignItems="center" mt="12px">
                                <Skeleton startColor="secondary.500" width="24px" height="24px" borderRadius="100px" />
                                <Skeleton height="11px" borderRadius="20px" width="1/4" ml="4px" />
                            </View>
                            <View flexDir="row" alignItems="center" mt="12px">
                                <Skeleton width="24px" height="24px" borderRadius="5px" />
                                <Skeleton height="11px" borderRadius="20px" width="1/4" ml="4px" />
                            </View>
                            <View flexDir="row" justifyContent="space-between" alignItems="flex-end">
                                <View flexDir="row" alignItems="center" mt="12px">
                                    <Skeleton width="24px" height="24px" borderRadius="5px" />
                                    <Skeleton height="11px" borderRadius="20px" width="1/4" ml="4px" />
                                </View>
                                    <Skeleton height="25px" borderRadius="10px" width="1/3" />
                            </View>
                        </View>

                        <View borderRadius="12px" py="16px" borderWidth="1px" 
                        borderColor="coolGray.300" px="12px" mb="16px">
                            <View flexDir="row" justifyContent="space-between">
                                <View flexDir="column" flex={1}>
                                    <Skeleton height="15px" borderRadius="20px" width="1/2" />
                                    <Skeleton height="12px" borderRadius="20px" width="1/3" mt="8px" />
                                </View>
                                <Skeleton startColor="primary.500" width="28px" height="28px" borderRadius="100px" />
                            </View>
                            <View flexDir="row" alignItems="center" mt="12px">
                                <Skeleton startColor="secondary.500" width="24px" height="24px" borderRadius="100px" />
                                <Skeleton height="11px" borderRadius="20px" width="1/4" ml="4px" />
                            </View>
                            <View flexDir="row" alignItems="center" mt="12px">
                                <Skeleton width="24px" height="24px" borderRadius="5px" />
                                <Skeleton height="11px" borderRadius="20px" width="1/4" ml="4px" />
                            </View>
                            <View flexDir="row" justifyContent="space-between" alignItems="flex-end">
                                <View flexDir="row" alignItems="center" mt="12px">
                                    <Skeleton width="24px" height="24px" borderRadius="5px" />
                                    <Skeleton height="11px" borderRadius="20px" width="1/4" ml="4px" />
                                </View>
                                    <Skeleton height="25px" borderRadius="10px" width="1/3" />
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        );
    }

    return (
        <SafeAreaView style={[styles.safeAreaView, { backgroundColor: theme.colors.white, flex: 1 }]}>
            <Pressable onPress={() => navigation.navigate("Search")} mb="16px"
            borderWidth="1.5px" borderTopWidth="1px" borderBottomWidth="4px" borderColor="lightText" 
            p="13px" mt="12px" flexDir="row" borderRadius="8px" alignItems="center" mx="16px">
                <FontAwesome name="search" color={theme.colors.coolGray[500]} size={20} />
                <Text fontSize="15px" ml="8px" fontWeight="600px" >Oda veya Kullanıcı Ara..</Text>
            </Pressable>

            <View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={chats}
                    contentContainerStyle={{ gap: 16, paddingBottom: 100}}
                    keyExtractor={item => item.id.toString()}
                    renderItem={RenderChatRoomCard}
                />
                
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
