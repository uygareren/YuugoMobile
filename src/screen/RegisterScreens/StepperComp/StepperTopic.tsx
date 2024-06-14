import { ScrollView, Text, View, theme } from "native-base";
import { useState } from "react";
import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import { Button } from "../../../components/Button";
import { useI18n } from "../../../hooks/useI18n";

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
        { id: 11, topicTitle: "Gezi" },
        { id: 12, topicTitle: "Doğa" },
        { id: 13, topicTitle: "Eğitim" },
        { id: 14, topicTitle: "Moda" },
        { id: 15, topicTitle: "Yemek" },
        { id: 16, topicTitle: "Tasarım" },
        { id: 17, topicTitle: "Ekonomi" },
        { id: 18, topicTitle: "Siyaset" },
        { id: 19, topicTitle: "Kültür" },
        { id: 20, topicTitle: "Psikoloji" },
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
        <ScrollView mx={"16px"} showsVerticalScrollIndicator={false}>
            <View mt="28px">
                <Text
                    style={{
                        fontWeight: "800",
                        color: theme.colors.black,
                        fontSize: 22,
                        marginLeft: 6,
                    }}
                >
                    {t("topicTitle")}
                </Text>
                
                <View style={{height:height*0.55, marginTop:32}}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={mockTopicData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={RenderTopic}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: "space-between" }}
                    />
                </View>
                

                <View style={{marginTop:32}}>
                    <Button
                        onPress={handleSaved}
                        isActive={selectedTopics.length > 0 }
                        mt="20px"
                        loading={loading}
                        title={t("toCountinue")}
                        mb="8px"
                        textStyle={{fontSize:20}}
                    />
                </View>
            </View>
        </ScrollView>
    );
}
