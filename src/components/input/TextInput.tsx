import { FormControl, Icon, Input, Text, WarningOutlineIcon } from "native-base";
import { type NativeSyntheticEvent, type TextInputFocusEventData, ViewStyle, KeyboardTypeOptions } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
    visibleIcon?: boolean;
    touched?: boolean;
}

export default function TextInput({ 
    label, value, onChangeText, style={}, errorMessage="", required=false, isInvalid=false, onBlur, keyboardType, maxLength,
    visibleIcon=false
}: TextInputProps) {
    return (
        <FormControl style={style} isInvalid={isInvalid}>
            <FormControl.Label>
                <Text>{label}</Text>
            </FormControl.Label>
            <Input keyboardType={keyboardType} value={value} mt="8px" maxLength={maxLength}
            onChangeText={onChangeText} onBlur={onBlur} bgColor="white" InputRightElement={
                visibleIcon ? (
                    <Icon
                as={<MaterialCommunityIcons name={"progress-check"} />}
                size={5} mr="2" color="success.600" />
                ) : undefined
            }  />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    )
}
