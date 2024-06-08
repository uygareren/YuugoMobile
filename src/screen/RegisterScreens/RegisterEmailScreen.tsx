import { CommonActions, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Formik } from "formik";
import { useTheme, View, Text, useToast } from "native-base";
import { SafeAreaView } from "react-native";
import * as yup from "yup";
import { Button } from "../../components/Button";
import TextInput from "../../components/input/TextInput";
import { useI18n } from "../../hooks/useI18n";
import { RootStackParamList } from "../../types/react-navigation";
import i18n from "../../utils/i18n/i18n";
import { BackIcon } from "../../components/BackIcon";
import api, { ResponseError } from "../../api/api";
import { useState } from "react";

type RegisterEmailScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "RegisterEmail"
>

const schema = yup.object({
    email: yup.string().required(i18n.t("ValidationErrors.required")).email(i18n.t("ValidationErrors.email")),
}).required();

export default function RegisterEmailScreen(){
    const { t } = useI18n("RegisterEmailScreen");
    const navigation = useNavigation<RegisterEmailScreenNavigationProp>();
    const toast = useToast();
    const theme = useTheme();

    const [loading, setLoading] = useState(false);

    async function handleConfirmEmail(values: { email: string }) {
        setLoading(true);
        try {
            const resp = await api.post("/auth/register/email", values);
            setLoading(false);

            navigation.dispatch(
                CommonActions.reset({
                    routes: [
                        { 
                            name: "RegisterConfirmCode", params: {
                                activationToken: resp.data.data.activationToken
                            }
                        }
                    ],
                    index: 0
                })
            )
        } catch (error: any) {
            setLoading(false);

            const errorCode = error.response.data.errorCode as ResponseError;
            if(errorCode == ResponseError.HAS_ALREADY_ACC) {
                toast.show({
                    title: t("loginError"),
                });
            } else if(errorCode == ResponseError.ACTIVATION_CODE_BANNED) {
                toast.show({
                    title: t("loginError"),
                });
            } else {
                toast.show({
                    title: t("unknownError"),
                });
            }
        }
    }

    return(
        <SafeAreaView style={{backgroundColor: theme.colors.white, flex:1}}>

            
            <View mt="16px" ml="16px">
                <BackIcon title="Email Doğrula" />
                <Text mt="16px" maxWidth="85%" fontSize="15px" fontWeight="300" >{t("emailConfirmSubText")}</Text>
            </View>

            <Formik initialValues={{
                email:"ertugruldirik35@gmail.com"
            }}
            validationSchema={schema}
            onSubmit={handleConfirmEmail}
            >
                {({errors, touched, values, handleChange, handleBlur, handleSubmit}) => (
                    console.log("error", errors),
                    <View mt="32px" mx="16px">
                        <TextInput label={t("email")} value={values.email} onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        required isInvalid={errors.email != undefined && touched.email as boolean}
                        errorMessage={errors.email} />

                        <Button onPress={handleSubmit}
                            mt="20px" title="Devam Et"
                            loading={loading}/>
                        

                    </View>
                )}

            </Formik>
        </SafeAreaView>
    )
}