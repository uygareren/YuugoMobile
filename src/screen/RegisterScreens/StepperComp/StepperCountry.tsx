import { Formik } from "formik";
import { Image, Text, View, theme } from "native-base";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import * as yup from "yup";
import { Button } from "../../../components/Button";
import { useI18n } from "../../../hooks/useI18n";
import i18n from "../../../utils/i18n/i18n";
import TitleText from "../../../components/TitleText";
import { SelectCard } from "../../../components/cards/SelectCard";
import api from "../../../api/api";
import { SvgUri } from "react-native-svg";

type StepperInfoProps = {
    onNext: () => void
}

const schema = yup.object({
    birthDate: yup.date().required(i18n.t("ValidationErrors.required")),
}).required();

export default function StepperCountry({ onNext }: StepperInfoProps) {
    const { t } = useI18n("RegisterInfo");
    const {width, height} = Dimensions.get("screen");

    const [loading, setLoading] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<number | null>(null);
    const [country, setCountry] = useState<{id: number, name: string, image: string, flag: string}[]>([]);

    function handleSaved() {
        onNext();
    }

    useEffect(() => {
        init();
    }, []);

    async function init() {
        const resp = await api.get("/user/country");

        setCountry(resp.data.data);
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
            <TitleText>{t("titleOfCountry")}</TitleText>
            <FlatList
            showsVerticalScrollIndicator={false}
                data={country}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item, index}) => (
                    <SelectCard
                        isSelected={item.id == selectedCountry}
                        text={item.flag + " " + item.name}
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
