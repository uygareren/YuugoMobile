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
import StepperLanguageLevel from "./StepperComp/StepperLanguageLevel";
import StepperSelectLanguage from "./StepperComp/StepperSelectLanguage";
import StepperTopic from "./StepperComp/StepperTopic";
import StepperUsername from "./StepperComp/StepperUsername";

type RegisterInfoScreenRouteProp = RouteProp<RootStackParamList, 'RegisterInfo'>;

export default function RegisterInfoScreen() {
    const route = useRoute<RegisterInfoScreenRouteProp>();
    const [stepper, setStepper] = useState<number>(route.params.stepper); // route.params.stepper
    const maxW = Dimensions.get("screen").width;
    const theme = useTheme();

    const [userInfo, setUserInfo] = useState<{
        name?: string, surname?: string, birthDate?: string, isWoman?: boolean, countryId?: number
    }>({});
    const [selectLanguage, setSelectLanguage] = useState(0); 

    function handleFinishStep() {

    }

    function onNextInfo(name: string, surname: string) {
        setStepper(1);
        setUserInfo(prevState => {
            return {
                ...prevState,
                name,
                surname
            }
        });
    }

    function onNextGender(genderId: number) {
        setStepper(2);
        setUserInfo(prevState => {
            return {
                ...prevState,
                isWoman: genderId == 1 ? false : true
            }
        });
    }

    function onNextBirthDate(birthDate: string) {
        setStepper(3);
        setUserInfo(prevState => {
            return {
                ...prevState,
                birthDate
            }
        });
    }

    function onNextCountry(countryId: number) {
        setStepper(4);
        setUserInfo(prevState => {
            return {
                ...prevState,
                countryId
            }
        });
    }

    function onNextLanguage(languageId: number) {
        setStepper(6);
        setSelectLanguage(languageId);
    }

    const RenderStepView = () => {
        if(stepper == 0) {
            return (
                <StepperInfo onNext={onNextInfo} />
            )
        } else if(stepper == 1) {
            return (
                <StepperGender onNext={onNextGender} />
            )
        } else if(stepper == 2) {
            return (
                <StepperDatetime onNext={onNextBirthDate} />
            )
        } else if(stepper == 3) {
            return (
                <StepperCountry onNext={onNextCountry} />
            )
        } else if(stepper == 4) {
            return (
                <StepperUsername onNext={() => setStepper(5)} userInfo={userInfo} />
            )
        } else if(stepper == 5) {
            return (
                <StepperSelectLanguage onNext={onNextLanguage} />
            )
        }
        else if(stepper == 6) {
            return (
                <StepperLanguageLevel onNext={() => setStepper(7)} selectedLanguage={selectLanguage} />
            )
        }
        else if(stepper == 7) {
            return (
                <StepperTopic onNext={() => setStepper(8)} />
            )
        } else {
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
            {stepper != 0 && stepper != 5 && stepper != 7 && stepper != 8 ? (
                <View flexDirection="row" alignItems="center" px="16px" mt="8px">
                    <TouchableOpacity onPress={() => handleGoBack()}>
                        <Feather name="arrow-left" color="black" size={24} style={{}}/>
                    </TouchableOpacity>
                    <Progress bg="coolGray.300" w={(maxW - 96) + "px"} value={stepper * 12.5} my="16px" mx="16px"  />
                </View>
            ) : (
                <View alignItems="center" justifyContent="center" mt="8px">
                    <Progress bg="coolGray.300" w={(maxW - 64) + "px"} value={stepper * 11.11} my="16px" mx="16px"/>
                </View>
            )}
            
            <RenderStepView />
        </SafeAreaView>
    )
}