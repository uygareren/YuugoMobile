import { Text } from "native-base"
import { RootStateType } from "../../../store/store";
import { useSelector } from "react-redux";

type StepperLanguageProps = {
    onNext: () => void
} 
export const StepperLanguage = ({ onNext }: StepperLanguageProps) => {
    const jwt = useSelector<RootStateType>(state => state.account.jwt);

    return (
        <Text>Language Stepper</Text>
    )
}