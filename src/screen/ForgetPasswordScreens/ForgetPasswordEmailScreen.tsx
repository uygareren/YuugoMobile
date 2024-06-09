import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Formik } from "formik";
import { Text, View, useTheme } from "native-base";
import { Dimensions, SafeAreaView } from "react-native";
import * as yup from "yup";
import { BackIcon } from "../../components/BackIcon";
import { Button } from "../../components/Button";
import TextInput from "../../components/input/TextInput";
import { useI18n } from "../../hooks/useI18n";
import { RootStackParamList } from "../../types/react-navigation";
import i18n from "../../utils/i18n/i18n";
import { MARGIN_HORİZONTAL } from "../../utils/utils";

type ForgetPasswordEmailScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList, "ForgetPasswordEmail"
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
    const theme = useTheme();
    const {width, height} = Dimensions.get("screen");

    function handleConfirmEmail(){
        navigation.push("ForgetPasswordCode");
    }

    return(
        <SafeAreaView style={{backgroundColor: theme.colors.white, flex:1, paddingHorizontal:MARGIN_HORİZONTAL}}>

            <View mt="16px">
                <BackIcon />
                <Text mt="16px" maxWidth="85%" fontSize="24px" fontWeight="900" color="titleText" >{t("emailConfirm")}</Text>
            </View>


            <Formik initialValues={{
                email:""
            }}
            validationSchema={schema}
            onSubmit={handleConfirmEmail}
            >
                {({errors, touched, values, handleChange, handleBlur, handleSubmit, isValid, dirty}) => (
                    console.log("error", errors),
                    <>
                    <View mt="32px">
                    <TextInput label={t("email")} value={values.email} onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    required isInvalid={errors.email != undefined && touched.email as boolean}
                    errorMessage={errors.email} />

                    
                    <Button onPress={handleSubmit}
                    isActive={isValid && dirty}
                    textStyle={{fontSize:20, fontWeight:"800"}}
                    mt="20px" title={t("continue")}
                    loading={false}/>
                    

                    </View>
                    </>
                )}

            </Formik>
        </SafeAreaView>
    )
}