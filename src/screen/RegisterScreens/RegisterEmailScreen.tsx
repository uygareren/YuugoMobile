import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Formik } from "formik";
import { Button, useTheme } from "native-base";
import { Dimensions, Text, View } from "react-native";
import * as yup from "yup";
import TextInput from "../../components/input/TextInput";
import { useI18n } from "../../hooks/useI18n";
import { RootStackParamList } from "../../types/react-navigation";
import i18n from "../../utils/i18n/i18n";

type RegisterEmailScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "RegisterEmail"
>

const schema = yup.object({
    email: yup.string().required(i18n.t(["translation", "ValidationErrors", "required"])).email(i18n.t("ValidationErrors.email")),
}).required();

export default function RegisterEmailScreen(){
    const { t } = useI18n("RegisterEmailScreen");
    const navigation = useNavigation<RegisterEmailScreenNavigationProp>();
    const theme = useTheme();
    const {width, height} = Dimensions.get("screen");


    function handleConfirmEmail(){

    }

    return(
        <View style={{backgroundColor: theme.colors.white, flex:1, paddingHorizontal:16, justifyContent:"center"}}>

            <View style={{position:"absolute", top:64, paddingHorizontal:16, borderWidth:1, width:width}}>

                <View style={{flexDirection:"row", marginTop:16}}>
                    {/* ARROW LEFT İCON
                    <TouchableOpacity>
                        
                    </TouchableOpacity> */}
                    <View>
                        <Text style={{fontSize:24, color:theme.colors.black, fontWeight:"500"}}>Email Confirm!</Text>
                    </View>
                </View>
                <View style={{marginTop:16}}>
                    <Text style={{fontSize:16, fontWeight:"500", color:theme.colors.black}}>Enter your email to register</Text>
                </View>

            </View>


            <Formik initialValues={{
                email:""
            }}
            validationSchema={schema}
            onSubmit={handleConfirmEmail}
            >
                {({errors, touched, values, handleChange, handleBlur, handleSubmit}) => (
                    <>
                    <View style={{marginTop:45}}>
                    <TextInput label={t("email")} value={values.email} onChangeText={handleChange("email")}
                                onBlur={handleBlur("email")}
                                required isInvalid={errors.email != undefined && touched.email as boolean}
                                errorMessage={errors.email} />
                    <Button onPress={() => handleSubmit()} mt="20px" py="20px"
                        alignSelf="center" width={width - 32} mx="16px" marginBottom="14px" 
                        >
                            Emaili Doğrula
                    </Button>

                    </View>
                    </>
                )}

            </Formik>
        </View>
    )
}