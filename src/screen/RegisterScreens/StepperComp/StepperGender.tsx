import { Text, View, theme } from "native-base";
import { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Button } from "../../../components/Button";
import { useI18n } from "../../../hooks/useI18n";

type StepperInfoProps = {
    onNext: () => void
}

type RenderLanguageLevelType = {
    item : {
        id: string,
        title: string
    }
    
}


export default function StepperGender({ onNext }: StepperInfoProps) {
    const { t } = useI18n("RegisterGender");
    const [loading, setLoading] = useState(false);

    const [selectedGender, setSelectedGender] = useState("");

    function handleSaved(values: any) {
        console.log(values);
        onNext();
    }

    const mockGenderData = [
        { 
            id:"1",
            title:"Erkek"
        },
        { 
            id:"2",
            title:"Kadın"
        },
        

    ]

    function handleSelectLanguageLevel(id:string){

        if(id == selectedGender){
            setSelectedGender("")
        }else{
            setSelectedGender(id);
        }

    }

    const RenderLanguageLevel = ({ item }: RenderLanguageLevelType) => {
        console.log("item", item);
        return (
            <TouchableOpacity
                onPress={() => handleSelectLanguageLevel(item.id)}
                style={{
                    borderWidth: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 16,
                    borderBottomWidth: 6,
                    borderColor: item.id == selectedGender ? "#db37ce" : "gray",
                    backgroundColor: item.id == selectedGender ? "#fac5f5" : "white",
                    borderRadius: 8,
                    marginTop: 16
                }}
            >
                <Text style={{ fontWeight: "600", fontSize: 18 }}>{item.title}</Text>
            </TouchableOpacity>
        );
    };
    
   

    return (
        <View mx={"16px"}>
            <View mt="28px">
               
                <View mt="28px">
                    <View style={{ rowGap: 12 }}>
                        <Text style={{fontWeight:"800", color:theme.colors.black, fontSize:22, marginLeft:6}}>
                            {t("genderTitle")}
                        </Text>

                        <FlatList
                            data={mockGenderData}
                            keyExtractor={(item) => item.id}
                            renderItem={RenderLanguageLevel}
                        />
                        
                        
                    </View>
                    <Button
                        onPress={handleSaved as () => void}
                        isActive={true}
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
