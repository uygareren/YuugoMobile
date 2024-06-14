import { View } from "native-base";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../../../components/Button";
import TitleText from "../../../components/TitleText";
import TextInput from "../../../components/input/TextInput";
import { useI18n } from "../../../hooks/useI18n";
import { RootStateType } from "../../../store/store";

type StepperInfoProps = {
    onNext: (name: string, surname: string) => void
} 

export const StepperInfo = ({ onNext }: StepperInfoProps) => {
    const jwt = useSelector<RootStateType>(state => state.account.jwt);
    const { t } = useI18n("RegisterInfo");

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");

    function handleSaved() {
        onNext(name, surname);
    }

    const isActive = Boolean(name && surname);

    return (
        <View mx="16px">
            <TitleText>{t("title")}</TitleText>
            <View mt="28px">
                <View style={{ rowGap: 12 }}>
                    <TextInput 
                        value={name} 
                        onChangeText={setName} 
                        placeholder={t("name")} 
                    />
                    <TextInput 
                        value={surname} 
                        onChangeText={setSurname} 
                        placeholder={t("surname")} 
                    />
                    {/* <DateTimeInput value={values.birthDate} onChangeValue={handleChange("birthDate")} /> */}
                </View>

                <Button 
                    onPress={handleSaved} 
                    isActive={isActive} 
                    mt="20px"
                    title={t("toCountinue")} 
                    mb="8px" 
                    textStyle={{fontSize:20}}

                />
            </View>
        </View>
    );
};
