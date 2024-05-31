import { useRoute, type RouteProp } from "@react-navigation/native";
import { Text, View } from "react-native"
import { type RootStackParamList } from "../types/react-navigation";

type Screen2ScreenRouteProp = RouteProp<RootStackParamList, "Screen2">;

export default function Screen2(){
    const route = useRoute<Screen2ScreenRouteProp>();

    console.log(route.params.userId);

    return(
        <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
            <Text>Screen2</Text>
        </View>
    )
}