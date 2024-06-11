import { Text, View } from "native-base";
import { useEffect, useState } from "react";
import api from "../api/api";
import { getJwtToken, removeSecureStoreToken } from "../utils/AsyncStorage";
import { accountSliceActions } from "../store/slices/accountSlice";
import { useDispatch } from "react-redux";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/react-navigation";

type LoginScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Login"
>;

export default function AuthProvider({ children }: any) {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation<LoginScreenNavigationProp>();

    useEffect(() => {
        main();
    }, []);

    async function main() {
        setLoading(false);
        return false;
        try {
            const jwt = await getJwtToken();

            if(jwt == false) {
                setLoading(false);
                return -1;    
            }

            const resp = await api.post("/auth", null,  {
                headers: {
                    authorization: `Bearer ${jwt}`
                }
            });

            const data = resp.data.data;
            console.log("data", data);
            if(data.userInfo) {
                dispatch(accountSliceActions.setAccount(data));
                navigation.dispatch(
                    CommonActions.reset({
                        routes: [
                            { name: "Home" }
                        ],
                        index: 0
                    })
                );
                setLoading(false);
            } else {
                navigation.dispatch(
                    CommonActions.reset({
                        routes: [
                            { name: "RegisterInfo" }
                        ],
                        index: 0
                    })
                );
                setLoading(false);
            }           
            
        } catch (error: any) {
            await removeSecureStoreToken();
            setLoading(false);
        }
    }

    if(!loading) {
        return children;
    }

    /// ÖYLESİNE TASARIM :D
    return (
        <View>
            <Text fontSize="41xp" color="blue.600">SPLASH SCREEN</Text>
        </View>
    )
}