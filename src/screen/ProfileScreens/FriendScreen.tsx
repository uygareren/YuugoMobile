import { AlertDialog, Avatar, Button, FlatList, Icon, Pressable, ScrollView, Text, View, useDisclose } from "native-base";
import { SafeAreaView, StyleSheet } from "react-native";
import { Header } from "../../components/Header";
import { useI18n } from "../../hooks/useI18n";
import SearchInput from "../../components/input/SearchInput";
import { useRef, useState } from "react";
import { useGetFriendsQuery, useRemoveFriendMutation } from "../../store/services/userService";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { BadgeIcon } from "../../components/icons/BadgeIcon";
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useSelector } from "react-redux";
import { RootStateType } from "../../store/store";

export default function FriendScreen() {
    const { t } = useI18n("FriendScreen");
    const userInfo = useSelector<RootStateType, any>(state => state.account.userInfo);
    const [search, setSearch] = useState("");
    const navigation = useNavigation<any>();

    const { data, isLoading, error } = useGetFriendsQuery(null);
    const [removeFriendAction] = useRemoveFriendMutation();
    const { isOpen, onClose, onOpen } = useDisclose();
    const [selectedRemove, setSelectedRemove] = useState(0);

    const cancelRef = useRef(null);

    function handleRemoveFriend() {
        onClose();
        removeFriendAction(selectedRemove).unwrap();
    }

    function handleRemoveFriendAlert(id: number) {
        setSelectedRemove(id);
        onOpen();
    }

    function handleUserProfile(userId: number) {
        navigation.navigate("UserProfile", {
            id: userId
        });
    }

    function handleFriendRequestScreen() {
        navigation.navigate("FriendRequest");
    }

    const FriendItem = ({ avatarUrl, username, userId, point, id }: any) => {
        return (
            <View flexDir="row" justifyContent="space-between">
                <Pressable flexDir="row" alignItems="center" onPress={() => handleUserProfile(userId)}>
                    <Avatar source={{ uri: avatarUrl }} />
                    <Text fontWeight="normal" fontSize="15px" ml="8px">{username}</Text>
                </Pressable>
                <Pressable bgColor="red.500" justifyContent="center" px="10px" borderRadius="15px" py="2px"
                    onPress={() => handleRemoveFriendAlert(id)}>
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
                <View mt="16px">
                    <Header title={t("headerTitle")}
                        rightIcon={<BadgeIcon icon={<FeatherIcon name="users" />} count={userInfo.friendRequestCount}
                            visibleBadge={userInfo.friendRequestCount != 0}
                            onPress={handleFriendRequestScreen} />} />
                </View>

                <View mx="16px">
                    <SearchInput placeholder={t("searchFriend")} value={search} onChangeText={setSearch} />
                </View>

                <FlatList
                    data={filterFriends || []}
                    contentContainerStyle={{ marginHorizontal: 16, gap: 16, marginTop: 24 }}
                    renderItem={({ item, index }: any) => <FriendItem {...item} />}
                />

                <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                    <AlertDialog.Content>
                        <AlertDialog.CloseButton />
                        <AlertDialog.Header>{t("dialogTitle")}</AlertDialog.Header>
                        <AlertDialog.Body>
                            {t("dialogBody")}
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button.Group space={2}>
                                <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                                {t("cancel")}
                                </Button>
                                <Button colorScheme="danger" onPress={handleRemoveFriend}>
                                {t("yes")}
                                </Button>
                            </Button.Group>
                        </AlertDialog.Footer>
                    </AlertDialog.Content>
                </AlertDialog>
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