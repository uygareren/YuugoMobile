import { CommonActions, useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import { type NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, View, useTheme, useToast } from "native-base";
import { useEffect, useRef, useState } from "react";
import { AppState, Dimensions, Platform, SafeAreaView, StyleSheet } from "react-native";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import api, { ResponseError } from "../../api/api";
import { Button } from "../../components/Button";
import { useI18n } from "../../hooks/useI18n";
import { RootStackParamList } from "../../types/react-navigation";
import TitleText from "../../components/TitleText";
import { BackIcon } from "../../components/BackIcon";

type RegisterConfirmCodeScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "RegisterConfirmCode"
>
type RegisterConfirmCodeScreenRouteProp = RouteProp<RootStackParamList, 'RegisterConfirmCode'>;

export default function RegisterConfirmCodeScreen(){

    const navigation = useNavigation<RegisterConfirmCodeScreenNavigationProp>();
    const route = useRoute<RegisterConfirmCodeScreenRouteProp>();
    const activationToken = route.params?.activationToken;
    
    const { t } = useI18n("RegisterConfirmCodeScreen");
    const theme = useTheme();
    const toast = useToast();

    const [loading, setLoading] = useState(false);
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
    
    const CELL_COUNT = 5;
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

    function handleTryAgain() {
        setCounter(90);
    }

    async function handleSubmit() {
        try {
            setLoading(true);
            const resp = await api.post("/auth/verify/register", {
                activationToken, accessCode: value
            });

            setLoading(false);
            
            navigation.dispatch(
                CommonActions.reset({
                    routes: [
                        { 
                            name: "RegisterConfirmPassword", params: {
                                jwt: resp.data.data.jwt
                            }
                        }
                    ],
                    index: 0
                })
            );
        } catch (error: any) {
            setLoading(false);
            
            const errorCode = error.response.data.errorCode as ResponseError;
            if(errorCode == ResponseError.ACTIVATION_CODE_BANNED) {
                toast.show({
                    title: t("loginError"),
                });
            } else if(errorCode == ResponseError.WRONG_CONFIRMATION_CODE) {
                toast.show({
                    title: t("loginError"),
                });
            } else {
                toast.show({
                    title: t("unknownError"),
                });
            }
        }
    }

    function handleConfirmCode() {
        navigation.push("RegisterConfirmPassword", { jwt:"asdsa" })

    }

    return(
        <SafeAreaView style={{backgroundColor: theme.colors.white, flex:1 }}>
            <View mx="16px">
                <BackIcon box={{ mt: "16px" }} />
                <TitleText alignSelf="center">{t("title")}</TitleText>
                <Text color="gray.400" fontWeight="semibold" mt="8px">{t("codeConfirmSubText")}</Text>
            </View>

            <View mt="20px" mx="16px">
                <CodeField
                    ref={ref}
                    {...props}
                    value={value}
                    onChangeText={setValue}
                    cellCount={CELL_COUNT}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' }) as any}
                    testID="my-code-input"
                    renderCell={({ index, symbol, isFocused }) => (
                        <Text
                            key={index}
                            style={[
                                styles.cell,
                                isFocused && {...styles.focusCell, borderColor: theme.colors.primary[500]},
                                symbol ? {borderColor: theme.colors.primary[500]} : null,
                            ]}
                            onLayout={getCellOnLayoutHandler(index)}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    )}
                />
                <View mt="8px">
                    <Text fontSize="13px">{t("didNotGetCode")}<Text fontWeight="bold" color="primary.500"
                        fontSize="15px" mr="16px" onPress={handleTryAgain}>{t("resend")}
                        </Text>
                    </Text>
                </View>

                <Button title={t("btnText")} onPress={handleConfirmCode} loading={loading} mt="24px" />
                
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
        color: "#585858",
        fontWeight: "600",
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
