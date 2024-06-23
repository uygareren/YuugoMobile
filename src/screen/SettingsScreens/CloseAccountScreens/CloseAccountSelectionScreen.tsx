import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, Text, View, useTheme } from "native-base";
import { useState } from "react";
import { Dimensions, FlatList, Pressable, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { Button } from "../../../components/Button";
import { Header } from "../../../components/Header";
import TitleText from "../../../components/TitleText";
import { useI18n } from "../../../hooks/useI18n";
import { RootStackParamList } from "../../../types/react-navigation";
import { MARGIN_HORİZONTAL } from "../../../utils/utils";

type CloseAccountSelectionScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "CloseAccountSelection"
>;

export default function CloseAccountSelectionScreen() {
  const navigation = useNavigation<CloseAccountSelectionScreenNavigationProp>();
  const { t } = useI18n("CloseAccountSelectionScreen");
  const { width, height } = Dimensions.get("screen");
  const theme = useTheme();
  const dispatch = useDispatch();

  const [selectedComplaimentId, setSelectedComplaimentId] = useState("");

  const mockCompalaimentsData = [
    { id: 1, title: "Çok Fazla Reklam Var." },
    { id: 2, title: "Yavaş Yükleniyor." },
    { id: 3, title: "Kullanıcı Arayüzü Karışık." },
    { id: 4, title: "Hatalı Bildirimler." },
    { id: 5, title: "Çökmeler ve Donmalar." },
    { id: 6, title: "Üyelik İptali Sorunları." },
    { id: 7, title: "Eksik İçerik." },
    { id: 8, title: "Yanlış Bilgilendirme." },
    { id: 9, title: "Diğer." },
  ];

  function handleSelectComplaiment(id: string) {
    setSelectedComplaimentId(id);
  }

  const RenderComplaiments = ({ item }: any) => {
    return (
      <Pressable
        onPress={() => handleSelectComplaiment(item.id)}
        style={styles.complaintContainer}
      >
        <View>
          <Text style={styles.complaintTitle}>{item.title}</Text>
        </View>
        <View
          style={[
            styles.complaintCircle,
            { borderColor: theme.colors.lightBlack },
          ]}
        >
          {item.id == selectedComplaimentId ? (
            <View
              style={[
                styles.complaintCircleSelected,
                { backgroundColor: theme.colors.lightBlack },
              ]}
            />
          ) : null}
        </View>
      </Pressable>
    );
  };

  return (
    <ScrollView style={[styles.safeAreaView, { backgroundColor: theme.colors.white }]}>
      <Header title={t("title")} />

      <View style={styles.mainContent}>
        <TitleText style={styles.titleText}>{t("deleteAccountTitle")}</TitleText>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Yuugo </Text>
          <Text style={styles.infoText}>
            {t("text")}
          </Text>
        </View>

        <View bgColor="coolGray.100" style={styles.complaintsContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={mockCompalaimentsData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={RenderComplaiments}
          />
        </View>

        <Button
          title={t("continue")}
          onPress={() => navigation.navigate("CloseAccountConfirmPassword")}
          style={styles.continueButton}
          isActive={selectedComplaimentId ? true : false}
        />
        <Button
          title={t("cancel")}
          onPress={() => navigation.goBack()}
          style={[styles.cancelButton, { backgroundColor: "#a9aaab", borderColor:"#8a8a8a" }]}
          isActive={true}
        />
      </View>
    </ScrollView>
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
    marginLeft: 16,
    marginTop: 16,
  },
  infoContainer: {
    marginLeft: 16,
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
  complaintsContainer: {
    marginTop: 32,
    padding: 8,
    borderRadius: 8,
  },
  complaintContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    justifyContent: "space-between",
    marginVertical: 8,
  },
  complaintTitle: {
    fontWeight: "900",
    fontSize: 17,
  },
  complaintCircle: {
    width: 25,
    height: 25,
    borderWidth: 2.5,
    borderRadius: 360,
    alignItems: "center",
    justifyContent: "center",
  },
  complaintCircleSelected: {
    width: 12,
    height: 12,
    borderRadius: 360,
  },
  continueButton: {
    marginTop: 48,
  },
  cancelButton: {
    marginTop: 16,
    marginBottom: 48,
  },
});
