import { CommonActions, useNavigation } from "@react-navigation/native";
import { SafeAreaView} from "react-native";
import { type RootStackParamList } from "../../types/react-navigation";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, View, useTheme, useToast } from "native-base";
import { useI18n } from "../../hooks/useI18n";
import TextInput from "../../components/input/TextInput";
import { Formik } from "formik";
import * as yup from "yup";
import i18n from "../../utils/i18n/i18n";
import { useDispatch } from "react-redux";
import PasswordInput from "../../components/input/PasswordInput";
import { useState } from "react";
import api, { ResponseError } from "../../api/api";
import { accountSliceActions } from "../../store/slices/accountSlice";
import { setSecureStoreToken } from "../../utils/AsyncStorage";
import { Button } from "../../components/Button";

type LoginScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Login"
>;

const schema = yup.object({
    email: yup.string().required(i18n.t("ValidationErrors.required")).email(i18n.t("ValidationErrors.email")),
    password: yup.string().required(i18n.t("ValidationErrors.required"))
    .min(6, i18n.t("ValidationErros.passwordMinLength"))
}).required();

export default function LoginScreen(){
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const { t } = useI18n("Login");
    const theme = useTheme();
    const dispatch = useDispatch();
    const toast = useToast();
    const [loading, setLoading] = useState(false);

    async function handleLogin(values: { email: string, password: string }) {
        setLoading(true);
        try {
            const resp = await api.post("/auth/login", values);

            const data = resp.data.data;
            await setSecureStoreToken(data.jwt);

            if(data.userInfo) {
                dispatch(accountSliceActions.setAccount(data));
                /*
                navigation.dispatch(
                    CommonActions.reset({
                        routes: [
                            { name: "Home" }
                        ],
                        index: 0
                    })
                );
                */
            } else {
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
            }

        } catch (error: any) {
            setLoading(false);

            const errorCode = error.response.data.errorCode as ResponseError;
            if(errorCode == ResponseError.LOGIN_FAILED || errorCode == ResponseError.LOGIN_FAILED_HAS_NOT_ACC) {
                toast.show({
                    title: t("loginError"),
                });
            } else {
                toast.show({
                    title: t("unknownError"),
                });
            }
        }

        // navigation.navigate("Screen2", {userId: "asd"});
    }

    function handleForgotPassword(){
        navigation.navigate("ForgetPasswordEmail");
    }

    function handleRegister() {
        navigation.navigate("RegisterEmail");
    }

    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.white }}>
            <Text pt="16px" fontSize="24px" pl="16px" fontWeight="medium" color="darkText">{t("title")}</Text>
                <Formik initialValues={{
                email: "ertugruldirik35@gmail.com",
                password: "Asd123."
            }}
                validationSchema={schema}
                onSubmit={handleLogin}
                >
                    {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
                    <View mx="16px">
                        <View mt="32px" style={{ rowGap: 12 }}>
                            <TextInput label={t("email")} value={values.email} onChangeText={handleChange("email")}
                                onBlur={handleBlur("email")} visibleIcon={errors.email == undefined && touched.email as boolean}
                                required isInvalid={errors.email != undefined && touched.email as boolean}
                                errorMessage={errors.email} />
                            <PasswordInput label={t("password")} value={values.password} onChangeText={handleChange("password")}
                                onBlur={handleBlur("password")}
                                required isInvalid={errors.password != undefined && touched.password as boolean}
                                errorMessage={errors.password} />
                        </View>

                        <Text fontWeight="bold" color="primary.500" alignSelf="flex-start"
                        fontSize="15px" mt="20px"
                        onPress={handleForgotPassword}>{t("forogtPassword")}</Text>

                        <Button onPress={() => handleSubmit()} mt="20px" loading={loading} title={t("toLogin")} 
                            mb="8px" />
                    </View>
                )}
                    
                </Formik>

                <View alignSelf="center">
                    <Text fontSize="13px">{t("registerQuestion")}<Text fontWeight="bold" color="primary.500"
                        fontSize="15px" mt="20px" mr="16px" onPress={handleRegister}>{t("register")}
                        </Text>
                    </Text>
                </View>
            
        </SafeAreaView>
    )
}