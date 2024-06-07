import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Formik } from "formik";
import { useTheme } from "native-base";
import { Dimensions, Text, View } from "react-native";
import * as yup from "yup";
import { Button } from "../../components/Button";
import { BackIcon } from "../../components/BackIcon";
import PasswordInput from "../../components/input/PasswordInput";
import { useI18n } from "../../hooks/useI18n";
import { RootStackParamList } from "../../types/react-navigation";
import i18n from "../../utils/i18n/i18n";
import { BUTTON_RADIUS } from "../../utils/utils";

type ForgetPasswordConfirmPasswordNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "RegisterConfirmCode"
>

const schema = yup.object({
    password1: yup.string().required(i18n.t(["translation", "ValidationErrors", "required"])),
    password2: yup.string().required(i18n.t(["translation", "ValidationErrors", "required"])),
}).required();

export default function ForgetPasswordConfirmPassword(){

    const { t } = useI18n("RegisterConfirmPasswordScreen");
    const navigation = useNavigation<ForgetPasswordConfirmPasswordNavigationProp>();
    const theme = useTheme();
    const {width, height} = Dimensions.get("screen");

    function handleConfirmPassword(){
    }

    return(
        <View style={{backgroundColor: theme.colors.white, flex:1, paddingHorizontal:16, justifyContent:"center"}}>

            <View style={{flex:1, paddingTop:48}}>
            <View style={{flexDirection:"row", marginTop:16}}>
                    <BackIcon />
                    <View style={{marginLeft:8}}>
                        <Text style={{fontSize:24, color:theme.colors.black, fontWeight:"500"}}>{t("passwordConfirm")}</Text>
                    </View>
                </View>
                <View style={{marginTop:16}}>
                    <Text style={{fontSize:16, fontWeight:"300", color:theme.colors.black}}>{t("passwordConfirmSubText")}</Text>
                </View>                
            </View>

            <Formik initialValues={{
                password1:"",
                password2:""
            }}
            validationSchema={schema}
            onSubmit={handleConfirmPassword}
            >
                {({errors, touched, values, handleChange, handleBlur, handleSubmit}) => (
                    <>
                    <View style={{marginTop:45, flex:3}}>
                    <PasswordInput label={t("password")} value={values.password1} onChangeText={handleChange("password")}
                        onBlur={handleBlur("password1")}
                        required isInvalid={errors.password1 != undefined && touched.password1 as boolean}
                        errorMessage={errors.password1} />

                    <PasswordInput style={{marginTop:24}} label={t("password2")} value={values.password2} onChangeText={handleChange("password")}
                        onBlur={handleBlur("password2")}
                        required isInvalid={errors.password2 != undefined && touched.password2 as boolean}
                        errorMessage={errors.password2} />

                    <Button onPress={handleSubmit} title="Devam Et"
                    style={{marginTop:32, paddingVertical:16, alignItems:"center", justifyContent:"center",
                    borderRadius:BUTTON_RADIUS, backgroundColor:"blue"}}
                    textStyle={{color:theme.colors.white, fontWeight:"600", fontSize:16}}
                    loading={false}/>

                    </View>
                    </>
                )}

            </Formik>

        </View>
    )

}