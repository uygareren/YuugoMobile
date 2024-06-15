import { Text, View, theme } from "native-base";
import { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Button } from "../../../components/Button";
import { useI18n } from "../../../hooks/useI18n";
import TitleText from "../../../components/TitleText";
import { SelectCard } from "../../../components/cards/SelectCard";

type StepperInfoProps = {
    onNext: (genderId: number) => void
}

export default function StepperGender({ onNext }: StepperInfoProps) {
    const { t } = useI18n("RegisterGender");

    const [selectedGender, setSelectedGender] = useState(0);

    function handleSaved() {
        onNext(selectedGender);
    }

    function handleSelectGender(id: number){
        setSelectedGender(id);
    }

    return (
        <View mx={"16px"}>
            <TitleText>{t("genderTitle")}</TitleText>
            <View mt="28px">
                <SelectCard text={t("male")} isSelected={selectedGender == 1} onPress={() => handleSelectGender(1)} 
                containerStyle={{ marginBottom: 16 }} />
                <SelectCard text={t("female")} isSelected={selectedGender == 2} onPress={() => handleSelectGender(2)} />
                <Button
                    onPress={handleSaved as () => void}
                    isActive={true}
                    mt="20px"
                    title={t("toCountinue")}
                    mb="8px"
                    textStyle={{fontSize:20}}

                />
            </View>
        </View>
    )
}
