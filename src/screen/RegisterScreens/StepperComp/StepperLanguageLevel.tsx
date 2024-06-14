import { Text, View, theme } from "native-base";
import { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Button } from "../../../components/Button";
import { useI18n } from "../../../hooks/useI18n";
import TitleText from "../../../components/TitleText";

type StepperInfoProps = {
    onNext: () => void
}

type RenderLanguageLevelType = {
    item : {
        id: string,
        title: string
    }
    
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

    const RenderLanguageLevel = ({item}:RenderLanguageLevelType) => {
        console.log("item", item);
        return(
            <TouchableOpacity onPress={() => handleSelectLanguageLevel(item.id)} 
            style={{
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 16,
                borderBottomWidth: 6,
                borderColor: item.id == selectedLevel ? "#db37ce" : "gray",
                backgroundColor: item.id == selectedLevel ? "#fac5f5" : "white",
                borderRadius: 8,
                marginTop: 16
            }}
            >
                <Text style={{ fontWeight: "600", fontSize: 18 }}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

   

    return (
        <View mx={"16px"}>
            <TitleText>{t("languageLevel")}</TitleText>
            <View mt="28px">
                
                <FlatList
                    data={mockLanguageLevelData}
                    keyExtractor={(item) => item.id}
                    renderItem={RenderLanguageLevel}
                />

                <View style={{marginTop:32}}>
                    <Button
                        onPress={handleSaved as () => void}
                        isActive={selectedLevel ? true : false}
                        mt="20px"
                        loading={loading}
                        title={t("toCountinue")}
                        mb="8px"
                        textStyle={{fontSize:20}}

                    />
                </View>
            </View>
        </View>
    )
}
