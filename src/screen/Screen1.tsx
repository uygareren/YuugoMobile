import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";

export default function Screen1(){

    const navigation = useNavigation<any>();

    return(
        <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
            <TouchableOpacity onPress={() => navigation.navigate("Screen2")}>
                <Text>Go to Screen2</Text>
            </TouchableOpacity>
        </View>
    )
}