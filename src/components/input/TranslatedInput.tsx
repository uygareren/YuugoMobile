import { Divider, Text, TextArea, View } from "native-base"
import { useI18n } from "../../hooks/useI18n";

type TranslatedInput = {
    languageName: string
    value: string
    onChangeText: (e: string) => void
}

export const TranslatedInput = ({ languageName, value, onChangeText }: TranslatedInput) => {
    const i18nFlags = useI18n("language");
    const {t} = useI18n("EditWord");
    return (
        <View>
            <Text>{t("translateFrom") + " "} <Text fontWeight="bold" color="#333">{"(" + i18nFlags.t(languageName) + ")"}</Text></Text>
            <TextArea value={value} onChangeText={onChangeText} autoCompleteType w="100%" borderWidth="0px"
            style={{ backgroundColor: "#f6f6f6" }} borderRadius="0px" borderTopRadius="10px" mt="12px" />
            <View bgColor="#f6f6f6" paddingX="16px" pb="8px" borderBottomRadius="10px">
                <Divider height="1px" bgColor="#eaeaea" />
                <View mt="12px">
                    <Text fontSize="12px">{value.length} / 1000</Text>
                </View>
            </View>
        </View>
    )
}