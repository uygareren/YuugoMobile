import RNCheckBox from '@react-native-community/checkbox';
import { useTheme } from "native-base";
import { StyleProp, ViewStyle } from "react-native";

type Props = {
    value: boolean
    color?: string;
    onValueChange: (e: boolean) => void;
    style?: StyleProp<ViewStyle>;
    activeColor?: string;
}
export default function CheckBox({ value, color, onValueChange, style={}, activeColor }: Props ) {
    const theme = useTheme();

    return (
        <RNCheckBox value={value} onValueChange={onValueChange} aria-label="asd" style={style} 
            tintColor={color && theme.colors.gray["500"]} onTintColor={activeColor && theme.colors.primary[400]}
            onCheckColor={activeColor && theme.colors.primary[400]} />
    )
}
