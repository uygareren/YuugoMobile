import { Text, View } from "native-base"
import { RootStateType } from "../../../store/store";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import i18n from "../../../utils/i18n/i18n";
import TextInput from "../../../components/input/TextInput";
import TitleText from "../../../components/TitleText";
import { Button } from "../../../components/Button";
import { useEffect, useState } from "react";
import { useI18n } from "../../../hooks/useI18n";
import DateTimeInput from "../../../components/input/DateTimeInput";

type StepperInfoProps = {
    onNext: () => void
} 

const schema = yup.object({
    name: yup.string().required(i18n.t("ValidationErrors.required")),
    surname: yup.string().required(i18n.t("ValidationErrors.required"))
}).required();

export const StepperInfo = ({ onNext }: StepperInfoProps) => {
    const jwt = useSelector<RootStateType>(state => state.account.jwt);
    const { t } = useI18n("RegisterInfo");
    const [loading, setLoading] = useState(false);
    const [countrys, setCountrys] = useState([]);

    useEffect(() => {
        // Get Countrys
    }, []);

    function handleSaved() {
        setLoading(true);
    }

    return (
        <View mx="16px">
            <TitleText></TitleText>
            <Formik initialValues={{
                name: "",
                surname: "",
                birthDate: new Date(),
                isWoman: false,
                countryId: 0,
            }}
                validationSchema={schema}
                onSubmit={handleSaved}
                >
                    {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
                    <View mt="28px">
                        <View style={{ rowGap: 12 }}>
                            <TextInput value={values.name} onChangeText={handleChange("name")}
                                onBlur={handleBlur("name")} visibleIcon={errors.name == undefined && touched.name as boolean}
                                required isInvalid={errors.name != undefined && touched.name as boolean}
                                errorMessage={errors.name} placeholder={t("name")} />
                            <TextInput value={values.surname} onChangeText={handleChange("surname")}
                                onBlur={handleBlur("surname")} visibleIcon={errors.surname == undefined && touched.surname as boolean}
                                required isInvalid={errors.surname != undefined && touched.surname as boolean}
                                errorMessage={errors.surname} placeholder={t("surname")} />
                                
                            {/** @ts-ignore */}
                            <DateTimeInput value={values.birthDate} onChangeValue={handleChange("birthDate")}
                            
                            />
                        </View>

                        <Button onPress={() => handleSubmit()} isActive={true} mt="20px"
                        loading={loading} title={t("toCountinue")} mb="8px" />
                    </View>
                )}
                    
                </Formik>
        </View>
    )
}