import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Formik } from "formik";
import { View, useTheme } from "native-base";
import { useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import PasswordInput from "../../components/input/PasswordInput";
import { useI18n } from "../../hooks/useI18n";
import { RootStackParamList } from "../../types/react-navigation";
import i18n from "../../utils/i18n/i18n";
import { MARGIN_HORİZONTAL } from "../../utils/utils";

type UpdateProfileScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "UpdatePassword"
>;

const schema = yup.object({
    password: yup.string().required(i18n.t("ValidationErrors.required"))
    .min(6, i18n.t("ValidationErros.passwordMinLength"))
}).required();

export default function UpdateProfileScreen(){

    const navigation = useNavigation<UpdateProfileScreenNavigationProp>();
    const { t } = useI18n("UpdateProfileScreen");
    const { width, height } = Dimensions.get("screen");
    const theme = useTheme();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    function handleUpdateProfile(){

    }

    return(
        <SafeAreaView style={[styles.safeAreaView, { backgroundColor: theme.colors.white }]}>
            <Header title={t("title")}/>
            <Formik initialValues={{
                currentPassword: "",
                password1: "",
                password2: ""
            }}
                validationSchema={schema}
                onSubmit={handleUpdateProfile}
                >
                    {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
                    <View  mt="28px">
                        <View style={{ rowGap: 12 }}>
                            
                            <View mt="8px">
                                <PasswordInput value={values.currentPassword} onChangeText={handleChange("password")}
                                    onBlur={handleBlur("password")} placeholder={t("currentPassword")}
                                    required isInvalid={errors.currentPassword != undefined && touched.currentPassword as boolean}
                                    errorMessage={errors.currentPassword} />
                            </View>
                            
                            <View mt="8px">
                                <PasswordInput value={values.password1} onChangeText={handleChange("password")}
                                    onBlur={handleBlur("password")} placeholder={t("password1")}
                                    required isInvalid={errors.password1 != undefined && touched.password1 as boolean}
                                    errorMessage={errors.password1} />
                            </View>

                            <View mt="16px">
                                <PasswordInput value={values.password2} onChangeText={handleChange("password")}
                                    onBlur={handleBlur("password")} placeholder={t("password2")}
                                    required isInvalid={errors.password2 != undefined && touched.password2 as boolean}
                                    errorMessage={errors.password2} />
                            </View>
                           
                            
                        </View>

                        

                        <Button onPress={() => handleSubmit()} isActive={true} mt="20px"
                        loading={loading} title={t("update")} mb="8px" />
                    </View>
                )}
                    
            </Formik>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        paddingHorizontal: MARGIN_HORİZONTAL
    },
})