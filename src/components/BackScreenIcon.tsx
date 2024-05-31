import { useNavigation } from "@react-navigation/native";
import { Box, Icon, Text } from "native-base"
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

type Props = {
    onPress?: () => void;
    title?: string;
}

export const BackScreenIcon = ({ onPress = undefined, title }: Props) => {
    const navigation = useNavigation();

    const handlePress = () => onPress ? onPress() : navigation.goBack();

    return (
        <Box padding="5px" opacity="80" bgColor="#FCFCFC" borderRadius="50px" alignSelf="flex-start" alignItems="center" >
            <Icon onPress={handlePress} as={FontAwesomeIcon} name="chevron-left" color="secondary.900" size="15px" />
            {title && (<Text>{title}</Text>)}
        </Box>
    )
}