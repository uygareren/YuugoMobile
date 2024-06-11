import { Text } from "native-base"
import { RootStateType } from "../../../store/store";
import { useSelector } from "react-redux";

type StepperAvatarProps = {
    onNext: () => void
} 
export const StepperAvatar = ({ onNext }: StepperAvatarProps) => {
    const jwt = useSelector<RootStateType>(state => state.account.jwt);

    return (
        <Text>Avatar Stepper</Text>
    )
}