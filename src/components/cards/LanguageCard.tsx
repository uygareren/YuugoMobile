import { Box, Icon, Pressable, Text, View } from "native-base";
import { SvgUri } from "react-native-svg";
import { useI18n } from "../../hooks/useI18n";
import Fontawesome6 from 'react-native-vector-icons/FontAwesome6';
import { Dimensions } from "react-native";
import AddIcon from "../icons/AddIcon";

type LanguageCardProps = {
    languageName: string;
    level: string;
    image: string;
    edit?: boolean;
    id: number;
    onEdit?: (id: number) => void;
}

export default function LanguageCard({ image, level, languageName, id, edit, onEdit }: LanguageCardProps) {
    const { t } = useI18n("language");

    const mWidth = Dimensions.get("screen").width;

    function handle() {
        if(onEdit)
            onEdit(id);
    }

    return (
        <Box borderWidth="1px" borderRadius="md" p="8px" borderColor="gray.200"
        alignItems="center" width={(mWidth * 0.5 - 24) + "px" } >
            {edit ? (<Icon as={<Fontawesome6 name="pencil" size={24} />}
            onPress={handle} top="8px" right="8px"  position="absolute" />) : null}
        
            <View marginTop="12px">
                <SvgUri uri={image} width="48" height="48" />
            </View>
            <Text marginTop="8px" fontWeight="bold" fontSize="17px">{t(languageName)}</Text>
            <Text marginTop="4px" fontSize="15px">{level}</Text>
        </Box>
    )
}

export const AddLanguageCard = ({ onPress }: any) => {
    const mWidth = Dimensions.get("screen").width;
    const {t} = useI18n("ProfileScreen");

    return (
        <Box borderWidth="1px" borderRadius="md" p="8px" borderColor="gray.200"
        alignItems="center" width={(mWidth * 0.5 - 24) + "px" } justifyContent="space-between">
            <Pressable marginTop="12px" onPress={onPress}>
                <AddIcon size={48} />
            </Pressable>

            <Text fontSize="17px" marginTop="12px" fontWeight="bold" maxW="90%" textAlign="center">{t("addLanguageBtn")}</Text>
        </Box>
    )
}