import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, useTheme } from "native-base";
import { Dimensions, SafeAreaView, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { Header } from "../../components/Header";
import { useI18n } from "../../hooks/useI18n";
import { RootStackParamList } from "../../types/react-navigation";
import { MARGIN_HORİZONTAL } from "../../utils/utils";

type BlockedScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Blocked"
>;

export default function BlockedScreen(){

    const navigation = useNavigation<BlockedScreenNavigationProp>();
    const { t } = useI18n("BlockedScreen");
    const { width, height } = Dimensions.get("screen");
    const theme = useTheme();
    const dispatch = useDispatch();

    return(
        <SafeAreaView style={[styles.safeAreaView, { backgroundColor: theme.colors.white }]}>
            <Header title={t("title")}/>
            <View mt="16px">

            </View>

        </SafeAreaView>
    )   
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        paddingHorizontal: MARGIN_HORİZONTAL,
    },
})