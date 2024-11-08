import { ICustomTheme, ITheme, Theme, extendTheme } from "native-base";

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
                    _text: {
                        fontWeight: "600",
                    }
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
        Icon: {
            baseStyle() {
                return {
                    color: "rgba(12, 16, 21, 0.7)"
                }
            }
        },
        Input: { // @ts-ignore
            baseStyle(props) {
                return {
                    ...props,
                    color: "#0C1015",
                    _input: {
                        bg: "white",
                    },
                    borderColor: "#D1D1D1",
                    borderRadius: "10px",
                    py: "13px",
                    px: "12px",
                    placeholderTextColor: "#0C101590"
                    
                }
            },
        },
        Text: { // @ts-ignore
            baseStyle() {
                return {
                    color: "rgba(12, 16, 21, 0.7)",
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
        800: {
            normal: "Poppins-ExtraBold",
            italic: "Poppins-ExtraBold"
        },
        900: {
            normal: "Poppins-ExtraBold",
            italic: "Poppins-ExtraBold"
        }
    },
    fonts: {
        heading: "Poppins",
        body: "Poppins",
        mono: "Poppins",
    },
    
    // @ts-ignore
    colors: {
        primary: {
            "50": "#6cbfff",
            "100": "#44aeff",
            "200": "#1d9dff",
            "300": "#008af4",
            "400": "#0076ce",
            "500": "#0566af",
            "600": "#095894",
            "700": "#0c4a79",
            "800": "#0d3c61",
            "900": "#0d2f49"
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
        error: {
            50: "#cf9fff",
            100: "#bb77ff",
            "200": "#a750ff",
            "300": "#9328ff",
            "400": "#8000ff",
            "500": "#7407e1",
            "600": "#680cc3",
            "700": "#5c11a8",
            "800": "#50138e",
            "900": "#451575"
        },
        black: "#000",
        lightText: "#858383",
        darkText: "#131313",
        titleText: "#403f3f",
        lightBlack: "rgba(12, 16, 21, 0.7)"
    }
}

export const theme: ICustomTheme | undefined = extendTheme(ThemeData);