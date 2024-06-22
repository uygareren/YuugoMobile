import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, View, useTheme } from "native-base";
import { Dimensions, SafeAreaView, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { Button } from "../../../components/Button";
import { Header } from "../../../components/Header";
import TitleText from "../../../components/TitleText";
import { useI18n } from "../../../hooks/useI18n";
import { RootStackParamList } from "../../../types/react-navigation";
import { MARGIN_HORİZONTAL } from "../../../utils/utils";

type CloseAccountConfirmScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "CloseAccountConfirm"
>;

export default function CloseAccountConfirmScreen(){

    const navigation = useNavigation<CloseAccountConfirmScreenNavigationProp>();
    const { t } = useI18n("CloseAccountConfirmScreen");
    const { width, height } = Dimensions.get("screen");
    const theme = useTheme();
    const dispatch = useDispatch();

    return(
        <SafeAreaView style={[styles.safeAreaView, { backgroundColor: theme.colors.white }]}>
            <Header title={t("title")} />

            <View mt="16px">
                <TitleText>{t("deleteAccount")}</TitleText>

                <View mt="16px">
                    <Text>{t("text")}</Text>
                </View>

                <View mt="16px">
                <Button
                    title={t("deleteAccountBtn")}
                    onPress={() => console.log("asda")}
                    style={styles.continueButton}
                    isActive={ true}
                    />
                    <Button
                    title={t("cancel")}
                    onPress={() => navigation.goBack()}
                    style={[styles.cancelButton, { backgroundColor: "#a9aaab", borderColor:"#8a8a8a" }]}
                    isActive={true}
                    />
                </View>

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
      flex: 1,
      paddingHorizontal: MARGIN_HORİZONTAL,
    },
    continueButton: {
        marginTop: 48,
      },
      cancelButton: {
        marginTop: 16,
        marginBottom: 48,
      },
})