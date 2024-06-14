import { Formik } from "formik";
import { Text, View, theme } from "native-base";
import { useState } from "react";
import * as yup from "yup";
import { Button } from "../../../components/Button";
import DateTimeInput from "../../../components/input/DateTimeInput";
import { useI18n } from "../../../hooks/useI18n";
import i18n from "../../../utils/i18n/i18n";

type StepperInfoProps = {
    onNext: () => void
}

const schema = yup.object({
    birthDate: yup.date().required(i18n.t("ValidationErrors.required")),
}).required();

export default function StepperDatetime({ onNext }: StepperInfoProps) {
    const { t } = useI18n("RegisterDatetime");
    const [loading, setLoading] = useState(false);

    function handleSaved(values: any) {
        console.log(values);
        onNext();
    }

    function datesAreEqual(date1: Date, date2: Date) {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    }

    return (
        <View mx={"16px"}>
            <View mt="28px">
                <Formik
                    initialValues={{ birthDate: new Date() }}
                    validationSchema={schema}
                    onSubmit={handleSaved}
                >
                    {({ errors, touched, values, setFieldValue, handleSubmit, isValid, dirty }) => (
                        <View mt="28px">
                            <View style={{ rowGap: 12 }}>
                                <Text style={{fontWeight:"800", color:theme.colors.black, fontSize:22, marginLeft:6}}>
                                    {t("dateTime")}
                                </Text>
                                <DateTimeInput
                                    value={values.birthDate}
                                    onChangeValue={(date) => setFieldValue("birthDate", date)}
                                />
                                
                            </View>
                            <Button
                                onPress={handleSubmit as () => void}
                                isActive={!datesAreEqual(new Date(), values.birthDate)}
                                mt="20px"
                                loading={loading}
                                title={t("toCountinue")}
                                mb="8px"
                                textStyle={{fontSize:20}}

                            />
                        </View>
                    )}
                </Formik>
            </View>
        </View>
    )
}
