import { ITextProps, Text } from "native-base";


const TitleText = (props: ITextProps) => {
    return (
        <Text fontWeight="semibold" color="primary.800" fontSize="25px" {...props}>{props.children}</Text>
    )
}

export default TitleText;