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
            
            if(data.userInfo) {
                let stepper = 0;
                if(data.userInfo.languages == null) {
                    dispatch(accountSliceActions.setJwt(jwt));
                    navigation.dispatch(
                        CommonActions.reset({
                            routes: [
                                { name: "RegisterInfo", params: { stepper: 5 } }
                            ],
                            index: 0
                        })
                    );
                } else if(data.userInfo.isActiveAccount == 0) { // Not Insert Toopics
                    dispatch(accountSliceActions.setJwt(jwt));
                    navigation.dispatch(
                        CommonActions.reset({
                            routes: [
                                { name: "RegisterInfo", params: { stepper: 7 } }
                            ],
                            index: 0
                        })
                    );
                } else {
                    dispatch(accountSliceActions.setAccount(data));
                    navigation.dispatch(
                        CommonActions.reset({
                            routes: [
                                { name: "Tab" }
                            ],
                            index: 0
                        })
                    );
                }

                
                setLoading(false);
            } else {
                dispatch(accountSliceActions.setJwt(jwt));
                console.log("iinnn");
                navigation.dispatch(
                    CommonActions.reset({
                        routes: [
                            { name: "RegisterInfo", params: { stepper: 0 } }
                        ],
                        index: 0
                    })
                );
                setLoading(false);
            }           
            
        } catch (error: any) {
            // await removeSecureStoreToken();
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