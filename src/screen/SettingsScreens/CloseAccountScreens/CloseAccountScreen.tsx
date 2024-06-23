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

type CloseAccountScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "CloseAccount"
>;

export default function CloseAccountScreen() {
  const navigation = useNavigation<CloseAccountScreenNavigationProp>();
  const { t } = useI18n("CloseAccountScreen");
  const { width } = Dimensions.get("screen");
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={[styles.safeAreaView, { backgroundColor: theme.colors.white }]}>
      <Header title={t("title")} />

      <View  style={styles.mainContent}>
        <TitleText style={styles.titleText}>{t("askTitle")}</TitleText>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Yuugo </Text>
          <Text style={styles.infoText}>
            {t("text")}
          </Text>
        </View>

        <Button
          title={t("continue")}
          onPress={() => navigation.navigate("CloseAccountSelection")}
          style={styles.continueButton}
          isActive={true}
        />
        <Button
          title={t("cancel")}
          onPress={() => navigation.goBack()}
          style={[styles.cancelButton, { backgroundColor: "#a9aaab", borderColor:"#8a8a8a" }]}
          isActive={true}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    paddingHorizontal: MARGIN_HORİZONTAL,
  },
  mainContent: {
    marginTop: 16,
  },
  titleText: {
    marginTop: 16,
  },
  infoContainer: {
    marginTop: 32,
    flexDirection: "row",
    borderWidth: 0,
    flexWrap: "wrap",
  },
  infoTitle: {
    fontWeight: "900",
    fontSize: 16,
  },
  infoText: {
    fontSize: 18,
    fontWeight:"600"
  },
  continueButton: {
    marginTop: 48,
  },
  cancelButton: {
    marginTop: 16,
  },
});
