import { TouchableOpacity } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

type GoBackProp = {
    navigation:any
}

export const GoBack:React.FC<GoBackProp> = ({navigation}) => {


    return(
        <TouchableOpacity onPress={() => navigation.goBack()} style={{borderWidth:0, alignItems:"center", justifyContent:"center", padding:5, 
            borderRadius:4, backgroundColor:"#e8e6e6"
        }}>
            <Entypo name="chevron-left" color="black" size={24}/>
        </TouchableOpacity>
    )
}