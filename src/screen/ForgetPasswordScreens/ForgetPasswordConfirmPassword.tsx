import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Formik } from "formik";
import { Text, View, useTheme, useToast } from "native-base";
import { Dimensions, SafeAreaView } from "react-native";
import * as yup from "yup";
import { BackIcon } from "../../components/BackIcon";
import { Button } from "../../components/Button";
import TitleText from "../../components/TitleText";
import PasswordInput from "../../components/input/PasswordInput";
import { useI18n } from "../../hooks/useI18n";
import { RootStackParamList } from "../../types/react-navigation";
import i18n from "../../utils/i18n/i18n";
import { MARGIN_HORİZONTAL } from "../../utils/utils";
import { useState } from "react";
import api from "../../api/api";

type ForgetPasswordConfirmPasswordNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "RegisterConfirmCode"
>
type ForgetPasswordConfirmPasswordScreenRouteProp = RouteProp<RootStackParamList, 'ForgetPasswordConfirmPassword'>;

const schema = yup.object({
    password1: yup.string()
        .required(i18n.t("ValidationErrors.passwordRequired"))
        .min(6, i18n.t("ValidationErrors.passwordMinLength"))
        .matches(/[A-Z]/, i18n.t("ValidationErrors.passwordUpperCase"))
        .matches(/[a-z]/, i18n.t("ValidationErrors.passwordLowerCase"))
        .matches(/[0-9]/, i18n.t("ValidationErrors.passwordNumber"))
        .matches(/[\W_]/, i18n.t("ValidationErrors.passwordSpecialChar")),
    password2: yup.string()
        .required(i18n.t("ValidationErrors.passwordRequired"))
        .oneOf([yup.ref('password1')], i18n.t("ValidationErrors.passwordMatch"))
}).required();


export default function ForgetPasswordConfirmPassword(){

    const { t } = useI18n("RegisterConfirmPasswordScreen");
    const navigation = useNavigation<ForgetPasswordConfirmPasswordNavigationProp>();
    const route = useRoute<ForgetPasswordConfirmPasswordScreenRouteProp>();
    const theme = useTheme();
    const toast = useToast();

    const activationToken = route.params?.activationToken;

    const [loading, setLoading] = useState(false);

    async function handleConfirmPassword(values: { password1: string, password2: string }){
        try {
            setLoading(true);
            await api.post("/auth/forgot-password/reset", {
                password: values.password1,
                activationToken: activationToken
            });

            toast.show({
                title: t("success"),
            });
            navigation.navigate("Login");
        } catch (error: any) {
            setLoading(false);
            toast.show({
                title: t("unknownError"),
            });
        }
    }

    return(
        <SafeAreaView style={{backgroundColor: theme.colors.white, flex:1, paddingHorizontal:MARGIN_HORİZONTAL }}>

            <View mt="16px" mx="16px">
                <BackIcon box={{ mt: "16px" }} />
                <TitleText fontSize="24px" fontWeight="900" mt={"16px"}>{t("passwordConfirm")}</TitleText>
                <Text color="gray.400" fontWeight="semibold" mt="8px" fontSize={"14.5px"}>{t("passwordConfirmSubText")}</Text>
            </View>
            <Formik initialValues={{
                password1:"",
                password2:""
            }}
            validationSchema={schema}
            onSubmit={handleConfirmPassword}
            >
                {({errors, touched, values, handleChange, handleBlur, handleSubmit, isValid}) => (
                    
                    <View style={{rowGap: 16}} mt="32px" mx="16px">
                        <PasswordInput value={values.password1} onChangeText={handleChange("password1")}
                            onBlur={handleBlur("password1")} placeholder={t("password")}
                            required isInvalid={errors.password1 != undefined && touched.password1 as boolean}
                            errorMessage={errors.password1} />

                        <PasswordInput value={values.password2} onChangeText={handleChange("password2")}
                            onBlur={handleBlur("password2")} placeholder={t("password2")}
                            required isInvalid={errors.password2 != undefined && touched.password2 as boolean}
                            errorMessage={errors.password2} />

                        <Button onPress={handleSubmit} mt="32px" isActive={!!values.password1 && !!values.password2 && isValid}
                        title={t("continue")} loading={loading} />


                    </View>
                )}
            </Formik>
        </SafeAreaView>
    )

}