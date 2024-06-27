import { FormControl, Icon, Input, Text } from "native-base";
import React from 'react';
import { KeyboardTypeOptions, NativeSyntheticEvent, TextInputFocusEventData, ViewStyle } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type TextAreaProps = {
    placeholder?: string;
    label?: string;
    value: string;
    onChangeText: (e: string) => void;
    style?: ViewStyle;
    helperText?: string;
    errorMessage?: string;
    required?: boolean;
    isInvalid?: boolean;
    maxLength?: number;
    keyboardType?: KeyboardTypeOptions;
    onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    visibleIcon?: boolean;
    touched?: boolean;
}

export default function TextArea({
    placeholder = "", label, value, onChangeText, style = {}, errorMessage = "", required = false, isInvalid = false, onBlur, keyboardType, maxLength,
    visibleIcon = false
}: TextAreaProps) {
    return (
        <FormControl style={style} isInvalid={isInvalid}>
            {label && (
                <FormControl.Label>
                    <Text fontSize="md" fontWeight="bold">{label}{required && <Text color="red.500">*</Text>}</Text>
                </FormControl.Label>
            )}
            <Input
                keyboardType={keyboardType}
                value={value}
                borderWidth={2}
                borderRadius={20}
                minHeight={200}
                borderColor={"#d6d6d6"}
                style={{ backgroundColor: "#f5f5f5" }}
                fontSize={15}
                fontWeight={"bold"}
                color="titleText"
                placeholderTextColor={"#a19f9f"}
                _focus={{ borderColor: "#d6d6d6" }}
                maxLength={maxLength}
                placeholder={placeholder}
                onChangeText={onChangeText}
                onBlur={onBlur}
                multiline
                textAlignVertical="top"
                InputRightElement={
                    visibleIcon ? (
                        <Icon
                            as={<MaterialCommunityIcons name={"progress-check"} />}
                            size={5}
                            mr="2"
                            color="success.600"
                        />
                    ) : undefined
                }
            />
          
            {isInvalid && errorMessage && (
                <FormControl.ErrorMessage>
                    {errorMessage}
                </FormControl.ErrorMessage>
            )}
        </FormControl>
    );
}
