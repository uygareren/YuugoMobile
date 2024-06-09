import { FormControl, Icon, Input, Pressable } from "native-base";
import { useState } from "react";
import { KeyboardTypeOptions, ViewStyle, type NativeSyntheticEvent, type TextInputFocusEventData } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type TextInputProps = {
    value: string
    placeholder:string,
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
    value, onChangeText, style={}, placeholder, errorMessage="", required=false, isInvalid=false, onBlur, keyboardType, maxLength,
}: TextInputProps) {
    const [show, setShow] = useState(false);

    return (
        <FormControl style={style} isInvalid={isInvalid}>
            {/* <FormControl.Label>
                <Text>{label}</Text>
            </FormControl.Label> */}
            <Input keyboardType={keyboardType} value={value} borderWidth="2px" borderRadius="20px"
            borderColor={"#d6d6d6"} style={{backgroundColor:"#f5f5f5"}} fontSize="15px" fontWeight={"bold"} color="titleText"
            placeholderTextColor={"#a19f9f"} _focus={{borderColor:"#d6d6d6"}}
            maxLength={maxLength} placeholder={placeholder} bgColor="#f5f5f5"
            onChangeText={onChangeText} onBlur={onBlur}
            type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}>
                <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
                size="24px" mr="2" color="muted.400" />
            </Pressable>} 
            />
            <FormControl.ErrorMessage>
              {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    )
}

