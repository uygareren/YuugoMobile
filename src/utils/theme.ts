import { ITheme, Theme, extendTheme } from "native-base";

type ThemeUtil = Theme | (Record<string, any> & {});

const ThemeData: ThemeUtil = {
    components: { // @ts-ignore
        Button: {
            defaultProps: {
                colorScheme: "primary",
                variant: "solid",
                size: "md",
            },
            sizes: {
                lg: {
                    py: "12px"
                },
                md: {
                    py: "12px"
                }
            },
            baseStyle(props) {
                return {
                    ...props,
                    borderRadius: "10px",
                }
            },
        },
        Divider: {
            baseStyle(props) {
                return {
                    ...props,
                    height: "1px",
                    bg: "#fcfcfc50"
                }
            },
        },
        Input: { // @ts-ignore
            baseStyle(props) {
                return {
                    ...props,
                    color: "#0C101570",
                    _input: {
                        bg: "secondary.600",
                    },
                    borderColor: "transparent",
                    borderRadius: "10px",
                    py: "10px",
                    px: "12px",
                    placeholderTextColor: "#0C101590"
                    
                }
            },
        },
        Text: { // @ts-ignore
            baseStyle() {
                return {
                    color: "#FCFCFC",
                    fontSize: 14,
                    fontFamily: "body",
                }
            },
        },
        Checkbox: {
            defaultProps: {
                defaultIsChecked: false,
                colorScheme: "primary",
                size: "25px"
            }
        }
    },
    fontConfig: {
        100: {
            normal: "Poppins-Light",
            italic: "Poppins-LightItalic",
        },
        200: {
            normal: "Poppins-Light",
            italic: "Poppins-LightItalic",
        },
        300: {
            normal: "Poppins-Light",
            italic: "Poppins-LightItalic",
        },
        400: {
            normal: "Poppins-Regular",
            italic: "Poppins-Italic",
        },
        500: {
            normal: "Poppins-Medium",
        },
        600: {
            normal: "Poppins-SemiBold",
            italic: "Poppins-SemiBoldItalic",
        },
        700: {
            normal: "Poppins-Bold",
            italic: "Poppins-BoldItalic",
        },
    },
    fonts: {
        heading: "Poppins",
        body: "Poppins",
        mono: "Poppins",
    },
    // @ts-ignore
    colors: {
        primary: {
            50: '#ffe6e9',
            100: '#f9bbc2',
            200: '#ef909b',
            300: '#e76574',
            400: '#df3a4c',
            500: '#c52133',
            600: '#9a1827',
            700: '#6f0f1c',
            800: '#440710',
            900: '#1d0004',
        },
        success: {
            50: '#e1fde9',
            100: '#bbf5c9',
            200: '#92eca7',
            300: '#67e485',
            400: '#3fdd63',
            500: '#26c34a',
            600: '#1A9337',
            700: '#106c28',
            800: '#044116',
            900: '#001802',
        },
        secondary: {
            50: '#eff2f6',
            100: '#d2d7de',
            200: '#b3bcc9',
            300: '#94a2b5',
            400: '#7588a2',
            500: '#5c6e88',
            600: '#515767',
            700: '#343e4b',
            800: '#1f252d',
            900: '#090c10',
        },
        black: "#000",
        lightText: "#fcfcfc",
        darkText: "#000000",
    }
}

export const theme: ITheme | undefined = extendTheme(ThemeData);