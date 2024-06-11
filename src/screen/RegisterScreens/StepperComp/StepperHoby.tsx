import { Text } from "native-base"
import { RootStateType } from "../../../store/store";
import { useSelector } from "react-redux";

type StepperHobyProps = {
    onNext: () => void
} 
export const StepperHoby = ({ onNext }: StepperHobyProps) => {
    const jwt = useSelector<RootStateType>(state => state.account.jwt);

    return (
        <Text>Hoby Stepper</Text>
    )
}