import { Avatar, FlatList, Icon, ScrollView, Skeleton, Text, View, useDisclose } from "native-base";
import { SafeAreaView } from "react-native";
import FeatherIcon from 'react-native-vector-icons/Feather';
import LanguageCard from "../../components/cards/LanguageCard";
import { Button } from "../../components/Button";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { getRankName } from "../../utils/utils";
import { useI18n } from "../../hooks/useI18n";
import { useGetUserProfileQuery, useRemoveFriendMutation } from "../../store/services/userService";
import { RootStackParamList } from "../../types/react-navigation";
import { BackIcon } from "../../components/BackIcon";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

type UserProfileScreenRouteProp = RouteProp<RootStackParamList, 'UserProfile'>;

export default function UserProfileScreen() {
    const navigation = useNavigation<any>()
    const route = useRoute<UserProfileScreenRouteProp>();
    const userId = route.params.id;
    
    const { data: userInfo, isLoading, error } = useGetUserProfileQuery(userId);   
    const [removeFriendAction] = useRemoveFriendMutation();

    const { t } = useI18n("ProfileScreen");
    const rankI18n = useI18n("rankNames");

    function handleAllHistoryChatScreen() {
        removeFriendAction(userInfo.friendStatus.id).unwrap();
    }

    function RenderFriendIcon({}: any) {
        const friendStatus = userInfo.friendStatus;
        
        if(friendStatus == null) {
            return (
                <Icon as={<FontAwesome5Icon name="user-plus" />} size="24px" />
            );
        }
         
                
        if(friendStatus?.status == "pending" && friendStatus._userId == userId) {
            return (
                <Icon as={<FontAwesome5Icon name="user-clock" />} size="24px" />
            );
        }
    }

    if(isLoading) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                
                <View ml="16px" mt="16px">
                    <BackIcon />
                </View>
                
                <View alignSelf="center">
                    <Skeleton size="125" rounded="full" />
                    <Skeleton h="3" width="125px" mt="12px" alignSelf="center" rounded="full" />
                    <Skeleton h="3" width="75" startColor="primary.400" mt="8px" alignSelf="center" rounded="full" />
                </View>

                <View mt="16px" flexDir="row" style={{ gap: 16 }} mx="16px">
                    <View borderWidth="1px" borderColor="coolGray.200" flex={1} alignItems="center" py="16px" borderRadius="md">
                        <Skeleton size="48px" rounded="full" />
                        <Skeleton h="3" width="100" mt="8px" alignSelf="center" rounded="full" />
                        <Skeleton h="3" width="50" mt="4px" alignSelf="center" rounded="full" />
                    </View>

                    <View borderWidth="1px" borderColor="coolGray.200" flex={1} alignItems="center" py="16px" borderRadius="md">
                        <Skeleton size="48px" rounded="full" />
                        <Skeleton h="3" width="100" mt="8px" alignSelf="center" rounded="full" />
                        <Skeleton h="3" width="50" mt="4px" alignSelf="center" rounded="full" />
                    </View>
                </View>

                <Skeleton h="48px" width="92%" mx="16px" mt="16px" borderRadius="12px" />

            </SafeAreaView>
        )
    }
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView bgColor="white">
                <View ml="16px" mt="16px">
                    {<RenderFriendIcon />}
                </View>

                <View width="125px" height="125px" alignSelf="center" marginTop="16px">
                    <Avatar source={{ uri: userInfo?.avatarUrl }} alignSelf="center" size="125px" />
                    <View position="absolute" bottom={0} right="5px">
                        <Text fontWeight="extrabold">{userInfo?.point}</Text>
                    </View>
                </View>

                <View alignSelf="center" marginTop="12px" alignItems="center" my="16px">
                    <Text fontWeight="normal" fontSize="15px">
                        {userInfo?.username + " "} 
                    </Text>
                    <Text fontWeight="extrabold" color="primary.400" fontSize="15.5px" mt="8px">
                        {rankI18n.t(getRankName(userInfo?.point))}
                    </Text>
                </View>

                <FlatList 
                    data={userInfo?.languages}
                    numColumns={2}
                    columnWrapperStyle={{ gap: 16 }}
                    contentContainerStyle={{ marginHorizontal: 16, gap: 16 }}
                    renderItem={({item, index}: any) => (<LanguageCard {...item} />)}
                />

                <View flexDir="row" justifyContent="center" marginTop="20px">
                    <Button onPress={handleAllHistoryChatScreen} title={t("historyChatBtn")} />
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}