import { FormControl, Icon, Input } from "native-base";
import { KeyboardTypeOptions, ViewStyle, type NativeSyntheticEvent, type TextInputFocusEventData } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TITLE_COLOR } from "../../utils/utils";

type TextInputProps = {
    label?: string
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
            {/* <FormControl.Label>
                <Text>{label}</Text>
            </FormControl.Label> */}
            <Input keyboardType={keyboardType} value={value} borderWidth={2} borderRadius={20} 
            borderColor={"#d6d6d6"} style={{backgroundColor:"#f5f5f5"}} fontSize={20} fontWeight={"bold"} color={TITLE_COLOR}
            placeholderTextColor={"#a19f9f"} placeholder="E-posta" _focus={{borderColor:"#d6d6d6"}}
            maxLength={maxLength}
            onChangeText={onChangeText} onBlur={onBlur} InputRightElement={
                visibleIcon ? (
                    <Icon
                as={<MaterialCommunityIcons name={"progress-check"} />}
                size={5} mr="2" color="success.600" />
                ) : undefined
            }  />
            <FormControl.ErrorMessage >
              {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    )
}
