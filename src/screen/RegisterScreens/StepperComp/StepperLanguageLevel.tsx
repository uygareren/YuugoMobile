import { Text, View, theme } from "native-base";
import { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Button } from "../../../components/Button";
import { useI18n } from "../../../hooks/useI18n";
import TitleText from "../../../components/TitleText";
import { SelectCard } from "../../../components/cards/SelectCard";
import api from "../../../api/api";
import { RootStateType } from "../../../store/store";
import { useSelector } from "react-redux";

type StepperInfoProps = {
    onNext: () => void;
    selectedLanguage: number;
}

export default function StepperLanguageLevel({ onNext, selectedLanguage }: StepperInfoProps) {
    const jwt = useSelector<RootStateType>(state => state.account.jwt);
    const { t } = useI18n("RegisterSLanguageLevel");

    const [loading, setLoading] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState("");

    async function handleSaved() {
        setLoading(true);
        try {
            const resp = await api.post("/user/language", {
                languageId: selectedLanguage,
                level: selectedLevel
            }, {
                headers: {
                    authorization: `Bearer ${jwt}`
                }
            });
            setLoading(false);
            onNext();
        } catch (error) {
            setLoading(false);    
        }

    }

    const mockLanguageLevelData = [
        { 
            id:"A1",
            title:"A1"
        },
        { 
            id:"A2",
            title:"A2"
        },
        { 
            id:"B1",
            title:"B1"
        },
        { 
            id:"B2",
            title:"B2"
        },
        { 
            id:"C1",
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
