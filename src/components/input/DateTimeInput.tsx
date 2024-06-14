import { Pressable, Text, View } from 'native-base';
import { useState } from "react";
import DatePicker from 'react-native-date-picker';
import { formatDate } from "../../utils/utils";

type Props = {
    value: Date
    onChangeValue: (date: Date) => void
    maximumDate?: Date
    minimumDate?: Date
    label?: string
}

export default function DateTimeInput({ value, onChangeValue, maximumDate, minimumDate, label="" }: Props) {
    const [visible, setVisible] = useState(false);

    function handleClose() {
        setVisible(false);
    }

    function handleOpen() {
        setVisible(true);
    }

    return (
        <View>
            <Pressable onPress={handleOpen} borderWidth="2px" borderRadius="20px" borderColor={"#d6d6d6"}
                py="13px" px="12px" bgColor="white"
                backgroundColor="#f5f5f5">
                <Text color="#0C1015">{formatDate(value)}</Text>
            </Pressable>
            <DatePicker
                date={value}
                mode="date"
                onConfirm={(date) => {
                    handleClose();
                    onChangeValue(date as Date);
                }}
                onCancel={handleClose}
                open={visible}
                modal
                maximumDate={maximumDate}
                minimumDate={minimumDate}
            />
        </View>
    )
}
