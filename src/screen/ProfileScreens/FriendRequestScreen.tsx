import { Avatar, FlatList, Pressable, ScrollView, Text, View, useDisclose } from "native-base";
import { SafeAreaView, StyleSheet } from "react-native";
import { Header } from "../../components/Header";
import { useI18n } from "../../hooks/useI18n";
import { useAcceptFriendRequestMutation, useGetFriendRequestsQuery, useRejectFriendRequestMutation } from "../../store/services/userService";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootStateType } from "../../store/store";

export default function FriendRequestScreen() {

    const {t} = useI18n("FriendRequestScreen");
    const navigation = useNavigation<any>();

    const { data, isLoading } = useGetFriendRequestsQuery(null);
    const [rejectFriendRequest] = useRejectFriendRequestMutation();
    const [acceptFriendRequest] = useAcceptFriendRequestMutation();

    function handleRejectFriend(id: number) {
        rejectFriendRequest(id).unwrap();
    }

    function handleAcceptFriend(id: number) {
        acceptFriendRequest(id).unwrap();
    }

    function handleUserProfile(userId: number) {
        navigation.navgiate("UserProfile", {userId});
    }

    const FriendItem = ({ avatarUrl, username, userId, point, id }: any) => {
        return (
            <View flexDir="row" justifyContent="space-between">
                <Pressable flexDir="row" alignItems="center" onPress={() => handleUserProfile(userId)}>
                    <Avatar source={{uri: avatarUrl}} />
                    <Text fontWeight="normal" maxWidth="%50" fontSize="15px" ml="8px">{username}</Text>
                </Pressable>
                <View flexDir="row">
                    <Pressable bgColor="primary.500" justifyContent="center" px="8px" borderRadius="15px" py="3px"
                    onPress={() => handleAcceptFriend(id)}>
                        <Text color="white" fontWeight="medium">{t("accept")}</Text>
                    </Pressable>
                    <Pressable bgColor="red.600" justifyContent="center" px="8px" borderRadius="15px" py="3px"
                    onPress={() => handleRejectFriend(id)} ml="4px">
                        <Text color="white" fontWeight="medium">{t("reject")}</Text>
                    </Pressable>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View marginLeft="16px">
                    <Header title={t("headerTitle")}   />
                </View>

                <FlatList
                    data={data}
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
        paddingVertical: 16,
    }
});