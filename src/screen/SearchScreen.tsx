import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, View, useTheme } from "native-base";
import { useState } from "react";
import { Dimensions, FlatList, Pressable, SafeAreaView, StyleSheet } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch } from "react-redux";
import { Header } from "../components/Header";
import TextInput from "../components/input/TextInput";
import { useI18n } from "../hooks/useI18n";
import { RootStackParamList } from "../types/react-navigation";
import { BLUE1, MARGIN_HORİZONTAL } from "../utils/utils";

type SearchScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Search">;


const {width, height} = Dimensions.get("screen");

export default function SearchScreen(){

    const navigation = useNavigation<SearchScreenNavigationProp>();
    const { t } = useI18n("AccountScreen");
    const theme = useTheme();
    const dispatch = useDispatch();

    const [search, setSearch] = useState("");
    const [selectedSearchTopic, setSelectedSearchTopic] = useState("1");

    const mockSearchData = [
        {
            "id": 1,
            "searchTerm": "JavaScript tutorial",
            "timestamp": "2024-06-25T08:30:00Z"
        },
        {
            "id": 2,
            "searchTerm": "React Native styling",
            "timestamp": "2024-06-25T09:00:00Z"
        },
        {
            "id": 3,
            "searchTerm": "CSS grid examples",
            "timestamp": "2024-06-25T09:30:00Z"
        },
        {
            "id": 4,
            "searchTerm": "Python data analysis",
            "timestamp": "2024-06-25T10:00:00Z"
        },
        {
            "id": 5,
            "searchTerm": "Machine learning basics",
            "timestamp": "2024-06-25T10:30:00Z"
        },
        {
            "id": 6,
            "searchTerm": "Django vs Flask",
            "timestamp": "2024-06-25T11:00:00Z"
        },
        {
            "id": 7,
            "searchTerm": "GraphQL tutorial",
            "timestamp": "2024-06-25T11:30:00Z"
        },
        {
            "id": 8,
            "searchTerm": "Docker container setup",
            "timestamp": "2024-06-25T12:00:00Z"
        },
        {
            "id": 9,
            "searchTerm": "Kubernetes basics",
            "timestamp": "2024-06-25T12:30:00Z"
        },
        {
            "id": 10,
            "searchTerm": "Node.js performance tuning",
            "timestamp": "2024-06-25T13:00:00Z"
        }
    ]
""
    const RenderLastSearched = ({item}:any) => {
        return(
            <View style={{marginVertical:12, flexDirection:"row", alignItems:"center", justifyContent:"space-between",
                paddingHorizontal:12}}>
                <View>
                    <Text style={{fontSize:16, fontWeight:"900", color:theme.colors.lightText}}>{item.searchTerm}</Text>
                </View>
                <Pressable>
                    <AntDesign name="close" color={"black"} size={16}/>
                </Pressable>
            </View>
        )
    }
    


    return(
        <SafeAreaView style={[styles.safeAreaView, { backgroundColor: theme.colors.white }]}>
            <Header title={"Oda veya Kullanıcı Ara"}/>

            <View mt="16px" style={{borderWidth:0}}>
                <TextInput value={search} onChangeText={setSearch} placeholder="Ara.." />

                {/* <View mt="16px" style={{flexDirection:"row", }}>

                    <Pressable 
                    onPress={() => setSelectedSearchTopic("1")}
                    style={{flex:1, marginTop:8, alignItems:"center", justifyContent:"center"}}>
                        <Text style={{fontSize:18, fontWeight:"900", marginBottom:4,}}>Oda</Text>
                        {selectedSearchTopic == "1" ? (
                            <View style={{height:2, width:120,backgroundColor:theme.colors.lightText}}/>
                        ): null}
                    </Pressable>

                    <Pressable 
                    onPress={() => setSelectedSearchTopic("2")}
                    style={{flex:1, marginTop:8, alignItems:"center", justifyContent:"center"}}>
                        <Text style={{fontSize:18, fontWeight:"900",marginBottom:4,}}>Kullanıcı</Text>
                        {selectedSearchTopic == "2" ? (
                            <View style={{ height:2, width:120,backgroundColor:theme.colors.lightText}}/>
                        ): null}
                    </Pressable>

                </View> */}

                <View mt="24px" style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                    <View>
                        <Text style={{fontSize:20, fontWeight:"800"}}>En son arananlar</Text>
                    </View>
                    <View>
                        <Text style={{fontSize:13, fontWeight:"900", color:BLUE1}}>Hepsini Sil</Text>
                    </View>
                </View>

                <View mt="24px">
                    <FlatList
                        data={mockSearchData}
                        keyExtractor={item => item.id.toString()}
                        renderItem={RenderLastSearched}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        paddingHorizontal: MARGIN_HORİZONTAL,
    },
    
});
