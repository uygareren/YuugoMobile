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
import CheckBox from "../../components/CheckBox";
import TextInput from "../../components/input/TextInput";
import { useI18n } from "../../hooks/useI18n";
import { RootStackParamList } from "../../types/react-navigation";
import i18n from "../../utils/i18n/i18n";
import { MARGIN_HORİZONTAL, TITLE_COLOR } from "../../utils/utils";

type RegisterEmailScreenNavigationProp = NativeStackNavigationProp<
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

export default function RegisterEmailScreen(){
    const { t } = useI18n("RegisterEmailScreen");
    const navigation = useNavigation<RegisterEmailScreenNavigationProp>();
    const toast = useToast();
    const theme = useTheme();

    const [loading, setLoading] = useState(false);
    const [checkBox, setCheckBox] = useState(false);

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

    function handleGoCodePage(){
        navigation.push("RegisterConfirmCode", {activationToken:"45"});
    }


    return(
        <SafeAreaView style={{backgroundColor: theme.colors.white, flex:1, paddingHorizontal:MARGIN_HORİZONTAL}}>

            
            <View mt="16px">
                <BackIcon />
                <Text mt="16px" maxWidth="85%" fontSize="24px" fontWeight="900" color={TITLE_COLOR} >{t("emailConfirmSubText")}</Text>
            </View>

            <Formik initialValues={{
                email:"ertugruldirik35@gmail.com"
            }}
            validationSchema={schema}
            onSubmit={handleConfirmEmail} // Change this to handleConfirmEmail
            >
                {({errors, touched, values, handleChange, handleBlur, handleSubmit, isValid, dirty}) => (
                    <View mt="32px" >
                        <TextInput label={t("email")} value={values.email} onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        required isInvalid={errors.email != undefined && touched.email as boolean}
                        errorMessage={errors.email} />

                        <View mt={"16px"} flexDirection={"row"} alignItems={"flex-start"} borderWidth={0}>
                            <CheckBox 
                                color="#db37ce" 
                                activeColor="#db37ce" 
                                value={checkBox} 
                                onValueChange={setCheckBox} 
                            />
                            <View flexDirection={"row"} flexWrap={"wrap"} marginLeft={0}>
                                <Text style={{ color: TITLE_COLOR, fontWeight: "700" }}>
                                    {t("checkBoxMessage1")}
                                </Text>
                                <Text style={{ color: TITLE_COLOR, fontWeight: "500" }}>
                                    {t("checkBoxMessage2")}
                                </Text>
                                <Text style={{ color: TITLE_COLOR, fontWeight: "700", marginLeft:3 }}>
                                    {t("checkBoxMessage3")}
                                </Text>
                                <Text style={{ color: TITLE_COLOR, fontWeight: "500" }}>
                                    {t("checkBoxMessage4")}
                                </Text>
                            </View>
                        </View>
                        
                        <Button onPress={handleSubmit}
                            isActive={isValid && dirty && checkBox}
                            textStyle={{fontSize:20, fontWeight:"800"}}
                            mt="20px" title={t("continue")}
                            loading={loading}/>
                    </View>
                )}
            </Formik>
        </SafeAreaView>
    )
}
