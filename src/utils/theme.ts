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
                    color: "#0C1015",
                    _input: {
                        bg: "white",
                    },
                    borderColor: "#0C101570",
                    borderRadius: "10px",
                    py: "13px",
                    px: "10px",
                    placeholderTextColor: "#0C101590"
                    
                }
            },
        },
        Text: { // @ts-ignore
            baseStyle() {
                return {
                    color: "#0C1015",
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
          50: '#e0f8ff',
          100: '#c2e1ed',
          200: '#a0cddc',
          300: '#7eb7cc',
          400: '#5ca3bd',
          500: '#4289a3',
          600: '#316b80',
          700: '#204c5d',
          800: '#0b2f39',
          900: '#001119',
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
        white: "#FFF",
        black: "#000",
        lightText: "#111",
        darkText: "#fff",
    }
}

export const theme: ITheme | undefined = extendTheme(ThemeData);