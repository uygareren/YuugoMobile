import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";
import { type RootStackParamList } from "../types/react-navigation";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Login"
>;

export default function Login(){
    const navigation = useNavigation<LoginScreenNavigationProp>();

    function handleLogin() {
        navigation.navigate("Screen2", {userId: "asd"});
    }

    return(
        <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
            <TouchableOpacity onPress={() => navigation.navigate("Screen2", { userId: "id" })}>
                <Button onPress={handleLogin}>Login</Button>
            </TouchableOpacity>
        </View>
    )
}