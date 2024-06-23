import React from 'react';
import { FormControl, Icon, Select, CheckIcon, WarningOutlineIcon, Text } from "native-base";
import { ViewStyle } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SvgUri } from 'react-native-svg';

type SelectInputProps = {
    label?: string;
    value: string;
    onValueChange: (itemValue: string) => void;
    style?: ViewStyle;
    helperText?: string;
    errorMessage?: string;
    required?: boolean;
    isInvalid?: boolean;
    placeholder?: string;
    items: { label: string, value: number, image: string }[];
    visibleIcon?: boolean;
};

export default function SelectInput({
    label, value, onValueChange, style = {}, errorMessage = "", required = false, isInvalid = false,
    placeholder = "", items = [], visibleIcon = false, helperText
}: SelectInputProps) {
    return (
        <FormControl style={style} isInvalid={isInvalid}>
            {label && <FormControl.Label>{label}</FormControl.Label>}
            <Select 
                selectedValue={value} minWidth="200" accessibilityLabel={placeholder} placeholder={placeholder}
                borderColor={"#d6d6d6"} style={{backgroundColor:"#f5f5f5"}} fontSize="15px" fontWeight={"bold"} 
                color="titleText" borderWidth="2px" borderRadius="20px"
                _selectedItem={{
                    endIcon: <CheckIcon size="5" />,
                }}
                bgColor="#f5f5f5"
                onValueChange={onValueChange}
            >
                {items.map((item) => (
                    <Select.Item leftIcon={<Text>{item.image}</Text>}
                        key={item.value} label={item.label} 
                    value={item.value.toString()} />
                ))}
            </Select>
            {visibleIcon && (
                <Icon
                    as={<MaterialCommunityIcons name="progress-check" />}
                    size={5}
                    mt={2}
                    color="success.600"
                />
            )}
            {helperText && !errorMessage && (
                <FormControl.HelperText>
                    {helperText}
                </FormControl.HelperText>
            )}
            {errorMessage && (
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errorMessage}
                </FormControl.ErrorMessage>
            )}
        </FormControl>
    );
}
