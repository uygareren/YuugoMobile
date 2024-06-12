import DateTimePicker from '@react-native-community/datetimepicker';
import { Text, View } from 'native-base';

type Props = {
    value: Date
    onChangeValue: (date: Date) => void
    maximumDate?: Date
    minimumDate?: Date
    label?: string
}

export default function DateTimeInput({ value, onChangeValue, maximumDate, minimumDate, label="" }: Props) {
    return (
        <View>
            <Text marginBottom="8px">{label}</Text>
            <View right={"20px"}>
                <DateTimePicker value={value} mode="date" display="default" onChange={(event, date) => onChangeValue(date as Date)}
                    timeZoneName="Europe/Istanbul" themeVariant="dark" style={{ alignSelf: "flex-start" }}
                />
            </View>
        </View>
    )
} 