import { Formik } from "formik";
import { View } from "native-base";
import { useState } from "react";
import * as yup from "yup";
import { Button } from "../../../components/Button";
import TextInput from "../../../components/input/TextInput";
import { useI18n } from "../../../hooks/useI18n";
import i18n from "../../../utils/i18n/i18n";
import TitleText from "../../../components/TitleText";

type StepperInfoProps = {
    onNext: () => void,
    userInfo: {
        name?: string | undefined;
        surname?: string | undefined;
        birthDate?: Date | undefined;
        isWoman?: boolean | undefined;
        countryId?: number | undefined;
    }
} 

const schema = yup.object({
    username: yup.string().required(i18n.t("ValidationErrors.required"))
}).required();

export default function StepperUsername({onNext, userInfo}: StepperInfoProps){

    const {t} = useI18n("RegisterUsername");

    const [loading, setLoading] = useState(false);

    function handleSaved(values: any){
        setLoading(true);
        try {
            const requestData = {
                ...userInfo,
                username: values.username
            }
        } catch (error) {
            
        }
        onNext();
    }

    return(
        <View mx={"16px"}>
            <TitleText>{t("title")}</TitleText>
            
            <Formik initialValues={{
                username: "",
            }}
                validationSchema={schema}
                onSubmit={handleSaved}
                >
                    {({ errors, touched, values, handleChange, handleBlur, handleSubmit, isValid, dirty }) => (
                    <View mt="28px">
                        <View style={{ rowGap: 12 }}>
                            <TextInput value={values.username} onChangeText={handleChange("username")}
                                onBlur={handleBlur("username")} visibleIcon={errors.username == undefined && touched.username as boolean}
                                required isInvalid={errors.username != undefined && touched.username as boolean}
                                errorMessage={errors.username} placeholder={t("username")} />
                        
                        </View>

                        <Button onPress={() => handleSubmit()} isActive={isValid && dirty} mt="20px"
                        loading={loading} title={t("toCountinue")} mb="8px" 
                        textStyle={{fontSize:20}}
                        />
                    </View>
                )}
                
            </Formik>
        </View>
    )
}

