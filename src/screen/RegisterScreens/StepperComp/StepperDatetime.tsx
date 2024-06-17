import { Formik } from "formik";
import { Text, View, theme } from "native-base";
import { useState } from "react";
import * as yup from "yup";
import { Button } from "../../../components/Button";
import DateTimeInput from "../../../components/input/DateTimeInput";
import { useI18n } from "../../../hooks/useI18n";
import i18n from "../../../utils/i18n/i18n";
import TitleText from "../../../components/TitleText";
import { formatDate } from "../../../utils/utils";

type StepperInfoProps = {
    onNext: (birthDate: string) => void
}

const schema = yup.object({
    birthDate: yup.date().required(i18n.t("ValidationErrors.required")),
}).required();

export default function StepperDatetime({ onNext }: StepperInfoProps) {
    const { t } = useI18n("RegisterDatetime");
    const [birthDate, setBirthDate] = useState(new Date);

    function handleSaved() {
        onNext(formatDate(birthDate));
    }

    return (
        <View mx={"16px"}>
            <TitleText>{t("dateTime")}</TitleText>
    
            <View mt="28px">
                
                <DateTimeInput
                    value={birthDate}
                    onChangeValue={(date) => setBirthDate(date)}
                />
                <Button
                    onPress={() => handleSaved()}
                    isActive={birthDate != null}
                    mt="20px"
                    title={t("toCountinue")}
                    mb="8px"
                />
            </View>
        
        </View>
    )
}
