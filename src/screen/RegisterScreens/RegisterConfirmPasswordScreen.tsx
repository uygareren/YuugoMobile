import { CommonActions, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Formik } from "formik";
import { useTheme, Text, View, useToast } from "native-base";
import { SafeAreaView } from "react-native";
import * as yup from "yup";
import { Button } from "../../components/Button";
import PasswordInput from "../../components/input/PasswordInput";
import { useI18n } from "../../hooks/useI18n";
import { RootStackParamList } from "../../types/react-navigation";
import i18n from "../../utils/i18n/i18n";
import api from "../../api/api";
import { useState } from "react";
import { setSecureStoreToken } from "../../utils/AsyncStorage";


type RegisterConfirmPasswordScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "RegisterConfirmCode"
>
type RegisterConfirmPasswordScreenRouteProp = RouteProp<RootStackParamList, 'RegisterConfirmPassword'>;

const schema = yup.object({
    password1: yup.string().required(i18n.t("ValidationErrors.required")).min(6, i18n.t("ValidationErros.passwordMinLength")),
    password2: yup.string().required(i18n.t("ValidationErrors.required")),
}).required();


export default function RegisterConfirmPasswordScreen(){
    const { t } = useI18n("RegisterConfirmPasswordScreen");
    const navigation = useNavigation<RegisterConfirmPasswordScreenNavigationProp>();
    const route = useRoute<RegisterConfirmPasswordScreenRouteProp>();
    const jwt = route.params.jwt;
    const toast = useToast();
    const theme = useTheme();

    const [loading, setLoading] = useState(false);

    async function handleConfirmPassword(values: { password1: string, password2: string }){
        setLoading(true);
        try {
            const resp = await api.put("/auth/register/password", {
                password: values.password1
            }, {
                headers: {
                    authorization: `Bearer ${jwt}`
                }
            });
            
            await setSecureStoreToken(jwt);
            setLoading(false);
            /*
            navigation.dispatch(
                CommonActions.reset({
                    routes: [
                        { name: "RegisterInfo" }
                    ],
                    index: 0
                })
            );
            */

        } catch (error: any) {
            setLoading(false);
            toast.show({
                title: t("unknownError"),
            });
        }
    }

    return(
        <SafeAreaView style={{backgroundColor: theme.colors.white, flex:1 }}>
            <View ml="16px" mt="16px">
                <Text fontWeight="medium" fontSize="18px">{t("passwordConfirm")}</Text>

                <Text mt="8px" fontSize="16px" fontWeight="300" color="darkText" >{t("passwordConfirmSubText")}</Text>
            </View>


            <Formik initialValues={{
                password1: "",
                password2: ""
            }}
            validationSchema={schema}
            onSubmit={handleConfirmPassword}
            >
                {({errors, touched, values, handleChange, handleBlur, handleSubmit}) => (
                    <View style={{rowGap: 16}} mt="32px" mx="16px">
                        <PasswordInput label={t("password")} value={values.password1} onChangeText={handleChange("password1")}
                            onBlur={handleBlur("password1")}
                            required isInvalid={errors.password1 != undefined && touched.password1 as boolean}
                            errorMessage={errors.password1} />

                        <PasswordInput label={t("password2")} value={values.password2} onChangeText={handleChange("password2")}
                            onBlur={handleBlur("password2")}
                            required isInvalid={errors.password2 != undefined && touched.password2 as boolean}
                            errorMessage={errors.password2} />

                        <Button onPress={handleSubmit} title="Devam Et" loading={loading} />

                    </View>
                )}

            </Formik>

        </SafeAreaView>
    )
}