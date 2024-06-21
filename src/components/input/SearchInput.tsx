import { Icon, Input } from "native-base";
import { NativeSyntheticEvent, TextInputFocusEventData, type TextStyle } from "react-native";
import EvilIcons from 'react-native-vector-icons/EvilIcons';

type TextInputProps = {
    value: string 
    onChangeText: (e: string) => void
    style?: TextStyle
    onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
    placeholder?: string
}

export default function SearchInput({value, onChangeText, style, onBlur, placeholder}: TextInputProps) {
    return (
        <Input placeholder={placeholder} variant="filled" width="100%" borderRadius="20px" onBlur={onBlur}
        fontSize="15px" fontWeight="bold" style={{backgroundColor:"#f5f5f5", ...style}} borderColor={"#d6d6d6"}
        placeholderTextColor={"#a19f9f"} _focus={{borderColor:"#d6d6d6"}} value={value} onChangeText={onChangeText}
            InputLeftElement={
                <Icon mx="4px" size="24px" color="gray.400" as={<EvilIcons name="search" />} />
            } 
        />
    )
}