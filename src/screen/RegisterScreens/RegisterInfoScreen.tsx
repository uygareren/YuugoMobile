import { Dimensions, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Box, Progress, Text } from "native-base";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../types/react-navigation";

type RegisterInfoScreenRouteProp = RouteProp<RootStackParamList, 'RegisterInfo'>;

export default function RegisterInfoScreen() {
    // const jwt = useSelector<RootStateType>(state => state.account.jwt);
    const route = useRoute<RegisterInfoScreenRouteProp>();
    const [stepper, setStepper] = useState(route.params?.stepper && 0);
    const maxW = Dimensions.get("screen").width;

    const RenderStepView = () => {
        if(stepper == 0) {
            // User Info
            return (
                <Text>1</Text>
            )
        } else if(stepper == 1) {
            // Like Interestings Fobys
            return (
                <Text>2</Text>
            )
        } else if(stepper == 2) {
            // Select languages with levels
            return (
                <Text>3</Text>
            )
        } else {
            // SELECT Avatar
            return ( //
                <Text>4</Text>
            )
        }
    }

    return (
        <SafeAreaView>
            <Progress bg="coolGray.300" w={(maxW - 32) + "px"} value={stepper * 20} mt="16px" mx="16px" />
            <RenderStepView />
        </SafeAreaView>
    )
}