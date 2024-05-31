import { FormControl, Input, Text, View, WarningOutlineIcon } from "native-base";
import { type NativeSyntheticEvent, type TextInputFocusEventData, ViewStyle, KeyboardTypeOptions } from "react-native";

type TextInputProps = {
    label: string
    value: string
    onChangeText: (e: string) => void
    style?: ViewStyle
    helperText?: string
    errorMessage?: string
    required?: boolean
    isInvalid?: boolean
    maxLength?: number | undefined
    keyboardType?: KeyboardTypeOptions | undefined
    onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
}

export default function TextInput({ 
    label, value, onChangeText, style={}, errorMessage="", required=false, isInvalid=false, onBlur, keyboardType, maxLength
}: TextInputProps) {
    return (
        <FormControl style={style} isRequired={required} isInvalid={isInvalid}>
            <FormControl.Label>
                <Text>{label}</Text>
            </FormControl.Label>
            <Input keyboardType={keyboardType} value={value} mt="8px" maxLength={maxLength}
            onChangeText={onChangeText} borderColor="black" onBlur={onBlur} />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    )
}