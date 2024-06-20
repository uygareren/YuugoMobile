import { Actionsheet, Avatar, Badge, FlatList, Icon, Pressable, ScrollView, Text, View, useDisclose } from "native-base";
import { SafeAreaView } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import LanguageCard, { AddLanguageCard } from "../../components/cards/LanguageCard";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../store/store";
import { Button } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { getRankName, mockLanguageLevelData } from "../../utils/utils";
import { useI18n } from "../../hooks/useI18n";
import { useState } from "react";
import { accountSliceActions } from "../../store/slices/accountSlice";
import api from "../../api/api";
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { BadgeIcon } from "../../components/icons/BadgeIcon";

export default function ProfileScreen() {
    
    const userInfo = useSelector<RootStateType, any>(state => state.account.userInfo);
    const jwt = useSelector<RootStateType, any>(state => state.account.jwt);
    const navigation = useNavigation<any>();
    const dispatch = useDispatch();

    const avatarUrl = userInfo.avatarUrl;
    
    const { t } = useI18n("ProfileScreen");
    const rankI18n = useI18n("rankNames");

    const { isOpen, onOpen, onClose } = useDisclose();
    const [selectUpdateLanguage, setSelectUpdateLanguage] = useState<number | null>(null);

    // Dil güncelleme
    // Sohbet Konuşmaları Ekranı 20'şer 20'şer verileri getirt
    // Sohbet Konuşma Detayları
    
    function handleSelectLanguageLevel(id: number) {
        onOpen();
        setSelectUpdateLanguage(id);
    }

    function handleUpdateLanguageLevel(title: string) {
        const index = userInfo.languages.findIndex((v: any) => v.id == selectUpdateLanguage);
        dispatch(accountSliceActions.updateLanguage({ index, title }));
        onClose();

        api.put("/user/language/" + selectUpdateLanguage, {
            level: title
        }, {
            headers: {
                authorization: "Bearer " + jwt
            }
        });
    }

    function handleAddLanguage() {
        navigation.navigate("AddNewLanguage");
    }

    function handleAllHistoryChatScreen() {
        navigation.navigate("");
    }

    function handleSettingsScreen() {
        navigation.navigate("Settings");
    }

    function handleFriendScreen() {
        navigation.navigate("Friend");
    }
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView bgColor="white">
                <View ml="16px" mt="16px">
                    <BadgeIcon icon={<FeatherIcon name="users" />} count={userInfo.friendRequestCount}
                    visibleBadge={userInfo.friendRequestCount != 0}
                    onPress={handleFriendScreen}  />
                </View>
                
                <Icon as={<Ionicons name="settings-outline" />} right="16px" top="16px" onPress={handleSettingsScreen}
                color="gray.800" size="28px" position="absolute" alignSelf="flex-end" />

                <View width="125px" height="125px" alignSelf="center" marginTop="16px">
                    <Avatar source={{ uri: avatarUrl }} alignSelf="center" size="125px" />
                    <View position="absolute" bottom={0} right="5px">
                        <Text fontWeight="extrabold">{userInfo.point}</Text>
                    </View>
                </View>

                <View alignSelf="center" marginTop="12px" alignItems="center" my="16px">
                    <Text fontWeight="extrabold" fontSize="16px">{userInfo.name + " " + userInfo.surname}</Text>
                    
                    <Text fontWeight="normal" fontSize="15px">
                        {userInfo.username + " "} 
                    </Text>
                    <Text fontWeight="extrabold" color="primary.600" fontSize="15.5px" mt="8px">
                        {rankI18n.t(getRankName(userInfo.point))}
                        
                    </Text>
                </View>

                <Pressable onPress={() => {}} ml="16px" mb="16px" flexDir="row" alignItems="center"
                borderWidth="1px" color="gray.300" alignSelf="flex-start" padding="4px" borderRadius="10px"
                bgColor="primary.600">
                    <Icon as={<FontAwesome name="bookmark-o" />} color="white" size="28px" />
                    <Text color="white" fontWeight="bold">{t("myWords")}</Text>
                </Pressable>

                <FlatList 
                    data={[...userInfo.languages, { isAdd: true }]}
                    numColumns={2}
                    columnWrapperStyle={{ gap: 16 }}
                    contentContainerStyle={{ marginHorizontal: 16, gap: 16 }}
                    renderItem={({item, index}) => item.isAdd == true 
                        ? (<AddLanguageCard onPress={handleAddLanguage} />)
                        : (<LanguageCard {...item} edit onEdit={handleSelectLanguageLevel} />)
                    }
                />

                <View flexDir="row" justifyContent="center" marginTop="20px">
                    <Button onPress={handleAllHistoryChatScreen} title={t("historyChatBtn")} />
                </View>

                <Actionsheet isOpen={isOpen} onClose={onClose}>
                    <Actionsheet.Content>
                        {mockLanguageLevelData.map((v, i) => (
                            <Actionsheet.Item onPress={() => handleUpdateLanguageLevel(v.title)} key={i.toString()}>{v.title}</Actionsheet.Item>
                        ))}
                    </Actionsheet.Content>
                </Actionsheet>
            </ScrollView>
        </SafeAreaView>
    )
}