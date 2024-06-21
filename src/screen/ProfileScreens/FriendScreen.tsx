import { Avatar, FlatList, Icon, Pressable, ScrollView, Text, View } from "native-base";
import { SafeAreaView, StyleSheet } from "react-native";
import { Header } from "../../components/Header";
import { useI18n } from "../../hooks/useI18n";
import SearchInput from "../../components/input/SearchInput";
import { useState } from "react";
import { useGetFriendsQuery } from "../../store/services/userService";
import { Button } from "../../components/Button";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { BadgeIcon } from "../../components/icons/BadgeIcon";
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useSelector } from "react-redux";
import { RootStateType } from "../../store/store";

export default function FriendScreen() {
    const {t} = useI18n("FriendScreen");
    const userInfo = useSelector<RootStateType, any>(state => state.account.userInfo);
    const [search, setSearch] = useState("");
    const navigation = useNavigation<any>();

    const { data, isLoading, error } = useGetFriendsQuery(null);

    function handleRemoveFriend(id: number) {
        // Remove Api
    }

    function handleUserProfile(userId: number) {
        // navigation.navgiate("");
    }

    function handleFriendRequestScreen() {
        navigation.navigate("FriendRequest");
    }

    const FriendItem = ({ avatarUrl, username, userId, point, id }: any) => {
        return (
            <View flexDir="row" justifyContent="space-between">
                <Pressable flexDir="row" alignItems="center" onPress={() => handleUserProfile(userId)}>
                    <Avatar source={{uri: avatarUrl}} />
                    <Text fontWeight="normal" fontSize="15px" ml="8px">{username}</Text>
                </Pressable>
                <Pressable bgColor="red.500" justifyContent="center" px="10px" borderRadius="15px" py="2px"
                onPress={() => handleRemoveFriend(id)}>
                    <Icon as={<FontAwesome5 name="user-minus" />} size="20px" color="white" />
                </Pressable>
            </View>
        )
    }

    const filterFriends = 
        search.trim() == "" ? data : data.filter((v: any) => v.username.toLowerCase().includes(search.toLowerCase()));

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View marginLeft="16px" mr="16px" mt="16px">
                    <Header title={t("headerTitle")} 
                        rightIcon={<BadgeIcon icon={<FeatherIcon name="user-plus" />} count={userInfo.friendRequestCount}
                    visibleBadge={userInfo.friendRequestCount != 0}
                    onPress={handleFriendRequestScreen}  />} />
                </View>

                <View mx="16px">
                    <SearchInput placeholder={t("searchFriend")} value={search} onChangeText={setSearch} />
                </View>

                <FlatList
                    data={filterFriends || []}
                    contentContainerStyle={{ marginHorizontal: 16, gap: 16, marginTop: 24 }}
                    renderItem={({item, index}: any) => <FriendItem {...item} />}
                />

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    }
});