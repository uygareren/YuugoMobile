import { FormControl, Icon, Input, Pressable, Text, WarningOutlineIcon } from "native-base";
import { useState } from "react";
import { type NativeSyntheticEvent, type TextInputFocusEventData, ViewStyle, KeyboardTypeOptions } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
    onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void,
}

export default function PasswordInput({ 
    label, value, onChangeText, style={}, errorMessage="", required=false, isInvalid=false, onBlur, keyboardType, maxLength,
}: TextInputProps) {
    const [show, setShow] = useState(false);

    return (
        <FormControl style={style} isInvalid={isInvalid}>
            <FormControl.Label>
                <Text>{label}</Text>
            </FormControl.Label>
            <Input keyboardType={keyboardType} value={value} mt="8px" maxLength={maxLength}
            onChangeText={onChangeText} onBlur={onBlur} bgColor="white"
            type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}>
                <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
                size={5} mr="2" color="muted.400" />
            </Pressable>} 
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    )
}

