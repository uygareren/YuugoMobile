import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Formik } from "formik";
import { useTheme } from "native-base";
import { Dimensions, Text, View } from "react-native";
import * as yup from "yup";
import { Button } from "../../components/Button";
import TextInput from "../../components/input/TextInput";
import { useI18n } from "../../hooks/useI18n";
import { RootStackParamList } from "../../types/react-navigation";
import i18n from "../../utils/i18n/i18n";
import { BUTTON_RADIUS } from "../../utils/utils";

type ForgetPasswordEmailScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList, "ForgetPasswordEmail"
>

const schema = yup.object({
    email: yup.string().required(i18n.t(["translation", "ValidationErrors", "required"])).email(i18n.t("ValidationErrors.email")),
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
        <View style={{backgroundColor: theme.colors.white, flex:1, paddingHorizontal:16, justifyContent:"center"}}>

            <View style={{position:"absolute", top:64, paddingHorizontal:16, width:width}}>

                <View style={{flexDirection:"row", marginTop:16}}>
                    {/* ARROW LEFT İCON
                    <TouchableOpacity>
                        
                    </TouchableOpacity> */}
                    <View>
                        <Text style={{fontSize:24, color:theme.colors.black, fontWeight:"500"}}>{t("emailConfirm")}</Text>
                    </View>
                </View>
                <View style={{marginTop:16}}>
                    <Text style={{fontSize:16, fontWeight:"300", color:theme.colors.black}}>{t("emailConfirmSubText")}</Text>
                </View>

            </View>


            <Formik initialValues={{
                email:""
            }}
            validationSchema={schema}
            onSubmit={handleConfirmEmail}
            >
                {({errors, touched, values, handleChange, handleBlur, handleSubmit}) => (
                    console.log("error", errors),
                    <>
                    <View style={{marginTop:45}}>
                    <TextInput label={t("email")} value={values.email} onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    required isInvalid={errors.email != undefined && touched.email as boolean}
                    errorMessage={errors.email} />

                    
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