import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Formik } from "formik";
import { Text, View, useTheme, useToast } from "native-base";
import { useEffect, useState } from "react";
import { Dimensions, Image, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import DateTimeInput from "../../components/input/DateTimeInput";
import TextInput from "../../components/input/TextInput";
import { useI18n } from "../../hooks/useI18n";
import { RootStackParamList } from "../../types/react-navigation";
import i18n from "../../utils/i18n/i18n";
import { BLUE1, MARGIN_HORİZONTAL, formatDate } from "../../utils/utils";
import { RootStateType } from "../../store/store";
import SelectInput from "../../components/input/SelectInput";
import api from "../../api/api";
import { SelectCard } from "../../components/cards/SelectCard";
import { accountSliceActions } from "../../store/slices/accountSlice";

type UpdateProfileScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "UpdatePassword"
>;

const schema = yup.object({
    name: yup.string().required(i18n.t("ValidationErrors.required")),
    surname: yup.string().required(i18n.t("ValidationErrors.required")),
}).required();

export default function UpdateProfileScreen(){

    const { t } = useI18n("UpdateProfileScreen");
    const theme = useTheme();
    const dispatch = useDispatch();
    const toast = useToast();

    const userInfo = useSelector<RootStateType, any>(state => state.account.userInfo);
    const jwt = useSelector<RootStateType, any>(state => state.account.jwt);

    const [birthDate, setBirthDate] = useState(new Date(userInfo.birthDate));
    const [countryId, setCountryId] = useState(userInfo.countryId);
    const [countryData, setCountryData] = useState<{label: string, image: string, value: number}[]>([]);
    const [gender, setGender] = useState(userInfo.gender);

    useEffect(() => {
        getAllCountry();
    }, []);

    async function getAllCountry() {
        try {
            const {data} = await api.get("/user/country");

            let _data: any[] = [];
            data.data.forEach((value: any) => {
                _data.push({
                    label: value.name,
                    value: value.id,
                    image: value.flag
                })
            });
            setCountryData(_data);
        } catch {
        }
    }

    async function handleUpdateProfile(values: any){
        console.log(values);
        try {
            api.put("/user/update", {
                name: values.name,
                surname: values.surname,
                birthDate: formatDate(birthDate),
                countryId: parseInt(countryId),
                gender: gender
            }, {
                headers: {
                    authorization: `Bearer ${jwt}`
                }
            });
            toast.show({
                title: t("successMessage")
            });
            dispatch(accountSliceActions.editAccountInfo({
                name: values.name,
                surname: values.surname,
                birthDate: birthDate,
                countryId: parseInt(countryId),
                gender: gender
            }))
        } catch {
            
        }
    }
   
    return(
        <SafeAreaView style={[styles.safeAreaView, { backgroundColor: theme.colors.white }]}>
            <Header style={{ marginTop: 16 }} title={t("title")}/>
            <Formik initialValues={{
                name: userInfo.name,
                surname: userInfo.surname,
            }}
                validationSchema={schema}
                onSubmit={handleUpdateProfile}
                >
                    {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
                    <View mx="16px" mt="28px" flex={1} justifyContent="space-between">
                        <View style={{ rowGap: 12 }}>        
                            <TextInput value={values.name} onChangeText={handleChange("name")} onBlur={handleBlur("name")} 
                            placeholder={t("name")} required isInvalid={errors.name != undefined && touched.name as boolean}
                            errorMessage={errors.name as string}/>
                            <TextInput value={values.surname} onChangeText={handleChange("surname")} onBlur={handleBlur("surname")}
                            placeholder={t("surname")} required isInvalid={errors.surname != undefined && touched.surname as boolean}
                            errorMessage={errors.surname as string}/>
                            <DateTimeInput value={birthDate} onChangeValue={(date) => setBirthDate(date)} />
                            <SelectInput items={countryData} value={countryId.toString()} 
                            onValueChange={(itemId) => setCountryId(parseInt(itemId))} />
                            <View flexDir="row" justifyContent="space-between" style={{ gap: 16 }}>
                                <SelectCard text={t("male")} isSelected={gender == "male"}
                                onPress={() => setGender("male")} containerStyle={{ flex: 1 }} />
                                <SelectCard text={t("female")} isSelected={gender == "female"}
                                onPress={() => setGender("female")} containerStyle={{ flex: 1 }} />
                            </View>
                        </View>

                        <Button onPress={handleSubmit} isActive={true} mt="20px"
                        title={t("update")} mb="16px" />
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
    }
})