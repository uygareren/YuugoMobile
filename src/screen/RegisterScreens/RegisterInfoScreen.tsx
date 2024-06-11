import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { RootStateType } from "../../store/store";

export default function RegisterInfoScreen() {
    const jwt = useSelector<RootStateType>(state => state.account.jwt);

    return (
        <SafeAreaView>
            
        </SafeAreaView>
    )
}