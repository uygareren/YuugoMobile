import { theme } from "../../utils/theme";

type ITheme = typeof theme;

declare module 'native-base' {
    interface ICustomTheme extends ITheme {}
}