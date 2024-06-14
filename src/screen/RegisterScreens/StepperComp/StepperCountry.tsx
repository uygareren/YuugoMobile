import { Formik } from "formik";
import { Text, View, theme } from "native-base";
import { useState } from "react";
import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import * as yup from "yup";
import { Button } from "../../../components/Button";
import { useI18n } from "../../../hooks/useI18n";
import i18n from "../../../utils/i18n/i18n";
import TitleText from "../../../components/TitleText";
import { SelectCard } from "../../../components/cards/SelectCard";

type StepperInfoProps = {
    onNext: () => void
}

const schema = yup.object({
    birthDate: yup.date().required(i18n.t("ValidationErrors.required")),
}).required();

export default function StepperCountry({ onNext }: StepperInfoProps) {
    const { t } = useI18n("RegisterDatetime");
    const {width, height} = Dimensions.get("screen");

    const [loading, setLoading] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<number | null>(null);


    const mockCountryData = [
        { id: 1, title: "Turkey" },
        { id: 2, title: "United States" },
        { id: 3, title: "Germany" },
        { id: 4, title: "France" },
        { id: 5, title: "Japan" },
        { id: 6, title: "Brazil" },
        { id: 7, title: "Canada" },
        { id: 8, title: "India" },
        { id: 9, title: "Australia" },
        { id: 10, title: "Italy" },
        { id: 10, title: "Italy" },
        { id: 10, title: "Italy" },
        { id: 10, title: "Italy" },
        { id: 10, title: "Italy" }
    ];

    function handleSaved() {
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
        <View style={{ flex: 1, marginHorizontal: 16 }}>
            <TitleText>Ülkeni Seç</TitleText>
            <FlatList
            showsVerticalScrollIndicator={false}
                data={mockCountryData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item, index}) => (
                    <SelectCard
                        isSelected={item.id == selectedCountry}
                        text={item.title}
                        onPress={() => handleSelectCountry(item.id)}
                    />
                )}
                contentContainerStyle={{ marginTop: 28, rowGap: 16 }}
            />
            <Button
                onPress={handleSaved}
                isActive={selectedCountry ? true : false}
                mt="20px"
                loading={loading}
                title={t("toCountinue")}
                mb="16px"
                textStyle={{ fontSize: 20 }}
            />
        
        </View>
    );
}
