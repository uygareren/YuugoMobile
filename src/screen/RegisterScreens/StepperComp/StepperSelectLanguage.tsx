import { Text, View, theme } from "native-base";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import { Button } from "../../../components/Button";
import { useI18n } from "../../../hooks/useI18n";
import TitleText from "../../../components/TitleText";
import { SelectCard } from "../../../components/cards/SelectCard";
import api from "../../../api/api";

type StepperInfoProps = {
    onNext: () => void
}

export default function StepperSelectLanguage({ onNext }: StepperInfoProps) {
    const { t } = useI18n("RegisterSelectLanguage");
    const [loading, setLoading] = useState(false);
    const [languages, setLanguages] = useState<{id: number, languageName: string}[]>([]);

    const [selectedLanguage, setSelectedLangauge] = useState<number | null>(null);

    useEffect(() => {
        init();
    }, []);

    async function init() {
        const resp = await api.get("/user/language");

        setLanguages(resp.data.data);
    }

    function handleSaved(values: any) {
        onNext();
    }

    function handleSelectLangauge(id:number){
        if(selectedLanguage == id){
            setSelectedLangauge(null);
        }else{
            setSelectedLangauge(id);
        }
    }

    return (
        <View mx={"16px"} flex={1} justifyContent="space-between">
            <TitleText>{t("selectLanguage")}</TitleText>
    
            <FlatList
                showsVerticalScrollIndicator={false}
                data={languages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item, index}) => (
                    <SelectCard
                        isSelected={item.id == selectedLanguage}
                        text={item.languageName}
                        onPress={() => handleSelectLangauge(item.id)}
                    />
                )}
                contentContainerStyle={{ rowGap: 16, marginTop: 28 }}
            />
        
            <Button
                onPress={handleSaved as () => void}
                isActive={selectedLanguage ? true : false}
                mt="20px"
                loading={loading}
                title={t("toCountinue")}
                mb="16px"
                textStyle={{fontSize:20}}
            />
        </View>
    )
}
