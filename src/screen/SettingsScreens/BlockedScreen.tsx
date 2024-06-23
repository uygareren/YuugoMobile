import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Avatar, Text, View, useTheme } from "native-base";
import { Dimensions, FlatList, Image, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "../../components/Header";
import { useI18n } from "../../hooks/useI18n";
import { RootStackParamList } from "../../types/react-navigation";
import { LIGHT_RED, MARGIN_HORİZONTAL } from "../../utils/utils";
import { useEffect, useState } from "react";
import api from "../../api/api";
import { RootStateType } from "../../store/store";

type BlockedScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Blocked"
>;

export default function BlockedScreen() {
    const { t } = useI18n("BlockedScreen");
    const jwt = useSelector<RootStateType>(state => state.account.jwt);
    const theme = useTheme();
    const [blockeds, setBlockeds] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            const resp = await api.get("/block", {
                headers: {
                    authorization: `Bearer ${jwt}`
                }
            });

            setBlockeds(resp.data.data);
        } catch {
            
        }
    }

    async function handleRemoveBlock(id: number) {
        try {
            api.delete("/block/" + id, {
                headers: {
                    authorization: `Bearer ${jwt}`
                }
            });

            setBlockeds(prevState => prevState.filter((v: any) => v.id != id));
        } catch {
            
        }
    }

    const RenderBlocked = ({ item }: any) => {
        return (
            <View flexDir="row" alignItems="center" justifyContent="space-between">
                <View flexDir="row" alignItems="center">
                    <Avatar source={item.image} />
                    <Text fontWeight="normal" fontSize="15px" ml="8px">{item.username}</Text>    
                </View>

                <TouchableOpacity style={{...styles.unblockButton, borderColor: theme.colors.coolGray[500]}}
                onPress={() => handleRemoveBlock(item.id)}>
                    <Text fontSize="13px" fontWeight="semibold">{t("removeBlock")}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={[styles.safeAreaView, { backgroundColor: theme.colors.white }]}>
            <Header title={t("title")} />
            <View>
                <FlatList
                    data={blockeds}
                    contentContainerStyle={{ gap: 16, marginHorizontal: 16 }}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item: any) => item.id.toString()}
                    renderItem={RenderBlocked}
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
    }
});