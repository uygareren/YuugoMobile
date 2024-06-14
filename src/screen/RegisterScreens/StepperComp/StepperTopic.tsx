import { ScrollView, Text, View, theme } from "native-base";
import { useState } from "react";
import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import { Button } from "../../../components/Button";
import { useI18n } from "../../../hooks/useI18n";
import TitleText from "../../../components/TitleText";
import { SelectCard } from "../../../components/cards/SelectCard";

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

    return (
        <View mx={"16px"} justifyContent="space-between" flex={1}>
            <TitleText>{t("topicTitle")}</TitleText>
            <View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={mockTopicData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item, index}) => <SelectCard
                            isSelected={selectedTopics.includes(item.id)}
                            onPress={() => handleSelectTopic(item.id)}
                            text={item.topicTitle}
                            containerStyle={{ width: (width * 0.5) - 32 }}
                        />
                    }
                    numColumns={2}
                    contentContainerStyle={{ rowGap: 16 }}
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
