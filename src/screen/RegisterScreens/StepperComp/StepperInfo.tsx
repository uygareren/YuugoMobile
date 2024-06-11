import { Text } from "native-base"
import { RootStateType } from "../../../store/store";
import { useSelector } from "react-redux";

type StepperInfoProps = {
    onNext: () => void
} 
export const StepperInfo = ({ onNext }: StepperInfoProps) => {
    const jwt = useSelector<RootStateType>(state => state.account.jwt);

    return (
        <Text>Info Stepper</Text>
    )
}