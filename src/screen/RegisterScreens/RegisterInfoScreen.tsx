import { RouteProp, useRoute } from "@react-navigation/native";
import { Progress, View, useTheme } from "native-base";
import { useState } from "react";
import { Dimensions, SafeAreaView, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { RootStackParamList } from "../../types/react-navigation";
import { StepperAvatar } from "./StepperComp/StepperAvatar";
import StepperCountry from "./StepperComp/StepperCountry";
import StepperDatetime from "./StepperComp/StepperDatetime";
import StepperGender from "./StepperComp/StepperGender";
import { StepperInfo } from "./StepperComp/StepperInfo";
import { StepperLanguage } from "./StepperComp/StepperLanguage";
import StepperLanguageLevel from "./StepperComp/StepperLanguageLevel";
import StepperSelectLanguage from "./StepperComp/StepperSelectLanguage";
import StepperTopic from "./StepperComp/StepperTopic";
import StepperUsername from "./StepperComp/StepperUsername";

type RegisterInfoScreenRouteProp = RouteProp<RootStackParamList, 'RegisterInfo'>;

export default function RegisterInfoScreen() {
    const route = useRoute<RegisterInfoScreenRouteProp>();
    const [stepper, setStepper] = useState<number>(4); // route.params.stepper
    const maxW = Dimensions.get("screen").width;
    const theme = useTheme();

    function handleFinishStep() {

    }

    const RenderStepView = () => {
        if(stepper == 0) {
            // User Info
            return (
                <StepperInfo onNext={() => setStepper(1)} />
            )
        } else if(stepper == 1) {
            // Like Interestings Fobys
            return (
                <StepperUsername onNext={() => setStepper(2)} />
            )
        } else if(stepper == 2) {
            // Like Interestings Fobys
            return (
                <StepperGender onNext={() => setStepper(3)} />
            )
        }else if(stepper == 3) {
            // Like Interestings Fobys
            return (
                <StepperDatetime onNext={() => setStepper(4)} />
            )}  
        else if(stepper == 4) {
                // Like Interestings Fobys
                return (
                    <StepperCountry onNext={() => setStepper(5)} />
            )}
        else if(stepper == 5) {
                // Like Interestings Fobys
                return (
                    <StepperSelectLanguage onNext={() => setStepper(6)} />
            )}
        else if(stepper == 6) {
                // Like Interestings Fobys
                return (
                    <StepperLanguageLevel onNext={() => setStepper(7)} />
            )}
        else if(stepper == 7) {
                // Like Interestings Fobys
                return (
                    <StepperTopic onNext={() => setStepper(8)} />
            )}
        else if(stepper == 9) {
            // Select languages with levels
            return (
                <StepperLanguage onNext={() => setStepper(10)} />
            )
        } else {
            // SELECT Avatar
            return ( //
                <StepperAvatar onNext={handleFinishStep} />
            )
        }
    }

    function handleGoBack(){
        if(stepper != 0){
            setStepper(stepper - 1)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.white }}>
            {stepper != 0 ? (
                <View style={{flexDirection:"row", alignItems:"center", paddingHorizontal:16, marginTop:8}}>
                <TouchableOpacity onPress={() => handleGoBack()}>
                    <Feather name="arrow-left" color="black" size={24} style={{}}/>
                </TouchableOpacity>
                <Progress bg="coolGray.300" w={(maxW - 96) + "px"} value={stepper * 10} my="16px" mx="16px"  />
            </View>
            ): (
                <View style={{alignItems:"center", justifyContent:"center", marginTop:8}}>
                    <Progress bg="coolGray.300" w={(maxW - 64) + "px"} value={stepper * 11.11} my="16px" mx="16px"/>
                </View>
                
            )}
            
            <RenderStepView />
        </SafeAreaView>
    )
}