import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Formik } from "formik";
import { Text, View, useTheme } from "native-base";
import { useState } from "react";
import { Alert, Dimensions, Image, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import DateTimeInput from "../../components/input/DateTimeInput";
import TextInput from "../../components/input/TextInput";
import { useI18n } from "../../hooks/useI18n";
import { RootStackParamList } from "../../types/react-navigation";
import i18n from "../../utils/i18n/i18n";
import { BLUE1, MARGIN_HORİZONTAL } from "../../utils/utils";

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

    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [birthDate, setBirthDate] = useState(new Date);

    const [loading, setLoading] = useState(false);

    function handleUpdateProfile(){

    }

    function handleSavePhoto() {

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

                            <View mt="8px" style={{borderWidth:0, alignItems:"center"}}>
                                <View style={{borderWidth:4, borderColor:theme.colors.lightText, width:100, height:100, borderRadius:360, alignItems:"center", justifyContent:"center",

                                }}>
                                    {image ? (
                                        <Image source={{uri:image}} 
                                    style={{width:95, height:95, borderRadius:360}}/>
                                    ):(
                                        <Image source={require("../../../assets/images/bird.jpeg")} 
                                    style={{width:95, height:95, borderRadius:360}}/>
                                    )}
                                    
                                </View>

                                <TouchableOpacity 
                                onPress={() => handleSavePhoto()}
                                style={[styles.continueButton, { marginTop:16}]}>
                                <Text style={styles.continueButtonText}>{t("changePhoto")}</Text>
                            </TouchableOpacity>

                            </View>
                            
                            <View mt="8px">
                                <TextInput value={name} onChangeText={setName} placeholder={t("name")}/>
                            </View>
                            <View mt="8px">
                                <TextInput value={surname} onChangeText={setSurname} placeholder={t("surname")}/>
                            </View>
                            <View mt="8px">
                              <DateTimeInput
                                value={birthDate}
                                onChangeValue={(date) => setBirthDate(date)}
                                />
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
    continueButton: {
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: "white",
      },
      continueButtonText: {
        fontSize: 18,
        fontWeight: '900',
        color: BLUE1,
      },
})