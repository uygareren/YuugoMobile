import { useNavigation } from "@react-navigation/native";
import { Dimensions, SafeAreaView} from "react-native";
import { type RootStackParamList } from "../../types/react-navigation";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Image, Text, View, useTheme } from "native-base";
import { useI18n } from "../../hooks/useI18n";
import TextInput from "../../components/input/TextInput";
import { Formik } from "formik";
import * as yup from "yup";
import i18n from "../../utils/i18n/i18n";
import { useDispatch } from "react-redux";
import PasswordInput from "../../components/input/PasswordInput";

type LoginScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Login"
>;

const schema = yup.object({
    email: yup.string().required(i18n.t(["translation", "ValidationErrors", "required"])).email(i18n.t("ValidationErrors.email")),
    password: yup.string().required(i18n.t("translation.ValidationErrors.required"))
    .min(6, 'Şifreniz uzunluğu')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
}).required();

export default function LoginScreen(){
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const { t } = useI18n("Login");
    const theme = useTheme();
    const maxWidth = Dimensions.get("screen").width;
    const dispatch = useDispatch();


    function handleLogin() {
        // navigation.navigate("Screen2", {userId: "asd"});
    }

    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.white }}>
            <Text fontFamily="ShadowsIntoLight-Regular" fontSize="24px" alignSelf="center" marginTop="16px">Yuugo</Text>
                <Formik initialValues={{
                email: "",
                password: ""
            }}
                validationSchema={schema}
                onSubmit={handleLogin}
                >
                    {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
                    <>
                        <View marginX="16px" mt="45px" style={{ rowGap: 12 }}>
                            <TextInput label={t("email")} value={values.email} onChangeText={handleChange("email")}
                                onBlur={handleBlur("email")} visibleIcon={errors.email == undefined && touched.email as boolean}
                                required isInvalid={errors.email != undefined && touched.email as boolean}
                                errorMessage={errors.email} />
                            <PasswordInput label={t("password")} value={values.password} onChangeText={handleChange("password")}
                                onBlur={handleBlur("password")}
                                required isInvalid={errors.password != undefined && touched.password as boolean}
                                errorMessage={errors.password} />
                        </View>

                        <Button onPress={() => handleSubmit()} mt="20px"
                            alignSelf="center" width={maxWidth - 32} mx="16px" marginBottom="14px">{t("toLogin")}</Button>
                    </>
                )}
                    
                </Formik>
            
        </SafeAreaView>
    )
}