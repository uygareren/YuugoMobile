import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, I18nManager} from "react-native";
import { type RootStackParamList } from "../types/react-navigation";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Text } from "native-base";
import { useI18n } from "../hooks/useI18n";

type LoginScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Login"
>;

export default function Login(){
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const { t } = useI18n("Login");

    function handleLogin() {
        navigation.navigate("Screen2", {userId: "asd"});
    }

    return(
        <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
            <TouchableOpacity onPress={() => navigation.navigate("Screen2", { userId: "id" })}>
                <Button onPress={handleLogin}>Login</Button>
                <Text>{t("hello")}</Text>
            </TouchableOpacity>
        </View>
    )
}