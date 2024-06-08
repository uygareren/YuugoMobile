import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTheme } from "native-base";
import { useEffect, useRef, useState } from "react";
import { AppState, Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
import { BackIcon } from "../../components/BackIcon";
import { Button } from "../../components/Button";
import { useI18n } from "../../hooks/useI18n";
import { RootStackParamList } from "../../types/react-navigation";
import i18n from "../../utils/i18n/i18n";
import { BUTTON_RADIUS } from "../../utils/utils";

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
        <View style={{ backgroundColor: theme.colors.white, flex: 1, paddingHorizontal: 16, justifyContent: "center" }}>
            <View style={{ position: "absolute", top: 64, paddingHorizontal: 16, width: width }}>
                <View style={{ flexDirection: "row", marginTop: 16, alignItems: "center" }}>
                    <BackIcon />
                    <View style={{ marginLeft: 8 }}>
                        <Text style={{ fontSize: 24, color: theme.colors.black, fontWeight: "500" }}>{t("codeConfirm")}</Text>
                    </View>
                </View>
                <View style={{ marginTop: 16 }}>
                    <Text style={{ fontSize: 16, fontWeight: "300", color: theme.colors.black }}>{t("codeConfirmSubText")}</Text>
                </View>
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
                <View style={{ marginTop: 15, flexDirection: "row", alignItems: "center", borderWidth: 0, justifyContent: "flex-end" }}>
                    <Text style={{ fontSize: 13, fontWeight: "500", color: "black" }}>Sorun mu yaşıyorsun? </Text>
                    <TouchableOpacity onPress={handleTryAgain}>
                        <Text style={{ fontSize: 13, fontWeight: "700", color: "green" }}>Tekrar kod gönder</Text>
                    </TouchableOpacity>
                </View>
                <Button onPress={handleConfirmCode} title="Devam et"
                    style={{
                        marginTop: 32, paddingVertical: 16, alignItems: "center", justifyContent: "center",
                        borderRadius: BUTTON_RADIUS, backgroundColor: "blue"
                    }}
                    textStyle={{ color: theme.colors.white, fontWeight: "600", fontSize: 16 }}
                    loading={false} />
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
        </View>
    );
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
        borderWidth: 1,
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
