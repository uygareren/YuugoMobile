import { Formik } from "formik";
import { View, useToast } from "native-base";
import { useState } from "react";
import * as yup from "yup";
import { Button } from "../../../components/Button";
import TextInput from "../../../components/input/TextInput";
import { useI18n } from "../../../hooks/useI18n";
import i18n from "../../../utils/i18n/i18n";
import TitleText from "../../../components/TitleText";
import { RootStateType } from "../../../store/store";
import { useSelector } from "react-redux";
import api, { ResponseError } from "../../../api/api";

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
    const jwt = useSelector<RootStateType>(state => state.account.jwt);
    const {t} = useI18n("RegisterUsername");
    const toast = useToast();

    const [loading, setLoading] = useState(false);

    async function handleSaved(values: any){
        setLoading(true);
        try {
            const requestData = {
                ...userInfo,
                username: values.username
            }

            const resp = await api.post("/user/info", requestData, {
                headers: {
                    authorization: `Bearer ${jwt}`
                }
            });
            setLoading(false);
            onNext();
        } catch (error: any) {
            setLoading(false);

            const errorCode = error.response.data.errorCode as ResponseError;
            if(errorCode == ResponseError.HAS_ALREADY_USERNAME) {
                toast.show({
                    title: t("errorUsername"),
                });
            } else {
                toast.show({
                    title: t("unknownError"),
                });
            }
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

