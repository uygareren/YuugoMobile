import { Text, View, theme } from "native-base";
import { useState } from "react";
import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import { Button } from "../../../components/Button";
import { useI18n } from "../../../hooks/useI18n";

type StepperInfoProps = {
    onNext: () => void
}



export default function StepperSelectLanguage({ onNext }: StepperInfoProps) {
    const { t } = useI18n("RegisterSelectLanguage");
    const [loading, setLoading] = useState(false);
    const {width, height} = Dimensions.get("screen");


    const [selectedCountry, setSelectedCountry] = useState<number | null>(null);


    const mockLanguageData = [
        { id: 1, title: "Turkish" },
        { id: 2, title: "English" },
        { id: 3, title: "German" },
        { id: 4, title: "French" },
        
    ];

    function handleSaved(values: any) {
        console.log(values);
        onNext();
    }

    function handleSelectCountry(id:number){
        if(selectedCountry == id){
            setSelectedCountry(null);
        }else{
            setSelectedCountry(id);
        }
    }

    const RenderLanguage = ({ item }: any) => {
        return (
            <TouchableOpacity
                onPress={() => handleSelectCountry(item.id)}
                style={{
                    borderWidth: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 16,
                    borderBottomWidth: 6,
                    borderColor: item.id == selectedCountry ? "#db37ce" : "gray",
                    backgroundColor: item.id == selectedCountry ? "#fac5f5" : "white",
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
                                    {t("selectLanguage")}
                                </Text>
                            </View>

                            <View style={{height:height*0.6}}>
                                    <FlatList
                                    showsVerticalScrollIndicator={false}
                                        data={mockLanguageData}
                                        keyExtractor={(item) => item.id.toString()}
                                        renderItem={RenderLanguage}
                                        contentContainerStyle={{ paddingBottom: 20, marginTop:32 }}
                                    />
                                </View>
                            
                            <Button
                                onPress={handleSaved as () => void}
                                isActive={selectedCountry ? true : false}
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
