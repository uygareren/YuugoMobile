import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, View, useTheme } from "native-base";
import { useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { Button } from "../../../components/Button";
import { Header } from "../../../components/Header";
import TitleText from "../../../components/TitleText";
import PasswordInput from "../../../components/input/PasswordInput";
import { useI18n } from "../../../hooks/useI18n";
import { RootStackParamList } from "../../../types/react-navigation";
import { MARGIN_HORİZONTAL } from "../../../utils/utils";

type CloseAccountConfirmPasswordScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "CloseAccountConfirmPassword"
>;

export default function CloseAccountConfirmPasswordScreen(){

    const navigation = useNavigation<CloseAccountConfirmPasswordScreenNavigationProp>();
    const { t } = useI18n("CloseAccountConfirmPasswordScreen");
    const { width, height } = Dimensions.get("screen");
    const theme = useTheme();
    const dispatch = useDispatch();

    const [password, setPassword] = useState("");

    return(
        <SafeAreaView style={[styles.safeAreaView, { backgroundColor: theme.colors.white }]}>
            <Header title={t("title")} />

            <View mt="16px">
                <TitleText>{t("confirmPassword")}</TitleText>

                <View mt="16px">
                  <Text>{t("text")}</Text>
                </View>

                <View mt="32px">
                    <PasswordInput value={password} onChangeText={setPassword}
                       placeholder={"Parola"} />
                </View>

                <View mt="16px">
                <Button
                    title={t("continue")}
                    onPress={() => navigation.navigate("CloseAccountConfirm")}
                    style={styles.continueButton}
                    isActive={password.length> 6 ? true : false}
                    />
                    <Button
                    title={t("cancel")}
                    onPress={() => navigation.goBack()}
                    style={[styles.cancelButton, { backgroundColor: theme.colors.lightText }]}
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