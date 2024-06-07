import { useNavigation } from "@react-navigation/native";
import { Box, Icon, Text } from "native-base"
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

type Props = {
    onPress?: () => void;
    title?: string;
}

export const BackIcon = ({ onPress = undefined, title }: Props) => {
    const navigation = useNavigation();

    const handlePress = () => onPress && navigation.goBack();

    return (
        <Box alignSelf="flex-start" alignItems="center" flexDir="row" >
            <Icon onPress={handlePress} as={FontAwesomeIcon} name="chevron-left" color="secondary.900" size="20px" />
            {title && (<Text fontWeight="medium" fontSize="18px">{title}</Text>)}
        </Box>
    )
}