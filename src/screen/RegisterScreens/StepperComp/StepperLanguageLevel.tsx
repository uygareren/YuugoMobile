import { Text, View, theme } from "native-base";
import { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Button } from "../../../components/Button";
import { useI18n } from "../../../hooks/useI18n";
import TitleText from "../../../components/TitleText";
import { SelectCard } from "../../../components/cards/SelectCard";

type StepperInfoProps = {
    onNext: () => void
}

export default function StepperLanguageLevel({ onNext }: StepperInfoProps) {
    const { t } = useI18n("RegisterSLanguageLevel");

    const [loading, setLoading] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState("");

    function handleSaved(values: any) {
        console.log(values);
        onNext();
    }

    const mockLanguageLevelData = [
        { 
            id:"1",
            title:"A1"
        },
        { 
            id:"2",
            title:"A2"
        },
        { 
            id:"3",
            title:"B1"
        },
        { 
            id:"4",
            title:"B2"
        },
        { 
            id:"5",
            title:"C1"
        },
    ]

    function handleSelectLanguageLevel(id:string){

        if(id == selectedLevel){
            setSelectedLevel("")
        }else{
            setSelectedLevel(id);
        }

    }

    return (
        <View mx={"16px"} flex={1} justifyContent="space-between">
            <TitleText>{t("languageLevel")}</TitleText>    
            <FlatList
                data={mockLanguageLevelData}
                keyExtractor={(item) => item.id}
                renderItem={({item, index}) => (
                    <SelectCard
                        isSelected={item.id == selectedLevel}
                        text={item.title}
                        onPress={() => handleSelectLanguageLevel(item.id)}
                    />
                )}
                contentContainerStyle={{ rowGap: 16, marginTop: 28 }}
            />
            <Button
                onPress={handleSaved as () => void}
                isActive={selectedLevel ? true : false}
                mt="20px"
                loading={loading}
                title={t("toCountinue")}
                mb="16px"
                textStyle={{fontSize:20}}

            />
        </View>
    )
}
