import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, View, useTheme } from "native-base";
import { useState } from "react";
import { Dimensions, FlatList, Pressable, SafeAreaView, StyleSheet } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { useDispatch } from "react-redux";
import { Header } from "../../components/Header";
import { useI18n } from "../../hooks/useI18n";
import { RootStackParamList } from "../../types/react-navigation";
import { MARGIN_HORİZONTAL } from "../../utils/utils";

type ComplaimentScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Complaiment"
>;

enum ComplaintStatus {
    PENDING = "Beklemede",
    SUBMITTED = "İletildi",
    RESOLVED = "Çözüldü"
}

const mockComplaints = [
    {
        id: 1,
        title: "Sohbet Sırasında küfür edildi",
        description: "Argo Kelime Kullanımı",
        details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        recipient: "Uygar EREN",
        statusId: ComplaintStatus.PENDING
    },
    {
        id: 2,
        title: "Uygunsuz Görüntü",
        description: "Müstehcen İçerik",
        details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        recipient: "John DOE",
        statusId: ComplaintStatus.SUBMITTED
    },
    {
        id: 3,
        title: "Hakaret İçerikli Mesaj",
        description: "Küfür ve Hakaret",
        details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        recipient: "Jane DOE",
        statusId: ComplaintStatus.RESOLVED
    }
];

export default function ComplaimentScreen() {
    const navigation = useNavigation<ComplaimentScreenNavigationProp>();
    const { t } = useI18n("ComplaimentScreen");
    const { width, height } = Dimensions.get("screen");
    const theme = useTheme();
    const dispatch = useDispatch();

    const [expandedId, setExpandedId] = useState("");

    function handleExpanded(id: string) {
        if (id == expandedId) {
            setExpandedId("")
        } else {
            setExpandedId(id)
        }
    }

    function handlePickBorderColor(statusId: string) {
        switch (statusId) {
            case ComplaintStatus.PENDING:
                return "#fcba03"
            case ComplaintStatus.SUBMITTED:
                return "#036ffc"
            case ComplaintStatus.RESOLVED:
                return "#02ad69"
            default:
                return "#000" // default case to avoid undefined
        }
    }

    function handlePickIcon(statusId: string) {
        switch (statusId) {
            case ComplaintStatus.PENDING:
                return "clock"
            case ComplaintStatus.SUBMITTED:
                return "check"
            case ComplaintStatus.RESOLVED:
                return "check-double"
            default:
                return "question-circle" // default icon to avoid undefined
        }
    }

    const RenderComplaiment = ({ item }: any) => {
        return (
            <View style={styles.complaintContainer}>
                <View style={styles.complaintHeader}>
                    <View style={styles.headerContent}>
                        <Text style={[styles.titleText, { color: theme.colors.black }]}>{item.title}</Text>
                        <Text style={[styles.descriptionText, { color: theme.colors.black }]}>{item.description}</Text>
                    </View>
                    <Pressable
                        onPress={() => handleExpanded(item.id)}
                        style={styles.iconContainer}>
                        {expandedId == item.id ? (
                            <Feather name="chevron-up" color={theme.colors.black} size={24} />
                        ) : (
                            <Feather name="chevron-down" color={theme.colors.black} size={24} />
                        )}
                    </Pressable>
                </View>

                {expandedId == item.id ? (
                    <View style={styles.complaintDetails}>
                        <Text>{item.details}</Text>
                        <View style={styles.detailsFooter}>
                            <View style={styles.detailsRecipient}>
                                <Text>{t("who")}</Text>
                                <Text style={styles.boldText}>{item.recipient}</Text>
                            </View>
                            <View style={[styles.statusContainer, { borderColor: handlePickBorderColor(item.statusId) }]}>
                                <FontAwesome6 name={handlePickIcon(item.statusId)} size={16} color={handlePickBorderColor(item.statusId)} />
                                <Text style={[styles.statusText, { color: handlePickBorderColor(item.statusId) }]}>{item.statusId}</Text>
                            </View>
                        </View>
                    </View>
                ) : null}
            </View>
        );
    }

    return (
        <SafeAreaView style={[styles.safeAreaView, { backgroundColor: theme.colors.white }]}>
            <Header title={t("title")} />
            <View>
                <FlatList
                    data={mockComplaints}
                    keyExtractor={item => item.id.toString()}
                    renderItem={RenderComplaiment}
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
    complaintContainer: {
        marginTop: 16,
    },
    complaintHeader: {
        flexDirection: "row",
        borderWidth: 0,
        paddingVertical: 12,
        paddingHorizontal: 12,
        justifyContent: "space-between",
        borderRadius: 8,
        backgroundColor: "#f0fbfc",
    },
    headerContent: {
        borderWidth: 0,
        width: Dimensions.get("screen").width * 0.8,
        paddingHorizontal: 8,
    },
    titleText: {
        fontSize: 18,
        fontWeight: "800",
    },
    descriptionText: {
        fontSize: 14,
        fontWeight: "500",
        marginTop: 6,
    },
    iconContainer: {
        borderWidth: 0,
        alignItems: "center",
        justifyContent: "flex-start",
        borderRadius: 8,
    },
    complaintDetails: {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        backgroundColor: "#f0fbfc",
        paddingHorizontal: 12,
        paddingBottom: 12,
    },
    detailsFooter: {
        flexDirection: "row",
        marginTop: 16,
        justifyContent: "space-between",
    },
    detailsRecipient: {
        flexDirection: "row",
    },
    boldText: {
        fontWeight: "800",
        marginLeft: 6,
    },
    statusContainer: {
        borderWidth: 1.5,
        borderBottomWidth: 3.5,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    statusText: {
        fontWeight: "800",
        marginLeft: 6,
    },
});
