import { CommonActions, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Formik } from "formik";
import { Text, View, useTheme, useToast } from "native-base";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import * as yup from "yup";
import api, { ResponseError } from "../../api/api";
import { BackIcon } from "../../components/BackIcon";
import { Button } from "../../components/Button";
import TextInput from "../../components/input/TextInput";
import { useI18n } from "../../hooks/useI18n";
import { RootStackParamList } from "../../types/react-navigation";
import i18n from "../../utils/i18n/i18n";
import { MARGIN_HORİZONTAL } from "../../utils/utils";
import TitleText from "../../components/TitleText";

type ForgetPasswordEmailScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "RegisterEmail"
>

const schema = yup.object({
    email: yup.string()
        .required(i18n.t("ValidationErrors.required"))
        .email(i18n.t("ValidationErrors.email"))
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            i18n.t("ValidationErrors.email")
        ),
}).required();

export default function ForgetPasswordEmailScreen(){
    const { t } = useI18n("ForgetPasswordEmailScreen");
    const navigation = useNavigation<ForgetPasswordEmailScreenNavigationProp>();
    const toast = useToast();
    const theme = useTheme();

    const [loading, setLoading] = useState(false);

    async function handleConfirmEmail(values: { email: string }) {
        setLoading(true);
        try {
            const resp = await api.post("/auth/forgot-password", values);
            setLoading(false);

            navigation.dispatch(
                CommonActions.reset({
                    routes: [
                        { 
                            name: "ForgetPasswordCode", params: {
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
        <SafeAreaView style={{backgroundColor: theme.colors.white, flex:1, paddingHorizontal:MARGIN_HORİZONTAL}}>
            <View mt="16px" mx="16px">
                <BackIcon />
                <TitleText mt="16px" >{t("emailConfirm")}</TitleText>
                <Text color="gray.400" fontWeight="semibold" mt="8px" fontSize={"14.5px"}>{t("emailConfirmSubText")}</Text>
            </View>

            <Formik initialValues={{
                email:"ertugruldirik35@gmail.com"
            }}
            validationSchema={schema}
            onSubmit={handleConfirmEmail} // Change this to handleConfirmEmail
            >
                {({errors, touched, values, handleChange, handleBlur, handleSubmit, isValid}) => (
                    <View mt="32px" mx="16px" >
                        <TextInput label={t("email")} value={values.email} onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        required isInvalid={errors.email != undefined && touched.email as boolean}
                        errorMessage={errors.email} />
                        
                        <Button onPress={handleSubmit}
                            isActive={isValid}
                            mt="20px" title={t("continue")}
                            loading={loading}/>
                    </View>
                )}
            </Formik>
        </SafeAreaView>
    )
}
