import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Actionsheet, Avatar, Icon, ScrollView, Text, View, useDisclose, useTheme } from "native-base";
import { useState } from "react";
import { Dimensions, FlatList, Image, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { SvgUri } from "react-native-svg";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { useI18n } from "../hooks/useI18n";
import { RootStackParamList } from "../types/react-navigation";
import { BLUE1, BLUE2, CARDRED1, CARDRED2, MARGIN_HORİZONTAL } from "../utils/utils";


type RoomDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Explore">;


export default function RoomDetailScreen() {

    const navigation = useNavigation<RoomDetailScreenNavigationProp>();
    const { t } = useI18n("AccountScreen");
    const { width, height } = Dimensions.get("screen");
    const theme = useTheme();
    const dispatch = useDispatch();
    
    const [tab, setTab] = useState(0);
    const [isUserSheetVisible, setIsUserSheetVisible] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclose(false);

    const mockUserData = [
        {
            id: "1",
            name: "User 1",
            avatar: "../../assets/images/bird.jpeg",
            isAdmin: true,
        },
        {
            id: 2,
            name: "User 2",
            avatar: "../../assets/images/bird.jpeg",
            isAdmin: false,
        },
        {
            id: 3,
            name: "User 3",
            avatar: "../../assets/images/bird.jpeg",
            isAdmin: false,
        },
        {
            id: 3,
            name: "User 4",
            avatar: "../../assets/images/bird.jpeg",
            isAdmin: false
        },
    ]

    const inviteStatus = (status: string) => {
        switch (status) {
            case "pending":
                return (<Icon as={<MaterialCommunityIcons name="circle-slice-7" />} size="24px" color="primary.500" />)
            case "accepted":
                return (<Icon as={<MaterialCommunityIcons name="check-circle" />} size="24px" color="success.700" />)
            case "rejected":
                <Icon as={<MaterialCommunityIcons name="close-circle" />} size="24px" color="danger.700" />
            default: 
                return "";
        }
    }

    const RenderUser = ({ item }: any) => {
        return (
            <TouchableOpacity onPress={() => setIsUserSheetVisible(true)}
                style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View flexDir="row" alignItems="center">
                    <Avatar size="45px" source={{uri: "https://i.pinimg.com/236x/b2/7f/0e/b27f0e466185ac66a461551f09aaa925.jpg"}} />
                    <View ml="8px">
                        <Text fontWeight="medium" fontSize="15px">{item.name}</Text>
                        {item.isAdmin ? (
                        <View borderWidth="1px" borderBottomWidth="3px" borderTopWidth="1px" borderColor="primary.500"
                        py="2px" px="4px" borderRadius="8px" bgColor="white">
                            <Text fontSize="10.5px" color="primary.500" textTransform="capitalize">Admin</Text>
                        </View>
                    ) : null}

                    </View>
                    
                </View>
                <View flexDir="row">
                    <View borderWidth="1px" borderBottomWidth="3px" borderTopWidth="1px" borderColor={BLUE1}
                    py="2px" px="4px" borderRadius="8px" alignSelf="flex-start" bgColor={BLUE2}>
                        <Text fontSize="12.5px" fontWeight="extrabold" color="white" textTransform="capitalize">Beginner</Text>
                    </View>
                    <Icon as={<MaterialCommunityIcons name="dots-vertical" />} size="28px" />
                </View>
            </TouchableOpacity>
        )
    }

    const RenderInvitedUser = ({ item }: any) => {
        return (
            <TouchableOpacity onPress={() => setIsUserSheetVisible(true)}
                style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View flexDir="row" alignItems="center">
                    <Avatar size="45px" source={{uri: "https://i.pinimg.com/236x/b2/7f/0e/b27f0e466185ac66a461551f09aaa925.jpg"}} />
                    <View ml="8px">
                        <Text fontWeight="medium" fontSize="15px">{item.name}</Text>
                        {item.isAdmin ? (
                        <View borderWidth="1px" borderBottomWidth="3px" borderTopWidth="1px" borderColor="primary.500"
                        py="2px" px="4px" borderRadius="8px" bgColor="white">
                            <Text fontSize="10.5px" color="primary.500" textTransform="capitalize">Admin</Text>
                        </View>
                    ) : null}

                    </View>
                    
                </View>
                {inviteStatus("accepted")}
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={[styles.safeAreaView, { backgroundColor: theme.colors.white }]}>
            <ScrollView>
                <Header title={"Asikus's Room"} style={{ marginTop: 16 }} />
                <View mr="16px" position={"absolute"} right="0" marginTop="16px">
                    <SvgUri uri={"https://hatscripts.github.io/circle-flags/flags/tr.svg"} width="32px" height="32" />
                </View>

                <View mx="16px">
                    <Text mb="16px" fontWeight="extrabold" fontSize="17px">Konu Başlığı</Text>
                    <View borderWidth="1px" borderBottomWidth="3px" borderTopWidth="1px" borderColor={BLUE1}
                    py="2px" px="4px" borderRadius="8px" alignSelf="flex-start" bgColor={BLUE2}>
                        <Text fontSize="12.5px" fontWeight="extrabold" color="white" textTransform="capitalize">Beginner</Text>
                    </View>

                    <Text numberOfLines={3} ellipsizeMode="tail" mt="12px" fontSize="13.5px" >
                        Lorem ipsum dolor sit amet, consectetur adipisc elit. Nulla erat felis, imperdiet quis mauris a, sempe fermentum ante. Aliquam vitae ultricies sapien. Suspendisse accumsan, libero a varius tincidunt, odio dui finibus enim, sed faucibus velit enim et elit. Pellentesque vehicula rhoncus mauris eleifend molestie.
                    </Text>
        
                    <View my="16px" flexDir="row" alignItems="center">
                        <Icon mr="8px" as={<AntDesign name="clockcircleo" color={theme.colors.white} size={24}/>} />
                        <Text fontSize="15px" fontWeight="bold">30 Dakika</Text>
                    </View>
                </View>

                <View mb="16px" flexDir="row" justifyContent="space-between" mx="16px" style={{ gap: 5 }} >
                    <TouchableOpacity onPress={() => setTab(0)}
                    style={{...styles.tabBarTitleContainer, borderColor: tab == 0 ? theme.colors.primary[400] : undefined}}>
                        <Text color={tab == 0 ? "primary.500" : undefined}>KATILIMCILAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setTab(1)}
                    style={{...styles.tabBarTitleContainer, borderColor: tab == 1 ? theme.colors.primary[400] : undefined}}>
                        <Text color={tab == 1 ? "primary.500" : undefined}>DAVETLİLER</Text>
                    </TouchableOpacity>
                </View>

                <View mx="16px" mb="16px">
                    {tab == 0 ? (
                        <View>
                            <Text>4 / 5</Text>
                            <FlatList 
                                data={mockUserData}
                                contentContainerStyle={{ gap: 16, marginTop: 8 }}
                                renderItem={RenderUser}
                            />    
                        </View>
                    ) : (
                        <View>
                            <FlatList 
                                data={[
                                    { name: "user1", id: 1 }
                                ]}
                                contentContainerStyle={{ gap: 16 }}
                                renderItem={RenderInvitedUser}
                            />
                        </View>
                    )}
                    
                </View>

                <Button title="SOHBETİ BAŞLAT" onPress={() => console.log("asd")} ml="16px" mr="16px" />

                <Actionsheet isOpen={isUserSheetVisible} onClose={() => setIsUserSheetVisible(false)}>
                    <Actionsheet.Content>
                        <Actionsheet.Item >
                            <View flexDir="row" justifyContent="space-between" >
                                
                                <Avatar source={{uri: "https://i.pinimg.com/236x/b2/7f/0e/b27f0e466185ac66a461551f09aaa925.jpg"}} />
                                <View style={{ marginLeft: 12 }}>
                                    <Text style={{ fontSize: 16, fontWeight: "400", color: theme.colors.black }}>Name Surname 🇹🇷</Text>
                                    <Text style={{ fontSize: 14.5, fontWeight: "900", }}>username</Text>
                                </View>
                            
                            </View>
                            <View borderWidth="1px" borderBottomWidth="3px" borderTopWidth="1px" borderColor={BLUE1} mt="12px"
                                py="2px" px="4px" borderRadius="8px" alignSelf="flex-start" bgColor={BLUE2}>
                                    <Text fontSize="12.5px" fontWeight="extrabold" color="white" textTransform="capitalize">Beginner</Text>
                                </View>
                            <View mt="24px" style={{
                                flexDirection: "row", alignItems: "center",
                                paddingHorizontal: 12
                            }}>
                                <Text style={{ fontWeight: "900", }}>YG</Text>        
                                <Text style={{ marginLeft: 8, fontSize: 18, fontWeight: "400", color: "black" }}>1140 </Text>
                            </View>


                        </Actionsheet.Item>
                    </Actionsheet.Content>
                </Actionsheet>

                <Actionsheet isOpen={isOpen} onClose={onClose}>
                    <Actionsheet.Content>
                        <Actionsheet.Item >
                            <Text fontSize="16px">Yetki Ver</Text>
                        </Actionsheet.Item>
                        <Actionsheet.Item >
                            <Text fontSize="16px">Profiline Git</Text>
                        </Actionsheet.Item>
                        <Actionsheet.Item >
                            <Text fontSize="16px" color="danger.500">Şikayet Et</Text>
                        </Actionsheet.Item>
                        <Actionsheet.Item >
                            <Text fontSize="16px" color="danger.500">Odadan At</Text>
                        </Actionsheet.Item>
                    </Actionsheet.Content>
                </Actionsheet>
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        paddingHorizontal: MARGIN_HORİZONTAL,
    },
    tabBarTitleContainer: {
        alignItems: "center",
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderRadius: 5,
        borderColor: "#a9a9a9",
        flex: 1,
    }
});