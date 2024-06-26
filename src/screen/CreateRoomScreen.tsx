import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, View, useTheme } from "native-base";
import { useState } from "react";
import { Dimensions, FlatList, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import TextInput from "../components/input/TextInput";
import { useI18n } from "../hooks/useI18n";
import { RootStackParamList } from "../types/react-navigation";
import { BLUE1, MARGIN_HORİZONTAL } from "../utils/utils";

type CreateRoomScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Explore">;


const {width, height} = Dimensions.get("screen");

export default function CreateRoomScreen(){
    
    const navigation = useNavigation<CreateRoomScreenNavigationProp>();
    const { t } = useI18n("AccountScreen");
    const theme = useTheme();
    const dispatch = useDispatch();

    const [room, setRoom] = useState("");
    const [selectedDuration, setSelectedDuration] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("");

    const mockDurationData = [
        {
            id: "1",
            duration: 20
        },
        {
            id: "2",
            duration: 30
        },
        {
            id: "3",
            duration: 45
        },
        {
            id: "4",
            duration: 60
        },

    ]

    const mockLevelData = [
        {
            id: "1",
            level: "Beginner"
        },
        {
            id: "2",
            level: "Intermediate"
        },
        {
            id: "3",
            level: "Advanced"
        },
        {
            id: "4",
            level: "No Matter"
        },

    ]
    const mockQuotaData = [
        {
            id: "1",
            quota: 5
        },
        {
            id: "2",
            quota: 6
        },
        {
            id: "3",
            quota: 7
        },
        {
            id: "4",
            quota: 8
        },

    ]

    function handleSelectDuration(durationId: string){
        if(selectedDuration == durationId){
            setSelectedDuration("")
        }else{
            setSelectedDuration(durationId)
        }
    }

    function handleSelectLevel(levelId: string){
        if(selectedLevel == levelId){
            setSelectedLevel("")
        }else{
            setSelectedLevel(levelId)
        }
    }

    const RenderDuration = ({item}:any) => {
        return(
            <TouchableOpacity 
                onPress={() => handleSelectDuration(item.id)}
                style={{borderWidth:1, borderLeftWidth:2, borderRightWidth:2, borderBottomWidth:5,paddingVertical:2,
                    width:width*0.18, borderRadius:8, alignItems:"center", justifyContent:"center", marginRight:width*0.025,
                    borderColor: selectedDuration == item.id ? BLUE1 : theme.colors.lightText,
                    
                }}>
                    <Text style={{fontWeight:"900", fontSize:16}}>{item.duration} dk</Text>
            </TouchableOpacity>
        )
    }

    const RenderLevel = ({ item }: any) => (
        <TouchableOpacity
            onPress={() => handleSelectLevel(item.id)}
            style={{
                borderWidth: 1,
                borderLeftWidth: 2,
                borderRightWidth: 2,
                borderBottomWidth: 5,
                paddingVertical: 4,
                width: width * 0.4,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                marginRight: width * 0.025,
                marginVertical: width*0.0125,
                borderColor: selectedLevel === item.id ? BLUE1 : theme.colors.lightText,
            }}>
            <Text style={{ fontWeight: "900", fontSize: 16 }}>{item.level}</Text>
        </TouchableOpacity>
    );


    const RenderQuota = ({item}:any) => {
        return(
            <TouchableOpacity 
                onPress={() => handleSelectDuration(item.id)}
                style={{borderWidth:1, borderLeftWidth:2, borderRightWidth:2, borderBottomWidth:5,paddingVertical:2,
                    width:width*0.18, borderRadius:8, alignItems:"center", justifyContent:"center", marginRight:width*0.025,
                    borderColor: selectedDuration == item.id ? BLUE1 : theme.colors.lightText,
                    
                }}>
                    <Text style={{fontWeight:"900", fontSize:16}}>{item.quota}</Text>
            </TouchableOpacity>
        )
    }


    return(
        <SafeAreaView style={[styles.safeAreaView, { backgroundColor: theme.colors.white }]}>
            <Header title={"Oda Oluştur"}/>
            <View mt="16px">
                <TextInput value={room} onChangeText={setRoom} placeholder="Oda İsmi"/>
                <View mt="32px">
                    
                    <View>
                        <Text style={{fontSize:18, fontWeight:"900"}}>Oda Süresi</Text>
                        <View mt="8px" style={{alignItems:"flex-start"}}>
                            <FlatList
                                horizontal
                                data={mockDurationData}
                                keyExtractor={item => item.id.toString()}
                                renderItem={RenderDuration}
                            />
                        </View>
                    </View>

                     <View mt="32px">
                        <Text style={{ fontSize: 18, fontWeight: "900" }}>Oda Seviyesi</Text>
                        <View mt="8px" style={{ alignItems: "flex-start" }}>
                            <FlatList
                                data={mockLevelData}
                                keyExtractor={item => item.id.toString()}
                                renderItem={RenderLevel}
                                numColumns={2}
                            />
                        </View>
                    </View>

                    <View mt="32px">
                        <Text style={{fontSize:18, fontWeight:"900"}}>Oda Kontenjanı</Text>
                        <View mt="8px" style={{alignItems:"flex-start"}}>
                            <FlatList
                                horizontal
                                data={mockQuotaData}
                                keyExtractor={item => item.id.toString()}
                                renderItem={RenderQuota}
                            />
                        </View>
                    </View>

                </View>
                
            </View>

            <View style={{position:"absolute", bottom:32, left:0, right:0,width:width}}>
                <Button title="SOHBETİ OLUŞTUR" onPress={() => console.log("asd")} 
                    style={{ width:width-32, alignSelf:"center"}}/>
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
