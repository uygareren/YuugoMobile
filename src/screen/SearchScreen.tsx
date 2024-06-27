import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Icon, Text, View, useTheme, Pressable, Avatar } from "native-base";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "../components/Header";
import TextInput from "../components/input/TextInput";
import { useI18n } from "../hooks/useI18n";
import { RootStackParamList } from "../types/react-navigation";
import { CARDBLUE1, CARDPURPLE1, CARDRED1, MARGIN_HORİZONTAL } from "../utils/utils";
import { AsyncStorageSearch } from "../utils/AsyncStorage";
import api from "../api/api";
import { type ChatRoomsType } from "../types/response/response";
import { SvgUri } from "react-native-svg";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import { RootStateType } from "../store/store";

type SearchScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Search">;

export default function SearchScreen(){

    const navigation = useNavigation<SearchScreenNavigationProp>();
    const { t } = useI18n("SearchScreen");
    const i18nInterests = useI18n("interests");
    const theme = useTheme();
    const dispatch = useDispatch();
    const jwt = useSelector<RootStateType>(state => state.account.jwt);

    const [search, setSearch] = useState<string>("");
    const [isSearching, setIsSearching] = useState(true);
    const [loading, setLoading] = useState(false);
    const [chats, setChats] = useState<ChatRoomsType[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [searches, setSearches] = useState<string[]>([]);

    useEffect(() => {
        getSearches();
    }, []);

    async function getSearches() {
        const _searches = await AsyncStorageSearch.getSearches();
        setSearches(_searches);
    }

    async function handleSearch(e: string) {
        setLoading(true);
        setIsSearching(false);
        try {
            const resp = await api.get("/chat?search=" + (search || e), {
                headers: {
                    authorization: `Bearer ${jwt}`
                }
            });
            const data = resp.data.data;

            setChats(data.chats);
            setUsers(data.users);

            if(e == undefined) {
                AsyncStorageSearch.setSearches(e || search);
                setSearches(prevState => [search, ...prevState.filter((v, i) => v != search)]);

            } else {
                AsyncStorageSearch.setSearches(e || search);
                setSearches(prevState => [search, ...prevState.filter((v, i) => v!= e)]);
                setSearch(e);
            }
            
            setLoading(false);
        } catch {
            
        }
    }

    async function removeSearch(index: number) {
        setSearches(prevState => [...prevState.filter((v, i) => i != index)]);

        AsyncStorageSearch.removeItemSearches(index);
    }

    async function handleClearItems() {
        setSearches([]);
        setSearch("");
        AsyncStorageSearch.clearSearches();
    }

    const RenderLastSearched = ({item, index}:any) => {
        return(
            <Pressable onPress={() => handleSearch(item)} 
            my="12px" flexDir="row" alignItems="center" justifyContent="space-between">    
                
                <Text fontSize="16px" fontWeight="600" color="lightText">{item}</Text>
                
                <Pressable onPress={() => removeSearch(index)}>
                    <Icon as={<AntDesign name="close" size={24}/>} />
                </Pressable>
            </Pressable>
        )
    }

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
                        <FontAwesome6Icon name="people-group" color={theme.colors.white} size={24}/>        
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

    const RenderUser = ({item}: any) => {
        const { id, username, avatarUrl } = item;

        return (
            <Pressable onPress={() => navigation.navigate("UserProfile", { id })} mx="16px" >
                <View flexDir="row" alignItems="center">
                    <Avatar source={{uri: avatarUrl}} />
                    <Text ml="8px" fontSize="15px" fontWeight="500">{username}</Text>
                </View>
            </Pressable>
        )
    }

    return(
        <SafeAreaView style={[styles.safeAreaView, { backgroundColor: theme.colors.white }]}>
            
            <Header title={t("title")} style={{ marginTop: 16 }}/>
            
            <View mx="16px">
                <TextInput value={search} onChangeText={setSearch} placeholder="Ara.." onEndEditing={handleSearch} 
                onPress={() => setIsSearching(true)}/>
            </View>
            {
                loading ? (
                    <View mt="32px" alignItems="center">
                        <ActivityIndicator size="large" />
                    </View>
                ) : isSearching ? (
                    <View mt="16px" mx="16px">
        
                        <View mt="24px" style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                            <Text fontSize="18px" fontWeight="extrabold">{t("theLastSearches")}</Text>        
                            <TouchableOpacity onPress={handleClearItems}>
                                <Text fontSize="14.5px" color="primary.500" >{t("allDelete")}</Text>
                            </TouchableOpacity>
                        </View>
        
                        <View mt="16px">
                            <FlatList
                                data={searches}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={item => item}
                                renderItem={RenderLastSearched}
                            />
                        </View>
                    </View>
                ) : (
                    <View mt="16px" >
                        <FlatList
                            data={users}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ gap: 16, marginBottom: 25}}
                            keyExtractor={item => item.id.toString()}
                            renderItem={RenderUser}
                        />
                        <FlatList
                            data={chats}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ gap: 16, paddingBottom: 100}}
                            keyExtractor={item => item.id.toString()}
                            renderItem={RenderChatRoomCard}
                        />
                    </View>
                )
            }

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        paddingHorizontal: MARGIN_HORİZONTAL,
    },
    
});
