import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { type RootStackParamList } from "../types/react-navigation";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Screen1ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Screen1"
>;

export default function Screen1(){
    const navigation = useNavigation<Screen1ScreenNavigationProp>();

    return(
        <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
            <TouchableOpacity onPress={() => navigation.navigate("Screen2", { userId: "id" })}>
                <Text>Go to Screen2</Text>
            </TouchableOpacity>
        </View>
    )
}