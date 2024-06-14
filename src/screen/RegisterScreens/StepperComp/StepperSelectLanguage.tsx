import { Text, View, theme } from "native-base";
import { useState } from "react";
import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import { Button } from "../../../components/Button";
import { useI18n } from "../../../hooks/useI18n";
import TitleText from "../../../components/TitleText";
import { SelectCard } from "../../../components/cards/SelectCard";

type StepperInfoProps = {
    onNext: () => void
}

export default function StepperSelectLanguage({ onNext }: StepperInfoProps) {
    const { t } = useI18n("RegisterSelectLanguage");
    const [loading, setLoading] = useState(false);

    const [selectedCountry, setSelectedCountry] = useState<number | null>(null);

    const mockLanguageData = [
        { id: 1, title: "Turkish" },
        { id: 2, title: "English" },
        { id: 3, title: "German" },
        { id: 4, title: "French" },  
    ];

    function handleSaved(values: any) {
        onNext();
    }

    function handleSelectCountry(id:number){
        if(selectedCountry == id){
            setSelectedCountry(null);
        }else{
            setSelectedCountry(id);
        }
    }

    return (
        <View mx={"16px"} flex={1} justifyContent="space-between">
            <TitleText>{t("selectLanguage")}</TitleText>
    
            <FlatList
                showsVerticalScrollIndicator={false}
                data={mockLanguageData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item, index}) => (
                    <SelectCard
                        isSelected={item.id == selectedCountry}
                        text={item.title}
                        onPress={() => handleSelectCountry(item.id)}
                    />
                )}
                contentContainerStyle={{ rowGap: 16, marginTop: 28 }}
            />
        
            <Button
                onPress={handleSaved as () => void}
                isActive={selectedCountry ? true : false}
                mt="20px"
                loading={loading}
                title={t("toCountinue")}
                mb="16px"
                textStyle={{fontSize:20}}
            />
        </View>
    )
}
