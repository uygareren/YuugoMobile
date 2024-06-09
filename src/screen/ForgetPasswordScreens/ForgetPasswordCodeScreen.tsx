import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, View, useTheme } from "native-base";
import { useEffect, useRef, useState } from "react";
import { AppState, Dimensions, Platform, SafeAreaView, StyleSheet } from "react-native";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
import { BackIcon } from "../../components/BackIcon";
import { Button } from "../../components/Button";
import TitleText from "../../components/TitleText";
import { useI18n } from "../../hooks/useI18n";
import { RootStackParamList } from "../../types/react-navigation";
import i18n from "../../utils/i18n/i18n";
import { MARGIN_HORİZONTAL } from "../../utils/utils";

type ForgetPasswordCodeScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList, "ForgetPasswordCode"
>

export default function ForgetPasswordCodeScreen() {
    const { t } = useI18n("ForgetPasswordCodeScreen");
    const navigation = useNavigation<ForgetPasswordCodeScreenNavigationProp>();
    const theme = useTheme();
    const { width } = Dimensions.get("screen");

    const [counter, setCounter] = useState(90);
    const counterRef = useRef(counter);
    counterRef.current = counter;

    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const CELL_COUNT = 6;
    const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value: code, setValue: setCode });

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

    const handleAppStateChange = (nextAppState: any) => {
        if (nextAppState === "active") {
            const now = Date.now();
            const elapsed = Math.floor((now - backgroundTimestampRef.current) / 1000);
            setCounter((prevCounter: any) => Math.max(prevCounter - elapsed, 0));
        } else if (nextAppState === "background") {
            backgroundTimestampRef.current = Date.now();
        }
    };

    const backgroundTimestampRef = useRef(Date.now());

    function handleTryAgain() {
        setCounter(90);
    }

    function handleConfirmCode() {
        if (code.length !== CELL_COUNT) {
            setError(i18n.t(["translation", "ValidationErrors", "required"]));
        } else {
            setError('');
            navigation.push("ForgetPasswordConfirmPassword");
            console.log("Code entered:", code);
            // Perform the confirm code action here
        }
    }

    return (
        <SafeAreaView style={{backgroundColor: theme.colors.white, flex:1,paddingHorizontal:MARGIN_HORİZONTAL }}>
           
           <View>
                <BackIcon box={{ mt: "16px" }} />
                <TitleText fontSize="24px" fontWeight="900" mt={"16px"}>{t("title")}</TitleText>
                <Text color="gray.400" fontWeight="bold" mt="8px" fontSize={"16px"}>{t("codeConfirmSubText")}</Text>
            </View>

            <View style={{ marginTop: 45 }}>
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
                {error ? (
                    <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>
                        {error}
                    </Text>
                ) : null}
                <View mt="16px">
                    <Text fontSize="12px" fontWeight={"bold"}>{t("didNotGetCode")}<Text fontWeight="bold" color="primary.500"
                        fontSize="15px" mr="16px" onPress={handleTryAgain}>{t("resend")}
                        </Text>
                    </Text>
                </View>
                <Button title={t("continue")} isActive={code.length == 6} 
                textStyle={{fontSize:20, fontWeight:"800"}}
                onPress={handleConfirmCode} loading={false} mt="32px" />
                
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    cell: {
        width: Dimensions.get("screen").width * 0.115,
        height: Dimensions.get("screen").width * 0.115,
        lineHeight: 38,
        fontSize: 24,
        borderWidth:3,
        borderColor: "#d6d6d6",
        textAlign: 'center',
        margin: 5,
        borderRadius: 8,
        backgroundColor: "white",
        fontWeight: "700",
        alignItems:"center",
        justifyContent:"center"
    },
    focusCell: {
        backgroundColor: "white",
        color: "white",
        fontWeight: "700",
        borderWidth:3,
        borderColor:"#d6d6d6",
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

