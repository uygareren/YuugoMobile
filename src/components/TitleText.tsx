import { ITextProps, Text } from "native-base";

const TitleText = (props: ITextProps) => {
    return (
        <Text fontSize="24px" fontWeight="900" color="titleText" {...props}>{props.children}</Text>
    )
}

export default TitleText;