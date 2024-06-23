import { Switch, Text, View } from "native-base";

export default function NotificationSettingScreen() {
    return (
        <View>
            <View flexDir="row" justifyContent="space-between" alignItems="center" mt="16px">
                <Text style={{...styles.cardText}}>{t("mailNotification")}</Text>
                <Switch
                    trackColor={{ false: "#bbb", true: "#81b0ff" }}
                    thumbColor={mailEnabled ? "#81b0ff" : "#f4f3f4"}
                    ios_backgroundColor="#bbb"
                    onValueChange={toggleSwitch}
                    value={mailEnabled}
                />
            </View>
        </View>
    )
}