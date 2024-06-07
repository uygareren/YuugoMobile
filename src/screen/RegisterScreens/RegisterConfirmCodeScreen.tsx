import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Formik } from "formik";
import { useTheme } from "native-base";
import { useEffect, useRef, useState } from "react";
import { AppState, Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import * as yup from "yup";
import { ButtonComp } from "../../components/ButtonComp";
import { GoBackComponent } from "../../components/GoBackComponent";
import { useI18n } from "../../hooks/useI18n";
import { RootStackParamList } from "../../types/react-navigation";
import { BUTTON_RADIUS } from "../../utils/utils";

type RegisterConfirmCodeScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "RegisterConfirmCode"
>

const schema = yup.object({
    code: yup.string().required("sdasdasd  ascasda")
}).required();

export default function RegisterConfirmCodeScreen(){

    const { t } = useI18n("RegisterConfirmCodeScreen");
    const navigation = useNavigation<RegisterConfirmCodeScreenNavigationProp>();
    const theme = useTheme();
    const {width, height} = Dimensions.get("screen");

    const [counter, setCounter] = useState(90);
    const counterRef = useRef(counter);
    counterRef.current = counter;

    useEffect(() => {
        const timer = setInterval(() => {
            if (counterRef.current > 0) {
                setCounter(counterRef.current - 1);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const appStateListener = AppState.addEventListener("change", handleAppStateChange);
        return () => appStateListener.remove();
    }, []);

    const handleAppStateChange = (nextAppState:any) => {
        if (nextAppState === "active") {
            const now = Date.now();
            const elapsed = Math.floor((now - backgroundTimestampRef.current) / 1000);
            setCounter((prevCounter) => Math.max(prevCounter - elapsed, 0));
        } else if (nextAppState === "background") {
            backgroundTimestampRef.current = Date.now();
        }
    };

    const backgroundTimestampRef = useRef(Date.now());
    
    const CELL_COUNT = 6;
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

    function handleTryAgain() {
       
        setCounter(90);
    }

    function handleConfirmCode(values: { code: string }) {
        navigation.push("RegisterConfirmPassword");
        console.log("Code entered:", values.code);
        // Perform the confirm code action here
    }

    return(
        <View style={{backgroundColor: theme.colors.white, flex:1, paddingHorizontal:16, justifyContent:"center"}}>
            
            <View style={{position:"absolute", top:64, paddingHorizontal:16, width:width}}>
            <View style={{flexDirection:"row", marginTop:16}}>
                   <GoBackComponent navigation={navigation}/>
                    <View style={{marginLeft:8}}>
                        <Text style={{fontSize:24, color:theme.colors.black, fontWeight:"500"}}>{t("codeConfirm")}</Text>
                    </View>
                </View>
                <View style={{marginTop:16}}>
                    <Text style={{fontSize:16, fontWeight:"300", color:theme.colors.black}}>{t("codeConfirmSubText")}</Text>
                </View>                
            </View>

            <Formik initialValues={{
                code:""
            }}
            validationSchema={schema}
            onSubmit={handleConfirmCode}
            >
                {({errors, touched, values, handleChange, handleBlur, handleSubmit}) => (
                    <>
                    <View style={{marginTop:45}}>
                    <CodeField
                        ref={ref}
                        {...props}
                        value={values.code}
                        onChangeText={handleChange("code")}
                        cellCount={CELL_COUNT}
                        rootStyle={{ width: "100%", alignItems: "center" }}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' }) as any}
                        testID="my-code-input"
                        renderCell={({ index, symbol, isFocused }) => (
                            <Text
                                key={index}
                                style={[styles.cell, isFocused && styles.focusCell]}
                                onLayout={getCellOnLayoutHandler(index)}>
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        )}
                    />

                    {touched.code && errors.code && (
                        <Text style={{color: 'red', textAlign: 'center', marginTop: 10}}>
                            {errors.code}
                        </Text>
                    )}

<View style={{ marginTop: 15, flexDirection: "row", alignItems: "center", borderWidth: 0, justifyContent: "flex-end" }}>
                    <Text style={{ fontSize: 13, fontWeight: "500", color: "black" }}>Sorun mu yaşıyorsun? </Text>
                    <TouchableOpacity onPress={handleTryAgain}>
                        <Text style={{ fontSize: 13, fontWeight: "700", color: "green" }}>Tekrar kod gönder</Text>
                    </TouchableOpacity>
                </View>

                    <ButtonComp onPress={handleSubmit} 
                    containerStyle={{marginTop:32, paddingVertical:16, alignItems:"center", justifyContent:"center",
                    borderRadius:BUTTON_RADIUS, backgroundColor:"blue"}}
                    textStyle={{color:theme.colors.white, fontWeight:"600", fontSize:16}}
                    loading={false}/>
                    

                    <View style={{ marginTop: 25 }}>
                    {counter > 0 ? (
                        <Text style={styles.timerText}>{counter} saniye</Text>
                    ) : (
                        <TouchableOpacity onPress={handleTryAgain}
                            style={{
                                alignSelf: 'center', borderWidth: 1.5, borderColor: "black",
                                paddingVertical: 6, paddingHorizontal: 16, borderRadius: 5,
                            }}>
                            <Text style={styles.tryAgainText}>Tekrar Dene</Text>
                        </TouchableOpacity>
                    )}
                </View>

                    </View>
                    </>
                )}

            </Formik>
                
        </View>
    )
}

const styles = StyleSheet.create({
    cell: {
        width: Dimensions.get("screen").width * 0.115,
        height: Dimensions.get("screen").width * 0.115,
        lineHeight: 38,
        fontSize: 24,
        borderColor: 'gray',
        textAlign: 'center',
        margin: 5,
        borderRadius: 8,
        backgroundColor: "white",
        borderWidth:1,
        color: "gray",
        fontWeight: "700",
    },
    focusCell: {
        backgroundColor: "white",
        color: "white",
        fontWeight: "700",
        fontSize: 24,
    },
    timerText: {
        textAlign: 'center',
        color: "gray",
        fontSize: 14,
        fontWeight: "700",
    },
    tryAgainText: {
        textAlign: 'center',
        color: "blue",
        fontSize: 16,
        fontWeight: "600",
    }
});
