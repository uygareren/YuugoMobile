import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Formik } from "formik";
import { useTheme, Text, View } from "native-base";
import { Dimensions, SafeAreaView } from "react-native";
import * as yup from "yup";
import { Button } from "../../components/Button";
import PasswordInput from "../../components/input/PasswordInput";
import { useI18n } from "../../hooks/useI18n";
import { RootStackParamList } from "../../types/react-navigation";
import i18n from "../../utils/i18n/i18n";
import { BUTTON_RADIUS } from "../../utils/utils";


type RegisterConfirmPasswordScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "RegisterConfirmCode"
>

const schema = yup.object({
    password1: yup.string().required(i18n.t(["translation", "ValidationErrors", "required"])),
    password2: yup.string().required(i18n.t(["translation", "ValidationErrors", "required"])),
}).required();


export default function RegisterConfirmPasswordScreen(){
    const { t } = useI18n("RegisterConfirmPasswordScreen");
    const navigation = useNavigation<RegisterConfirmPasswordScreenNavigationProp>();
    const theme = useTheme();
    const {width, height} = Dimensions.get("screen");

    function handleConfirmPassword(){

    }

    return(
        <SafeAreaView style={{backgroundColor: theme.colors.white, flex:1 }}>
            <View ml="16px" mt="16px">
                <Text fontWeight="medium" fontSize="18px">{t("passwordConfirm")}</Text>

                <Text mt="8px" fontSize="16px" fontWeight="300" color="darkText" >{t("passwordConfirmSubText")}</Text>
            </View>


            <Formik initialValues={{
                password1:"",
                password2:""
            }}
            validationSchema={schema}
            onSubmit={handleConfirmPassword}
            >
                {({errors, touched, values, handleChange, handleBlur, handleSubmit}) => (
                    <View style={{rowGap: 16}} mt="32px" mx="16px">
                        <PasswordInput label={t("password")} value={values.password1} onChangeText={handleChange("password")}
                            onBlur={handleBlur("password1")}
                            required isInvalid={errors.password1 != undefined && touched.password1 as boolean}
                            errorMessage={errors.password1} />

                        <PasswordInput label={t("password2")} value={values.password2} onChangeText={handleChange("password")}
                            onBlur={handleBlur("password2")}
                            required isInvalid={errors.password2 != undefined && touched.password2 as boolean}
                            errorMessage={errors.password2} />

                        <Button onPress={handleSubmit} title="Devam Et" loading={false}/>

                    </View>
                )}

            </Formik>

        </SafeAreaView>
    )
}