import { ScrollView, Text, View, theme } from "native-base";
import { useState } from "react";
import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import { Button } from "../../../components/Button";
import { useI18n } from "../../../hooks/useI18n";
import TitleText from "../../../components/TitleText";

type StepperInfoProps = {
    onNext: () => void;
};

type RenderTopicType = {
    item: {
        id: number;
        topicTitle: string;
    };
};

export default function StepperTopic({ onNext }: StepperInfoProps) {
    const { t } = useI18n("RegisterTopic");

    const {width, height} = Dimensions.get("screen");
    
    const [loading, setLoading] = useState(false);
    const [selectedTopics, setSelectedTopics] = useState<number[]>([]);

    function handleSaved() {
        console.log(selectedTopics);
        onNext();
    }

    // Select most 4

    const mockTopicData = [
        { id: 1, topicTitle: "Spor" },
        { id: 2, topicTitle: "Sanat" },
        { id: 3, topicTitle: "Tarih" },
        { id: 4, topicTitle: "Teknoloji" },
        { id: 5, topicTitle: "Sağlık" },
        { id: 6, topicTitle: "Edebiyat" },
        { id: 7, topicTitle: "Sinema" },
        { id: 8, topicTitle: "Müzik" },
        { id: 9, topicTitle: "Felsefe" },
        { id: 10, topicTitle: "Bilim" },
    ];

    function handleSelectTopic(id: number) {
        setSelectedTopics((prevSelectedTopics) =>
            prevSelectedTopics.includes(id)
                ? prevSelectedTopics.filter((topicId) => topicId !== id)
                : [...prevSelectedTopics, id]
        );
    }

    const RenderTopic = ({ item }: RenderTopicType) => {
        const isSelected = selectedTopics.includes(item.id);
        return (
            <TouchableOpacity
                onPress={() => handleSelectTopic(item.id)}
                style={{
                    borderWidth: 1,
                    borderBottomWidth:6,
                    padding: 12,
                    alignItems: "center",
                    width: width * 0.4,
                    justifyContent: "center",
                    borderRadius: 8,
                    margin: 8,
                    borderColor: isSelected ? "#db37ce" : "grey",
                    backgroundColor: isSelected ? "#fac5f5" : "white",
                }}
            >
                <Text style={{ fontWeight: "300", fontSize: 18, color: "black" }}>
                    {item.topicTitle}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View mx={"16px"} justifyContent="space-between" flex={1}>
            <TitleText>{t("topicTitle")}</TitleText>
            <View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={mockTopicData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={RenderTopic}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                />
            </View>
            <Button
                onPress={handleSaved}
                isActive={selectedTopics.length > 0 }
                mt="20px"
                loading={loading}
                title={t("toCountinue")}
                mb="16px"
                textStyle={{fontSize:20}}
            />
        </View>
    );
}
