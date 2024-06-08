import { useNavigation } from "@react-navigation/native";
import { Box, Icon, Text } from "native-base"
import { type InterfaceBoxProps } from "native-base/lib/typescript/components/primitives/Box";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

type Props = {
    onPress?: () => void;
    title?: string;
    box?: InterfaceBoxProps;
}

export const BackIcon = ({ onPress = undefined, title, box }: Props) => {
    const navigation = useNavigation();

    const handlePress = () => onPress && navigation.goBack();

    return (
        <Box alignSelf="flex-start" alignItems="center" flexDir="row" {...box} >
            <Icon onPress={handlePress} as={FontAwesomeIcon} name="chevron-left" color="gray.500" size="20px" />
            {title && (<Text fontWeight="medium" fontSize="18px">{title}</Text>)}
        </Box>
    )
}