import { NativeBaseProvider as NBProvider } from "native-base";
import { theme } from "../utils/theme";

const NativeBaseProvider = ({ children }: any):  JSX.Element => {
    return (
        <NBProvider theme={theme}>
            {children}
        </NBProvider>
    )
}

export default NativeBaseProvider;