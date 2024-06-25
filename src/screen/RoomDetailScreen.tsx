import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Actionsheet, Text, View, useTheme } from "native-base";
import { useState } from "react";
import { Dimensions, FlatList, Image, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { SvgUri } from "react-native-svg";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useDispatch } from "react-redux";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { useI18n } from "../hooks/useI18n";
import { RootStackParamList } from "../types/react-navigation";
import { MARGIN_HORİZONTAL } from "../utils/utils";


type RoomDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Explore">;


export default function RoomDetailScreen(){

    const navigation = useNavigation<RoomDetailScreenNavigationProp>();
    const { t } = useI18n("AccountScreen");
    const {width, height} = Dimensions.get("screen");
    const theme = useTheme();
    const dispatch = useDispatch();

    const [isUserSheetVisible, setIsUserSheetVisible] = useState(false);

    const mockUserData = [
        {
            id: "1",
            name: "User 1",
            avatar: "../../assets/images/bird.jpeg",
        },
        {
            id: 2,
            name: "User 2",
            avatar: "../../assets/images/bird.jpeg",
        },
        {
            "id": 3,
            "name": "User 3",
            "avatar": "../../assets/images/bird.jpeg",
        },
        {
            "id": 4,
            "name": "User 4",
            "avatar": "../../assets/images/bird.jpeg",
        },
        {
            "id": 5,
            "name": "User 5",
            "avatar": "../../assets/images/bird.jpeg",
        }      
    ]

    const RenderUser = ({item}:any) => {
        return(
            <TouchableOpacity 
            onPress={() => setIsUserSheetVisible(true)}
            style={{paddingHorizontal:12, marginVertical:8, borderBottomWidth:7, 
            borderRadius:8, flexDirection:"row", alignItems:"center", backgroundColor:"#a1a2ff", borderColor:"#7e72fc",
            paddingVertical:6}}>
                <View style={{width:50, height:50, borderRadius:360, borderWidth:3, borderColor:theme.colors.lightText,
                    alignItems:"center", justifyContent:"center"
                }}>
                    <Image source={require("../../assets/images/bird.jpeg")}
                        style={{width:45, height:45, borderRadius:360}}
                    />
                </View>
                <View style={{marginLeft:12,}}>
                    <Text style={{fontSize:18, fontWeight:"900", color:"white"}}>User 1</Text>
                </View>
            </TouchableOpacity>
        )
    }
    
    return(
        <SafeAreaView style={[styles.safeAreaView, { backgroundColor: theme.colors.white }]}>
            <Header title={"Sohbet Detay"}/>

            <View mt="16px" bgColor={"#f5f5fc"} style={{ alignItems:"center", paddingVertical:12, borderRadius:8}}>
                <Text style={{fontSize:22, fontWeight:"900", color:"black"}}>Sohbet Detay Title</Text>

                <View mt="32px" style={{ flexDirection:"row", width:"100%", justifyContent:"space-around"}}>
                    
                    <View >
                        <View style={{flexDirection:"row", alignItems:"center",marginTop:12}}>
                            <SvgUri uri={"https://hatscripts.github.io/circle-flags/flags/tr.svg"} width="24" height="24" />
                            <View>
                                <Text style={{marginLeft:8, fontSize:18, fontWeight:"400", color:"black"}}>Türkçe</Text>
                            </View>
                        </View>

                        <View style={{flexDirection:"row", alignItems:"center", marginTop:12}}>
                        <MaterialIcons name="network-wifi-3-bar" color={"black"} size={24}/>
                        <View>
                            <Text style={{marginLeft:8, fontSize:18, fontWeight:"400", color:"black"}}>Beginner</Text>
                        </View>
                    </View>

                    </View>

                    <View >
                        <View style={{flexDirection:"row", alignItems:"center", marginTop:12}}>
                    <AntDesign name="clockcircleo" color={"black"} size={24}/>    
                    <View>
                            <Text style={{marginLeft:8, fontSize:18, fontWeight:"400", color:"black"}}>30 Dakika</Text>
                        </View>
                    </View>

                    <View style={{flexDirection:"row", alignItems:"center", marginTop:12}}>
                    <FontAwesome6 name="people-group" color={"black"} size={24}/>    
                    <View>
                            <Text style={{marginLeft:8, fontSize:18, fontWeight:"400", color:"black"}}>6 Kontenjan</Text>
                        </View>
                    </View>
                    </View>

                </View>

                

            </View>

            <View mt="32px" style={{ maxHeight:height*0.5}}>
                <Text style={{fontSize:20, fontWeight:"900"}}>Kullanıcılar</Text>
                <FlatList
                    contentContainerStyle={{marginTop:8}}
                    showsVerticalScrollIndicator={false}
                    data={mockUserData}
                    keyExtractor={item => item.id.toString()}
                    renderItem={RenderUser}
                />
            </View>
            <View style={{position:"absolute", bottom:32, left:0, right:0,width:width}}>

            <Button title="SOHBETE KATIL" onPress={() => console.log("asd")} 
                style={{ width:width-32, alignSelf:"center"}}/>
            </View>

            <Actionsheet isOpen={isUserSheetVisible} onClose={() => setIsUserSheetVisible(false)}>
                <Actionsheet.Content>
                        <Actionsheet.Item >
                            {/* <View style={{flexDirection:"row"}}>
                                <View style={{width:50, height:50, borderRadius:360, borderWidth:3, borderColor:theme.colors.lightText,
                                        alignItems:"center", justifyContent:"center"
                                    }}>
                                        <Image source={require("../../assets/images/bird.jpeg")}
                                            style={{width:45, height:45, borderRadius:360}}
                                        />
                                </View>

                                <View style={{marginLeft:12}}>
                                    <Text style={{fontSize:20, fontWeight:"900", color: theme.colors.black}}>Name Surname</Text>
                                    <Text style={{fontSize:14, fontWeight:"900",}}>username</Text>
                                </View>

                            </View>

                            <View mt="24px">
                                <View style={{flexDirection:"row", alignItems:"center",}}>
                                    <SvgUri uri={"https://hatscripts.github.io/circle-flags/flags/tr.svg"} width="24" height="24" />
                                    <View>
                                        <Text style={{marginLeft:8, fontSize:18, fontWeight:"900", color:"black"}}>Türkiye</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection:"row", alignItems:"center", marginTop:12}}>
                                    <MaterialIcons name="network-wifi-3-bar" color={"black"} size={24}/>
                                    <View>
                                        <Text style={{marginLeft:8, fontSize:18, fontWeight:"900", color:"black"}}>Beginner</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection:"row", alignItems:"center", marginTop:12}}>
                                    <View>
                                        <Text>YG</Text>
                                    </View>
                                    <View>
                                        <Text style={{marginLeft:8, fontSize:18, fontWeight:"400", color:"black"}}>1140 </Text>
                                    </View>
                                </View>
                            </View> */}

                            <View style={{flexDirection:"row",  width:width-32, alignSelf:"center", justifyContent:"space-between"}}>
                                <View style={{flexDirection:"row", alignItems:"center"}}>
                                    <View style={{width:50, height:50, borderRadius:360, borderWidth:3, borderColor:theme.colors.lightText,
                                            alignItems:"center", justifyContent:"center"
                                        }}>
                                            <Image source={require("../../assets/images/bird.jpeg")}
                                                style={{width:45, height:45, borderRadius:360}}
                                            />
                                    </View>
                                    <View style={{ marginLeft:12}}>
                                        <Text style={{fontSize:20, fontWeight:"900", color: theme.colors.black}}>Name Surname</Text>
                                        <Text style={{fontSize:14, fontWeight:"900",}}>username</Text>
                                    </View>
                                </View>

                                <View style={{marginRight:16}}>
                                    <SvgUri uri={"https://hatscripts.github.io/circle-flags/flags/tr.svg"} width="24" height="24" />

                                </View>
                            </View>
                            <View mt="24px" style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between",
                                paddingHorizontal:12
                            }}>
                                
                                <View style={{flexDirection:"row", alignItems:"center", marginTop:12}}>
                                    <MaterialIcons name="network-wifi-3-bar" color={"black"} size={24}/>
                                    <View>
                                        <Text style={{marginLeft:8, fontSize:18, fontWeight:"900", color:"black"}}>Beginner</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection:"row", alignItems:"center", marginTop:12}}>
                                    <View>
                                        <Text style={{fontWeight:"900",}}>YG</Text>
                                    </View>
                                    <View>
                                        <Text style={{marginLeft:8, fontSize:18, fontWeight:"400", color:"black"}}>1140 </Text>
                                    </View>
                                </View>
                            </View>

                                
                        </Actionsheet.Item>
                </Actionsheet.Content>
            </Actionsheet>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        paddingHorizontal: MARGIN_HORİZONTAL,
    },
    
});
