import { FormControl, Icon, Input, Pressable } from "native-base";
import { useState } from "react";
import { KeyboardTypeOptions, ViewStyle, type NativeSyntheticEvent, type TextInputFocusEventData } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TITLE_COLOR } from "../../utils/utils";

type TextInputProps = {
    label: string
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
    label, value, onChangeText, style={}, placeholder, errorMessage="", required=false, isInvalid=false, onBlur, keyboardType, maxLength,
}: TextInputProps) {
    const [show, setShow] = useState(false);

    return (
        <FormControl style={style} isInvalid={isInvalid}>
            {/* <FormControl.Label>
                <Text>{label}</Text>
            </FormControl.Label> */}
            <Input keyboardType={keyboardType} value={value} mt="8px" maxLength={maxLength}
             borderColor={"#d6d6d6"} style={{backgroundColor:"#f5f5f5"}} fontSize={20} fontWeight={"bold"} color={TITLE_COLOR}
             placeholderTextColor={"#a19f9f"} placeholder={placeholder} _focus={{borderColor:"#d6d6d6"}}
            onChangeText={onChangeText} onBlur={onBlur} bgColor="#f5f5f5"
            type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}>
                <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
                size={8} mr="2" color="muted.400" />
            </Pressable>} 
            />
            <FormControl.ErrorMessage>
              {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    )
}

