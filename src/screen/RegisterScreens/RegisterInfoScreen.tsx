import { Dimensions, SafeAreaView } from "react-native";
import { useState } from "react";
import { Progress, Text } from "native-base";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../types/react-navigation";
import { StepperInfo } from "./StepperComp/StepperInfo";
import { StepperAvatar } from "./StepperComp/StepperAvatar";
import { StepperHoby } from "./StepperComp/StepperHoby";
import { StepperLanguage } from "./StepperComp/StepperLanguage";

type RegisterInfoScreenRouteProp = RouteProp<RootStackParamList, 'RegisterInfo'>;

export default function RegisterInfoScreen() {
    const route = useRoute<RegisterInfoScreenRouteProp>();
    const [stepper, setStepper] = useState<number>(0); // route.params.stepper
    const maxW = Dimensions.get("screen").width;

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
                <StepperHoby onNext={() => setStepper(2)} />
            )
        } else if(stepper == 2) {
            // Select languages with levels
            return (
                <StepperLanguage onNext={() => setStepper(3)} />
            )
        } else {
            // SELECT Avatar
            return ( //
                <StepperAvatar onNext={handleFinishStep} />
            )
        }
    }

    return (
        <SafeAreaView>
            <Progress bg="coolGray.300" w={(maxW - 32) + "px"} value={stepper * 20} my="16px" mx="16px"  />
            <RenderStepView />
        </SafeAreaView>
    )
}