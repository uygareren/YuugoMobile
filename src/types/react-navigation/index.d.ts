export type RootStackParamList = {
    Login: undefined;
    Screen2: { userId: string };
    RegisterEmail:undefined,
    RegisterConfirmCode: {
        activationToken: string
    },
    RegisterConfirmPassword: {
        jwt: string
    },
    RegisterInfo: {

    },

    ForgetPasswordEmail: undefined,
    ForgetPasswordCode: {
        activationToken: string
    },
    ForgetPasswordConfirmPassword: {
        activationToken: string
    },

};