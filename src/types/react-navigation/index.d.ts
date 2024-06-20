import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type RootStackParamList = {
    Login: undefined;
    RegisterEmail:undefined,
    RegisterConfirmCode: {
        activationToken: string
    },
    RegisterConfirmPassword: {
        jwt: string
    },
    RegisterInfo: {
        stepper: 0
    },

    ForgetPasswordEmail: undefined,
    ForgetPasswordCode: {
        activationToken: string
    },
    ForgetPasswordConfirmPassword: {
        activationToken: string
    },
    Settings: undefined,
    Account:undefined,
    Complaiment:undefined,
    Blocked: undefined,
    UpdatePassword: undefined

    Tab: BottomTabNavigationProp<TabParamList>,
    AddNewLanguage: undefined
    Friend: undefined
    FriendRequest: undefined

};

export type TabParamList = {
    Home: undefined;
    Explore: undefined;
    Profile: undefined;
}