import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Formik } from "formik";
import { useTheme, View, Text } from "native-base";
import { useEffect, useRef, useState } from "react";
import { AppState, Dimensions, Platform, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import * as yup from "yup";
import { Button } from "../../components/Button";
import { BackIcon } from "../../components/BackIcon";
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

    const [code, setCode] = useState("");
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

    function handleSubmit() {

    }

    function handleConfirmCode() {
        navigation.push("RegisterConfirmPassword");
    }

    return(
        <SafeAreaView style={{backgroundColor: theme.colors.white, flex:1 }}>
            <View mt="28px" mx="16px">
                <CodeField
                    ref={ref}
                    {...props}
                    value={code}
                    onChangeText={setCode}
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

                <Text fontSize={16} color="darkText" fontWeight="300" mt="16px">{t("codeConfirmSubText")}</Text>

                <View flexDir="row" justifyContent="flex-end" mt="20px">
                    <Button title="Tekrar Kod Gönder" onPress={handleConfirmCode} />
                </View>

                <View mt="24px">
                    <Button title="Devam Et" onPress={handleSubmit} loading={false}/>
                </View>
            </View>
            
            <View style={{ marginTop: 15, flexDirection: "row", alignItems: "center", borderWidth: 0, justifyContent: "flex-end" }}>
                </View>


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
        </SafeAreaView>
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
