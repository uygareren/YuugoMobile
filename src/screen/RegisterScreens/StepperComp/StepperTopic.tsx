import { View } from "native-base";
import { useEffect, useState } from "react";
import { Dimensions, FlatList } from "react-native";
import { Button } from "../../../components/Button";
import { useI18n } from "../../../hooks/useI18n";
import TitleText from "../../../components/TitleText";
import { SelectCard } from "../../../components/cards/SelectCard";
import api from "../../../api/api";
import { RootStateType } from "../../../store/store";
import { useSelector } from "react-redux";

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
    const i18nInterests = useI18n("interests");
    const jwt = useSelector<RootStateType>(state => state.account.jwt);

    const {width, height} = Dimensions.get("screen");
    
    const [loading, setLoading] = useState(false);
    const [selectedTopics, setSelectedTopics] = useState<number[]>([]);
    const [topics, setTopics] = useState<{id: number, name: string}[]>([]);

    async function handleSaved() {
        setLoading(true);
        try {
            const resp = await api.post("/user/interests", {
                interests: selectedTopics
            }, {
                headers: {
                    authorization: "Bearer " + jwt
                }
            });
            setLoading(false);
            onNext();
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    useEffect(() => {
        init();
    }, []);

    async function init() {
        const resp = await api.get("/user/interests/type?lang=tr");

        setTopics(resp.data.data);
    }


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
            
            <FlatList
                showsVerticalScrollIndicator={false}
                data={topics}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item, index}) => <SelectCard
                        isSelected={selectedTopics.includes(item.id)}
                        onPress={() => handleSelectTopic(item.id)}
                        text={i18nInterests.t(item.name)}
                        containerStyle={{ width: (width * 0.5) - 32, height: width * 0.25, alignItems: "center" }}
                    />
                }
                numColumns={2}
                contentContainerStyle={{ rowGap: 16, marginTop: 28 }}
                columnWrapperStyle={{ justifyContent: "space-between" }}
            />
            <Button
                onPress={handleSaved}
                isActive={selectedTopics.length > 0 }
                mt="20px"
                loading={loading}
                title={t("toCountinue")}
                mb="16px"
            />
        </View>
    );
}
