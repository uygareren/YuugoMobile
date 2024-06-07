import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Formik } from "formik";
import { useTheme, View, Text } from "native-base";
import { Dimensions, SafeAreaView } from "react-native";
import * as yup from "yup";
import { Button } from "../../components/ButtonComp";
import TextInput from "../../components/input/TextInput";
import { useI18n } from "../../hooks/useI18n";
import { RootStackParamList } from "../../types/react-navigation";
import i18n from "../../utils/i18n/i18n";
import { BUTTON_RADIUS } from "../../utils/utils";
import { BackIcon } from "../../components/BackIcon";

type RegisterEmailScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "RegisterEmail"
>

const schema = yup.object({
    email: yup.string().required(i18n.t("ValidationErrors.required")).email(i18n.t("ValidationErrors.email")),
}).required();

export default function RegisterEmailScreen(){
    const { t } = useI18n("RegisterEmailScreen");
    const navigation = useNavigation<RegisterEmailScreenNavigationProp>();
    const theme = useTheme();
    const {width, height} = Dimensions.get("screen");

    function handleConfirmEmail(){
        navigation.navigate("RegisterConfirmCode");
    }

    return(
        <SafeAreaView style={{backgroundColor: theme.colors.white, flex:1}}>

            
            <View mt="16px" ml="16px">
                <BackIcon title="Email Doğrula" />
                <Text mt="16px" maxWidth="85%" fontSize="15px" fontWeight="300" >{t("emailConfirmSubText")}</Text>
            </View>

            <Formik initialValues={{
                email:""
            }}
            validationSchema={schema}
            onSubmit={handleConfirmEmail}
            >
                {({errors, touched, values, handleChange, handleBlur, handleSubmit}) => (
                    console.log("error", errors),
                    <View mt="32px" mx="16px">
                        <TextInput label={t("email")} value={values.email} onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        required isInvalid={errors.email != undefined && touched.email as boolean}
                        errorMessage={errors.email} />

                        <Button onPress={handleSubmit} 
                            style={{marginTop:32}} title="Kaydol"
                            loading={false}/>
                        

                    </View>
                )}

            </Formik>
        </SafeAreaView>
    )
}