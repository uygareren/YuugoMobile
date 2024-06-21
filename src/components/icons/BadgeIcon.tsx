import { Badge, Icon, View } from "native-base";
import { ReactElement } from "react";

type BadgeIconProps = {
    count: number;
    icon: ReactElement;
    visibleBadge?: boolean;
    onPress: () => void;
}

export const BadgeIcon = ({ count, icon, visibleBadge, onPress }: BadgeIconProps) => {
    return (
        <View>
            {visibleBadge && (
                <Badge colorScheme="primary" rounded="full" mb={-4} mr={-4} zIndex={1} variant="solid"
                position="absolute" left="16px" top="16px"
                alignSelf="flex-end" _text={{ fontSize: 12 }}>
                    {count}
                </Badge>
            )}
            
            <Icon as={icon} size="28px" color="gray.800" 
            onPress={onPress}/>
        </View>
    )
}